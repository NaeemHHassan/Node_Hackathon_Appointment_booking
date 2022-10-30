import { Controller, UseGuards, Post, Body, Put, Delete, Param, Request, Get } from '@nestjs/common';
import { ResponseData } from './../../shared/interfaces/response.interface';;

import { AppointmentService } from './appointment.service';
import { createAppointmentDto } from './interfaces/createAppointment.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentService: AppointmentService) { }

  @Get(':id')
  get(@Param('id') id: number): Promise<ResponseData> {
    return this.appointmentService.get(id);
  }

  @Post()
  create(@Body() payload: createAppointmentDto): Promise<ResponseData> {
    return this.appointmentService.create(payload);
  }

}
