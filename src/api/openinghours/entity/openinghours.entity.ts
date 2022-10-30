import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { ScheduleEntity } from '../../schedule/entity/schedule.entity';

@Entity('openinghours')
export class OpeningHourEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: true })
  description: string;

  @Column({ length: 20 }) // MONDAY , TUESDAY, thursday etc...
  day: string;

  @Column('time')
  opensAt: Date

  @Column('time')
  closedAt: Date

  @Column({ type: 'integer', default: null })
  @JoinColumn()
  scheduleId: number;

  @ManyToOne(
    type => ScheduleEntity,
    schedule => schedule.openinghours
  )
  schedule: ScheduleEntity;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

}
