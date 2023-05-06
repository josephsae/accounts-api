import { AccountDataSource } from "../../../src/data/interfaces/data-sources/account-data-source";
import { Account } from "../../../src/domain/models/account";
import { AccountRepository } from "../../../src/domain/interfaces/repositories/account-repository";
import { AccountRepositoryImpl } from "../../../src/domain/repositories/account-respository";

class MockAccountDataSource implements AccountDataSource {
  create(account: Account): Promise<Account> {
    throw new Error("Method not implemented.");
  }
  getForIds(accountIds: string[]): Promise<Account[]> {
    throw new Error("Method not implemented.");
  }
}

describe("Contact Repository", () => {
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

  describe("getAllContacts", () => {
    test("should return data", async () => {
      const inputData = ["1"];
      const expectedData = [account];

      jest
        .spyOn(mockAccountDataSource, "getForIds")
        .mockImplementation(() => Promise.resolve([account]));

      const result = await accountRepository.getAccounts(inputData);

      expect(result).toStrictEqual(expectedData);
    });
  });

  describe("createContact", () => {
    test("should return true", async () => {
      const inputData = account;
      const expectedData = account;

      jest
        .spyOn(mockAccountDataSource, "create")
        .mockImplementation(() => Promise.resolve(account));

      const result = await accountRepository.createAccount(inputData);

      expect(result).toStrictEqual(expectedData);
    });
  });
});
