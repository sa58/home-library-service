import { Exclude, Transform } from 'class-transformer';

export class UserEntity {
  id: string;

  login: string;

  @Exclude()
  password: string;

  version: number;

  @Transform((val) => Number(val.value))
  createdAt: bigint;

  @Transform((val) => Number(val.value))
  updatedAt?: bigint;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
