import { Account } from "../../../models/account";

export interface CreateAccountUseCase {
  execute(account: Account): Promise<void>;
}
