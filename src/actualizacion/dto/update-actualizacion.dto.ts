import { PartialType } from '@nestjs/mapped-types';
import { CreateActualizacionDto } from './create-actualizacion.dto';

export class UpdateActualizacionDto extends PartialType(CreateActualizacionDto) {
  id: number;
}
