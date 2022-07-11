import { District } from "../entity/district.entity";
import { TypeRealState } from "../entity/typeRealState.entity";

export class RealStateDto {
  readonly name: string;
  readonly type: number;
  readonly id_cou: number;
  readonly priority: number;
  readonly register_source: string;
  current_state: string;
  readonly type_real_state: TypeRealState;
  readonly district: District;
  readonly id_mae: number;
  readonly holders_count: number;
}
