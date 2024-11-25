import { IsInt, IsString, IsNotEmpty } from 'class-validator';

export class CreateActualizacionDto {
  @IsInt()
  idu_proyecto: number;

  @IsInt()
  num_accion: number;

  @IsInt()
  numero_empleado: number;

  @IsString()
  @IsNotEmpty()
  path_project: string;
}
