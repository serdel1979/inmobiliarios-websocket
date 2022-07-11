import { Module } from '@nestjs/common';
import { RealStateService } from './realState.service';
import { RealStateController } from './realState.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeRealState } from '../entity/typeRealState.entity';
import { District } from '../entity/district.entity';
import { RealState } from '../entity/realState.entity';
import { State } from '../entity/state.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RealState, TypeRealState, District, State])],
  providers: [RealStateService],
  controllers: [RealStateController],
})
export class RealStateModule {}
