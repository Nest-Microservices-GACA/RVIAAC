import { Module } from '@nestjs/common';
import { ActualizacionService } from './actualizacion.service';
import { ActualizacionController } from './actualizacion.controller';

@Module({
  controllers: [ActualizacionController],
  providers: [ActualizacionService],
})
export class ActualizacionModule {}
