import { AppointmentEntity } from '../../appointment/entity/appointment.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { OpeningHourEntity } from 'src/api/openinghours/entity/openinghours.entity';
import { HolidayEntity } from 'src/api/holiday/entity/holiday.entity';
import { BreakEntity } from 'src/api/break/entity/break.entity';

@Entity('schedules')
export class ScheduleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @Column('date')
  startDate: Date

  @Column('date')
  endDate: Date

  @Column("integer")
  duration: number; //duration in minutes for each appointment

  @Column('integer')
  bufferTime: number;

  @Column('integer', { default: 3 })
  maxClients: number;

  @OneToMany(
    type => AppointmentEntity,
    appointment => appointment.schedule
  )
  appointments: AppointmentEntity[];

  @OneToMany(
    type => OpeningHourEntity,
    openinghours => openinghours.schedule
  )
  openinghours: OpeningHourEntity[];

  @OneToMany(
    type => HolidayEntity,
    holidays => holidays.schedule
  )
  holidays: HolidayEntity[];


  @OneToMany(
    type => BreakEntity,
    breaks => breaks.schedule
  )
  breaks: BreakEntity[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

}
