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

@Entity('breaks')
export class BreakEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: true })
  description: string;

  @Column('time')
  from: Date;

  @Column('time')
  to: Date;

  @Column({ type: 'integer', default: null })
  @JoinColumn()
  scheduleId: number;

  // One user have many holidays when he dont works
  @ManyToOne(
    type => ScheduleEntity,
    schedule => schedule.breaks
  )
  schedule: ScheduleEntity;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

}
