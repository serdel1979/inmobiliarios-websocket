import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity } from 'typeorm';
import { RealState } from './realState.entity';

@Entity()
export class TypeRealState extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @OneToMany(() => RealState, (realState) => realState.type_real_state, { eager: true, cascade: true})
  realState: RealState[];
}
