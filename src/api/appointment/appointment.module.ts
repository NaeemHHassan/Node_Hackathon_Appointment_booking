import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentsController } from './appointment.controller';
import { AppointmentEntity } from './entity/appointment.entity';

import { TypeOrmModule } from '@nestjs/typeorm';
import { HolidayEntity } from '../holiday/entity/holiday.entity';
import { OpeningHourEntity } from '../openinghours/entity/openinghours.entity';
import { ScheduleEntity } from '../schedule/entity/schedule.entity';
import { BreakEntity } from '../break/entity/break.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentEntity, ScheduleEntity, HolidayEntity, BreakEntity, OpeningHourEntity])],
  providers: [AppointmentService],
  controllers: [AppointmentsController]
})
export class AppointmentModule { }
