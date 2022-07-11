import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity, JoinColumn } from 'typeorm';
import { RealState } from './realState.entity';

@Entity()
export class State extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  state: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_system: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_user: Date;

  @Column()
  sub_state: string;

  @ManyToOne(() => RealState, (realState) => realState.states, {onDelete: "CASCADE"})
  @JoinColumn({ name: "realStateId", referencedColumnName: "id"})
  real_state: RealState;
}
