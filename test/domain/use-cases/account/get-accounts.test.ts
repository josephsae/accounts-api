import { Account } from "../../../../src/domain/models/account";
import { AccountRepository } from "../../../../src/domain/interfaces/repositories/account-repository";
import { GetAccounts } from "../../../../src/domain/use-cases/account/get-accounts";

describe("Get Accounts Use Case", () => {
  class MockAccountRepository implements AccountRepository {
    createAccount(account: Account): Promise<Account> {
      throw new Error("Method not implemented.");
    }
    getAccounts(accountIds: string[]): Promise<Account[]> {
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
    const inputData = ["1"];
    const expectedResult = [account];

    jest
      .spyOn(mockAccountRepository, "getAccounts")
      .mockImplementation(() => Promise.resolve([account]));

    const getAccountsUse = new GetAccounts(mockAccountRepository);
    const result = await getAccountsUse.execute(inputData);

    expect(result).toStrictEqual(expectedResult);
  });
});
