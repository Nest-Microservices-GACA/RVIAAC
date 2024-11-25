import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ActualizacionService } from './actualizacion.service';
import { CreateActualizacionDto } from './dto/create-actualizacion.dto';
import { UpdateActualizacionDto } from './dto/update-actualizacion.dto';

@Controller()
export class ActualizacionController {
  constructor(private readonly actualizacionService: ActualizacionService) {}

  @MessagePattern('createActualizacion')
  create(@Payload() createActualizacionDto: CreateActualizacionDto) {
    const num_accion = 1; 
    return this.actualizacionService.create(createActualizacionDto, num_accion);
  }

  @MessagePattern('findAllActualizacion')
  findAll() {
    return this.actualizacionService.findAll();
  }

  @MessagePattern('findOneActualizacion')
  findOne(@Payload() id: number) {
    return this.actualizacionService.findOne(id);
  }

  @MessagePattern('updateActualizacion')
  update(@Payload() updateActualizacionDto: UpdateActualizacionDto) {
    const num_accion = 1; 
    return this.actualizacionService.update(updateActualizacionDto.id, updateActualizacionDto, num_accion);
  }

  @MessagePattern('removeActualizacion')
  remove(@Payload() id: number) {
    return this.actualizacionService.remove(id);
  }
}
