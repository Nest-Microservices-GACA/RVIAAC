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

  create(createActualizacionDto: CreateActualizacionDto, num_accion: number) {
    try {
      if (num_accion === 1) {
        const nuevaActualizacion = {
          id: this.actualizaciones.length + 1,
          ...createActualizacionDto,
          nom_aplicacion: this.encryptionService.encrypt(createActualizacionDto.nom_aplicacion),
          idu_proyecto: createActualizacionDto.idu_proyecto,
          num_accion,
        };

        this.actualizaciones.push(nuevaActualizacion);

        return {
          message: 'Actualización creada correctamente',
          actualizacion: {
            ...nuevaActualizacion,
            nom_aplicacion: this.encryptionService.decrypt(nuevaActualizacion.nom_aplicacion), // Desencriptado para la respuesta
          },
        };
      } else {
        throw new BadRequestException(`Acción num_accion ${num_accion} no implementada.`);
      }
    } catch (error) {
      throw new BadRequestException(`Error al crear la actualización: ${error.message}`);
    }
  }

  findAll() {

    return this.actualizaciones.map((actualizacion) => ({
      ...actualizacion,
      nom_aplicacion: this.encryptionService.decrypt(actualizacion.nom_aplicacion),
    }));
  }

  findOne(id: number) {
    const actualizacion = this.actualizaciones.find((item) => item.id === id);

    if (!actualizacion) {
      throw new NotFoundException(`Actualización con ID ${id} no encontrada`);
    }

    return {
      ...actualizacion,
      nom_aplicacion: this.encryptionService.decrypt(actualizacion.nom_aplicacion),
    };
  }

  update(id: number, updateActualizacionDto: UpdateActualizacionDto, num_accion: number) {
    const actualizacionIndex = this.actualizaciones.findIndex((item) => item.id === id);

    if (actualizacionIndex === -1) {
      throw new NotFoundException(`Actualización con ID ${id} no encontrada`);
    }

    if (num_accion === 1) {
   
      const actualizacion = this.actualizaciones[actualizacionIndex];

      const actualizada = {
        ...actualizacion,
        ...updateActualizacionDto,
        nom_aplicacion: this.encryptionService.encrypt(updateActualizacionDto.nom_aplicacion),
      };

      this.actualizaciones[actualizacionIndex] = actualizada;

      return {
        message: 'Actualización actualizada correctamente',
        actualizacion: {
          ...actualizada,
          nom_aplicacion: this.encryptionService.decrypt(actualizada.nom_aplicacion), 
        },
      };
    } else {
      throw new BadRequestException(`Acción num_accion ${num_accion} no soportada en actualización.`);
    }
  }

  remove(id: number) {
    const actualizacionIndex = this.actualizaciones.findIndex((item) => item.id === id);

    if (actualizacionIndex === -1) {
      throw new NotFoundException(`Actualización con ID ${id} no encontrada`);
    }

    this.actualizaciones.splice(actualizacionIndex, 1);

    return { message: `Actualización con ID ${id} eliminada correctamente` };
  }
}
