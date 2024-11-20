import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActualizacionModule } from './actualizacion/actualizacion.module';

@Module({
  imports: [ActualizacionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
