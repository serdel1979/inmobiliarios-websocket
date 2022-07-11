import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { RealState } from './realState.entity';
@Entity()
export class District extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => RealState, (realstate) => realstate.district, { eager: true, cascade: true})
  realstates: RealState[]
}
