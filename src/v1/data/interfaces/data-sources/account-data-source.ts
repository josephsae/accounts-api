import { Account } from "../../../domain/models/account";
export interface AccountDataSource {
  create(account: Account): Promise<void>;
  getForIds(accountIds: string[]): Promise<Account[]>;
}
