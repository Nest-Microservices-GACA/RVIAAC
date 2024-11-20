import { Injectable } from '@nestjs/common';
import { CreateActualizacionDto } from './dto/create-actualizacion.dto';
import { UpdateActualizacionDto } from './dto/update-actualizacion.dto';

@Injectable()
export class ActualizacionService {
  create(createActualizacionDto: CreateActualizacionDto) {
    return 'This action adds a new actualizacion';
  }

  findAll() {
    return `This action returns all actualizacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} actualizacion`;
  }

  update(id: number, updateActualizacionDto: UpdateActualizacionDto) {
    return `This action updates a #${id} actualizacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} actualizacion`;
  }
}
