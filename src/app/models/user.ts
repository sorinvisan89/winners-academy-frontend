import {Role} from './role';

export class User {

  userId: bigint;
  name: string;
  password: string;
  email: string;
  type: Role;
}
