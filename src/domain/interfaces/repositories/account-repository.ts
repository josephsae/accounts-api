import { Account } from "../../models/account";
export interface AccountRepository {
  createAccount(account: Account): Promise<Account>;
  getAccounts(accountIds: string[]): Promise<Account[]>;
}
