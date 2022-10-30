import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentEntity } from './entity/appointment.entity';
import { ScheduleEntity } from '../schedule/entity/schedule.entity';
import { IsNull, LessThanOrEqual, MoreThan, Repository, Not, LessThan } from 'typeorm';
import { ResponseData } from './../../shared/interfaces/response.interface';
import { } from 'typeorm';
import { DAYS } from './interfaces/days.interface';

import moment = require('moment');
import { OpeningHourEntity } from '../openinghours/entity/openinghours.entity';
import { HolidayEntity } from '../holiday/entity/holiday.entity';
import { BreakEntity } from '../break/entity/break.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(AppointmentEntity)
    private readonly appointmentRepository: Repository<AppointmentEntity>,
    @InjectRepository(ScheduleEntity)
    private readonly scheduleRepository: Repository<ScheduleEntity>,
    @InjectRepository(OpeningHourEntity)
    private readonly openingHoursRepository: Repository<OpeningHourEntity>,
    @InjectRepository(HolidayEntity)
    private readonly holidaysRepository: Repository<HolidayEntity>,
    @InjectRepository(BreakEntity)
    private readonly breakRepository: Repository<BreakEntity>,
  ) { }

  async get(id: any): Promise<ResponseData> {
    try {
      const data = await this.scheduleRepository.findOne({ id }, { relations: ['appointments', 'breaks', 'holidays', 'openinghours'] })

      if (!data) return {
        success: false,
        data: null,
        message: "Not found"
      }

      return {
        success: true,
        message: 'Schedule fetched successfully.',
        data
      };
    } catch (error) {
      console.log({ error });
    }
  }


  async create(payload: any): Promise<ResponseData> {

    const { slotTime, scheduleId } = payload;
    const day = DAYS[moment(slotTime).day()]; // sunday, monday

    const startTime = moment(slotTime).format("HH:mm"); //03:00

    const schedule = await this.scheduleRepository.findOne({ id: scheduleId });

    if (!schedule) return {
      success: false,
      message: `Invalid scheduleId`,
      data: null
    }

    //checking if it's closed today
    const isClosedToday = await this.holidaysRepository.findOne({
      where: [
        { day, scheduleId },
        { scheduleId: IsNull(), day, date: slotTime } // public holidays
      ]
    });;

    if (isClosedToday) {
      return {
        success: false,
        message: `Closed today.`,
        data: null
      };
    }

    //checking if the slot in the break;
    const slotInBreak = await this.breakRepository.findOne({
      where: {
        scheduleId,
        from: LessThan(moment(startTime)),
        to: MoreThan(startTime)
      }
    });

    if (slotInBreak) {
      return {
        success: false,
        message: `Can't create an appointment in a break.`,
        data: null
      };
    }

    const startDate = moment(slotTime);

    if (startDate.isBefore(new Date()))
      return {
        success: false,
        message: `Invalid startDate. Appointment can't created in the past`,
        data: null
      };

    if (startDate.diff(Date.now(), 'days') > 7) {
      return {
        success: false,
        message: `Appointments can be scheduled within 7 days from now.`,
        data: null
      }
    }

    const alreadyBooked = await this.appointmentRepository.findOne({ where: { slotTime, scheduleId } });
    if (alreadyBooked) {
      return {
        success: false,
        message: 'The slot is already reserved',
        data: alreadyBooked
      };
    }

    const isOpened = await this.openingHoursRepository.findOne({
      where: {
        // opensAt: LessThan(startTime),
        // closedAt: MoreThan(startTime),
        day,
        scheduleId
      }
    });

    if (isOpened && !moment(slotTime).isBetween(moment(isOpened.opensAt).format('HH:mm'), moment(isOpened.closedAt).format("HH:mm")))
      return {
        success: false,
        message: 'The slot must be in opening hours of schedule.',
        data: alreadyBooked
      };


    const { identifiers } = await this.appointmentRepository.insert({ ...payload });
    const appointment: AppointmentEntity = await this.appointmentRepository.findOne(
      {
        id: identifiers[0].id,
      },
    );

    return {
      success: true,
      message: 'Appointment created successfully.',
      data: appointment
    };
  }

}
