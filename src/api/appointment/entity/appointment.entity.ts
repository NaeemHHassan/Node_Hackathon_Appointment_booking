import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import { ScheduleEntity } from '../../schedule/entity/schedule.entity';

@Entity('appointments')
export class AppointmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  firstName: string;

  @Column('text')
  lastName: string;

  @Column('text')
  email: string;

  @Column('datetime')
  slotTime: Date;

  @Column('integer')
  @JoinColumn()
  scheduleId: number;

  @ManyToOne(
    type => ScheduleEntity,
    schedule => schedule.appointments
  )
  schedule: ScheduleEntity

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

}
