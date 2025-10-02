import { IsEnum, IsOptional } from 'class-validator';
import { ShipmentStatus } from '../../domain/value-objects/status';

export class ShipmentsQueryDto {
  @IsOptional()
  @IsEnum(ShipmentStatus)
  status?: ShipmentStatus;
}
