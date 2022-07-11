export class CreateStateDto {
  readonly state: string;
  readonly updated_user: Date;
  readonly sub_state: string;

  constructor(state: string, updated_user: Date, sub_state: string) {
    this.state = state;
    this.updated_user = updated_user;
    this.sub_state = sub_state;
  }
}
