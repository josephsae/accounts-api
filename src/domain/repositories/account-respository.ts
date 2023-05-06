import { AccountDataSource } from "../../data/interfaces/data-sources/account-data-source";
import { AccountRepository } from "../interfaces/repositories/account-repository";
import { Account } from "../models/account";

export class AccountRepositoryImpl implements AccountRepository {
  accountDataSource: AccountDataSource;
  constructor(accountDataSource: AccountDataSource) {
    this.accountDataSource = accountDataSource;
  }

  async createAccount(account: Account): Promise<Account> {
    const result = await this.accountDataSource.create(account);
    return result;
  }
  async getAccounts(accountIds: string[]): Promise<Account[]> {
    const result = await this.accountDataSource.getForIds(accountIds);
    return result;
  }
}
