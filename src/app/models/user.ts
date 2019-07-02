import {UserType} from './user-type';

export class User {

  userId: bigint;
  name: string;
  password: string;
  email: string;
  type: UserType;
}
