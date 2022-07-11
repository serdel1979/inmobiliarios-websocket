import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RealStateDto } from '../dto/createRealState.dto';
import { DistrictDto } from '../dto/district.dto';
import { District } from '../entity/district.entity';
import { RealState } from '../entity/realState.entity';
import { TypeRealState } from '../entity/typeRealState.entity';



@Injectable()
export class RealStateService {
  constructor(
    @InjectRepository(RealState) private realStateRepository: Repository<RealState>,
    @InjectRepository(TypeRealState) private typeRealStateRepository: Repository<TypeRealState>,
    @InjectRepository(District) private districtRepository: Repository<District>) { }

  async findAll(params): Promise<RealState[]> {
    return await this.realStateRepository.find({ relations: ["type_real_state","district"] });
  }



  async getTypeRealStates(): Promise<TypeRealState[]> {
    return await this.typeRealStateRepository.find();
  }

  async getDistricts(): Promise<District[]> {
    return await this.districtRepository.find();
  }

  async createRealState(newRealState: RealStateDto): Promise<RealState> {
    newRealState.current_state = "NO CONFIRMADO";
    return this.realStateRepository.save(newRealState);
  }

  async deleteRealState(realStateId: string): Promise<any> {
    let relState = this.findRealState(parseInt(realStateId));
    if ((await relState).states.length > 0) {
      throw new BadRequestException({ message: "No se puede eliminar el conjunto inmobiliario con estados" });
    }
    return await this.realStateRepository.delete({ id: parseInt(realStateId) });
   
  }

  async updateRealState(
    realStateId: string,
    newRealState: RealStateDto,
  ): Promise<RealState> {
    console.log(realStateId);
    const toUpdate = await this.realStateRepository.findOne({
      where: { id: parseInt(realStateId) },
    });
    const updated = Object.assign(toUpdate, newRealState);
    return this.realStateRepository.save(updated);
  }

  async findRealState(realStateId: number): Promise<RealState> {
    return await this.realStateRepository.findOne(realStateId, { relations: ["type_real_state","district"] });
  }


}