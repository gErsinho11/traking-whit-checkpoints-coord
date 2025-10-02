import { IsEnum, IsISO8601, IsOptional, IsString } from 'class-validator';
import { ShipmentStatus } from '../../domain/value-objects/status';

export class CreateCheckpointDto {
  @IsString()
  trackingId!: string;

  @IsEnum(ShipmentStatus)
  status!: ShipmentStatus;

  @IsOptional()
  @IsISO8601()
  timestamp?: string;

  @IsOptional()
  @IsString()
  location?: string;
}
