import { IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class createAppointmentDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'firstName is required' })
  firstName: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'lastName is required' })
  lastName: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'email is required' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'slotTime is required' })
  slotTime: Date;

  @ApiProperty()
  @IsNotEmpty({ message: 'userId is required' })
  scheduleId: number;

}