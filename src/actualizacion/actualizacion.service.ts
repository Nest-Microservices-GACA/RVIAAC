import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateActualizacionDto } from './dto/create-actualizacion.dto';
import { UpdateActualizacionDto } from './dto/update-actualizacion.dto';

@Injectable()
export class ActualizacionService {
  private actualizaciones: any[] = [];

  private encryptionService = {
    encrypt: (data: string) => Buffer.from(data).toString('base64'),
    decrypt: (data: string) => Buffer.from(data, 'base64').toString('utf8'),
  };

  create(createActualizacionDto: CreateActualizacionDto) {
    try {
      const { idu_proyecto, num_accion, numero_empleado, path_project } = createActualizacionDto;
  
      if (!idu_proyecto || !num_accion || !numero_empleado || !path_project) {
        throw new BadRequestException('Todos los campos son obligatorios: idu_proyecto, num_accion, numero_empleado, path_project');
      }
  
      if (num_accion !== 1) {
        throw new BadRequestException(`Acción num_accion ${num_accion} no implementada.`);
      }
  
      const nuevaActualizacion = {
        id: this.actualizaciones.length + 1,
        idu_proyecto,
        num_accion,
        numero_empleado,
        path_project: this.encryptionService.encrypt(path_project), 
      };
  
      this.actualizaciones.push(nuevaActualizacion);
  

      return {
        isProcessStarted: true,
        message: 'Proceso IA Iniciado Correctamente',
      };
    } catch (error) {
      throw new BadRequestException(`Error al crear la actualización: ${error.message}`);
    }
  }  

  findAll() {
    return this.actualizaciones.map((actualizacion) => ({
      idu_proyecto: actualizacion.idu_proyecto,
      numero_empleado: actualizacion.numero_empleado,
      path_project: this.encryptionService.decrypt(actualizacion.path_project), // Desencriptar path para respuesta.
    }));
  }

  findOne(id: number) {
    const actualizacion = this.actualizaciones.find((item) => item.id === id);

    if (!actualizacion) {
      throw new NotFoundException(`Actualización con ID ${id} no encontrada`);
    }

    return {
      message: 'Actualización encontrada',
      idu_proyecto: actualizacion.idu_proyecto,
      numero_empleado: actualizacion.numero_empleado,
      path_project: this.encryptionService.decrypt(actualizacion.path_project), // Desencriptar path para respuesta.
    };
  }

  update(id: number, updateActualizacionDto: UpdateActualizacionDto) {
    const actualizacionIndex = this.actualizaciones.findIndex((item) => item.id === id);

    if (actualizacionIndex === -1) {
      throw new NotFoundException(`Actualización con ID ${id} no encontrada`);
    }

    const actualizacion = this.actualizaciones[actualizacionIndex];
    const { idu_proyecto, numero_empleado, path_project } = updateActualizacionDto;

    const actualizada = {
      ...actualizacion,
      idu_proyecto: idu_proyecto || actualizacion.idu_proyecto,
      numero_empleado: numero_empleado || actualizacion.numero_empleado,
      path_project: path_project ? this.encryptionService.encrypt(path_project) : actualizacion.path_project,
    };

    this.actualizaciones[actualizacionIndex] = actualizada;

    return {
      message: 'Actualización actualizada correctamente',
      idu_proyecto: actualizada.idu_proyecto,
      numero_empleado: actualizada.numero_empleado,
    };
  }

  remove(id: number) {
    const actualizacionIndex = this.actualizaciones.findIndex((item) => item.id === id);

    if (actualizacionIndex === -1) {
      throw new NotFoundException(`Actualización con ID ${id} no encontrada`);
    }

    const idu_proyecto = this.actualizaciones[actualizacionIndex].idu_proyecto;
    const numero_empleado = this.actualizaciones[actualizacionIndex].numero_empleado;
    this.actualizaciones.splice(actualizacionIndex, 1);

    return {
      message: `Actualización con ID ${id} eliminada correctamente`,
      idu_proyecto,
      numero_empleado,
    };
  }
}
