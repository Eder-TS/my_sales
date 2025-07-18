import { IUserTokens } from '../models/IUserTokens';

export interface IUserTokensRepositories {
  findByToken(token: string): Promise<IUserTokens | null>;
  generate(userId: number): Promise<IUserTokens | null>;
}
