import { Exclude, Expose, Transform } from "class-transformer";

export class UserEntity {
  id: string;

  login: string;

  @Exclude()
  password: string;

  @Transform(val => 'd')
  version: number;

  createdAt: number;

  updatedAt?: number;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
