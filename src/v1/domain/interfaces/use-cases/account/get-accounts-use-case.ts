import { Account } from "../../../models/account";

export interface GetAccountsUseCase {
  execute(accountIds: string[]): Promise<Account[]>;
}
