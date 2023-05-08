import { Account } from "../../models/account";
export interface AccountRepository {
  createAccount(account: Account): Promise<void>;
  getAccounts(accountIds: string[]): Promise<Account[]>;
}
