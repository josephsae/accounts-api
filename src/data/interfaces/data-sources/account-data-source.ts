import { Account } from "../../../domain/models/account";
export interface AccountDataSource {
  create(account: Account): Promise<Account>;
  getForIds(accountIds: string[]): Promise<Account[]>;
}
