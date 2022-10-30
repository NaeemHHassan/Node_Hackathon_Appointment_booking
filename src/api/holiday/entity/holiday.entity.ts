import { ScheduleEntity } from 'src/api/schedule/entity/schedule.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  IsNull,
} from 'typeorm';

@Entity('holidays')
export class HolidayEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: true })
  description: string;

  @Column({ type: 'integer', default: null })
  @JoinColumn()
  scheduleId: number;

  @Column("date", { nullable: true, default: null }) // for public holidays
  date: Date

  @Column({ length: 20 })
  day: string;

  @ManyToOne(
    type => ScheduleEntity,
    schedule => schedule.holidays
  )
  schedule: ScheduleEntity;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

}
