import { Account } from "../../models/account";
import { AccountRepository } from "../../interfaces/repositories/account-repository";
import { CreateAccountUseCase } from "../../interfaces/use-cases/account/create-account-use-case";

export class CreateAccount implements CreateAccountUseCase {
  accountRepository: AccountRepository;
  constructor(accountRepository: AccountRepository) {
    this.accountRepository = accountRepository;
  }

  async execute(account: Account): Promise<Account> {
    const result = await this.accountRepository.createAccount(account);
    return result;
  }
}
