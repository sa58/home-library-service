export class TokenPairEntity {
  accessToken: string;

  refreshToken: string;

  constructor(partial: Partial<TokenPairEntity>) {
    Object.assign(this, partial);
  }
}
