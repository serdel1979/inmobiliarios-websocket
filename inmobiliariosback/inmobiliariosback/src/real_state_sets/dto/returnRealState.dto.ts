import { District } from "../entity/district.entity";
import { TypeRealState } from "../entity/typeRealState.entity";


export class ReturnRealStateDto {
   name: string;
   id_cou: number;
   priority: number;
   register_source: string;
   type_real_state: TypeRealState;
   district: District;
   id_mae: number;
   holders_count: number;
}