import { AccountDataSource } from "../../../src/v1/data/interfaces/data-sources/account-data-source";
import { Account } from "../../../src/v1/domain/models/account";
import { AccountRepository } from "../../../src/v1/domain/interfaces/repositories/account-repository";
import { AccountRepositoryImpl } from "../../../src/v1/domain/repositories/account-respository";

class MockAccountDataSource implements AccountDataSource {
  create(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getForIds(): Promise<Account[]> {
    throw new Error("Method not implemented.");
  }
}

describe("Account Repository", () => {
  let mockAccountDataSource: AccountDataSource;
  let accountRepository: AccountRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockAccountDataSource = new MockAccountDataSource();
    accountRepository = new AccountRepositoryImpl(mockAccountDataSource);
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

  describe("Get Accounts for Ids", () => {
    test("should return data", async () => {
      const inputData = ["1"];
      const expectedResult = [account];

      jest
        .spyOn(mockAccountDataSource, "getForIds")
        .mockImplementation(() => Promise.resolve([account]));

      const result = await accountRepository.getAccounts(inputData);

      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe("Create Account", () => {
    test("should return true", async () => {
      const inputData = account;
      const expectedResult = account;

      jest
        .spyOn(mockAccountDataSource, "create")
        .mockImplementation(() => Promise.resolve());

      await accountRepository.createAccount(inputData);
      expect(mockAccountDataSource.create).toHaveBeenCalledWith(expectedResult);
    });
  });
});
