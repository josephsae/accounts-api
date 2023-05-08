import { Account } from "../../../../src/v1/domain/models/account";
import { AccountRepository } from "../../../../src/v1/domain/interfaces/repositories/account-repository";
import { CreateAccount } from "../../../../src/v1/domain/use-cases/account/create-account";

describe("Create Account Use Case", () => {
  class MockAccountRepository implements AccountRepository {
    createAccount(): Promise<void> {
      throw new Error("Method not implemented.");
    }
    getAccounts(): Promise<Account[]> {
      throw new Error("Method not implemented.");
    }
  }
  let mockAccountRepository: AccountRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockAccountRepository = new MockAccountRepository();
  });

  const account = {
    id: "1",
    holder: "John Smith",
    identification: {
      number: "123456789",
      type: "CC",
    },
    bank: {
      id: "341",
      name: "BBVA",
    },
    number: "1234567891111",
    type: "savings_account",
  };

  test("should return account data", async () => {
    const inputData = account;
    const expectedResult = account;

    jest
      .spyOn(mockAccountRepository, "createAccount")
      .mockImplementation(() => Promise.resolve());

    const createAccountUse = new CreateAccount(mockAccountRepository);
    await createAccountUse.execute(inputData);

    expect(mockAccountRepository.createAccount).toHaveBeenCalledWith(expectedResult);
  });
});
