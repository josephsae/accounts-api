import { Account } from "../../models/account";
import { AccountRepository } from "../../interfaces/repositories/account-repository";
import { GetAccountsUseCase } from "../../interfaces/use-cases/account/get-accounts-use-case";

export class GetAccounts implements GetAccountsUseCase {
  accountRepository: AccountRepository;
  constructor(accountRepository: AccountRepository) {
    this.accountRepository = accountRepository;
  }

  async execute(accountIds: string[]): Promise<Account[]> {
    const result = await this.accountRepository.getAccounts(accountIds);
    return result;
  }
}
