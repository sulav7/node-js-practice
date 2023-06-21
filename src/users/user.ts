import {
  AllowNull,
  Column,
  Default,
  Model,
  Table,
  Unique,
} from "sequelize-typescript";

export interface IUser extends Model {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  verify: boolean;
}

@Table
class User extends Model implements IUser {
  @AllowNull(false)
  @Column
  firstName: string;

  @AllowNull(false)
  @Column
  lastName: string;

  @AllowNull(false)
  @Column
  age: number;

  @AllowNull(false)
  @Unique(true)
  @Column
  email: string;

  @AllowNull(false)
  @Column
  password: string;

  @Default(false)
  @Column
  verify: boolean;
}
export default User;
