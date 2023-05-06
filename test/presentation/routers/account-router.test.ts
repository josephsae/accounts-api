import request from "supertest";
import { Account } from "../../../src/domain/models/account";
import { CreateAccountUseCase } from "../../../src/domain/interfaces/use-cases/account/create-account-use-case";
import { GetAccountsUseCase } from "../../../src/domain/interfaces/use-cases/account/get-accounts-use-case";
import AccountsRouter from "../../../src/presentation/routers/account-router";
import server from "../../../src/server";

class MockGetAccountsUseCase implements GetAccountsUseCase {
  execute(accountIds: string[]): Promise<Account[]> {
    throw new Error("Method not implemented.");
  }
}

class MockCreateAccountUseCase implements CreateAccountUseCase {
  execute(account: Account): Promise<Account> {
    throw new Error("Method not implemented.");
  }
}

describe("Account Router", () => {
  let mockCreateAccountUseCase: CreateAccountUseCase;
  let mockGetAccountsUseCase: GetAccountsUseCase;

  beforeAll(() => {
    mockGetAccountsUseCase = new MockGetAccountsUseCase();
    mockCreateAccountUseCase = new MockCreateAccountUseCase();
    server.use(
      "/account",
      AccountsRouter(mockGetAccountsUseCase, mockCreateAccountUseCase)
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
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

  describe("GET /account", () => {
    test("should return 200 with account data", async () => {
      const inputData = { account_ids: "1" };
      const expectedResult = [account];

      jest
        .spyOn(mockGetAccountsUseCase, "execute")
        .mockImplementation(() => Promise.resolve([account]));

      const response = await request(server).get("/account").query(inputData);

      expect(response.status).toBe(200);
      expect(mockGetAccountsUseCase.execute).toBeCalledTimes(1);
      expect(response.body).toStrictEqual(expectedResult);
    });

    test("should return 500", async () => {
      const inputData = { account_ids: "1" };
      const expectedResult = { message: "Error fetching data" };

      jest
        .spyOn(mockGetAccountsUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));

      const response = await request(server).get("/account").query(inputData);

      expect(response.status).toBe(500);
      expect(response.body).toStrictEqual(expectedResult);
    });
  });

  describe("POST /account", () => {
    test("should return 201 with account data", async () => {
      const inputData = account;
      const expectedResult = account;

      jest
        .spyOn(mockCreateAccountUseCase, "execute")
        .mockImplementation(() => Promise.resolve(account));

      const response = await request(server).post("/account").send(inputData);

      expect(response.status).toBe(201);
      expect(mockCreateAccountUseCase.execute).toBeCalledTimes(1);
      expect(response.body).toStrictEqual(expectedResult);
    });

    test("should return 500", async () => {
      const inputData = account;
      const expectedResult = { message: "Error saving data" };

      jest
        .spyOn(mockCreateAccountUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));

      const response = await request(server).post("/account").send(inputData);

      expect(response.status).toBe(500);
      expect(response.body).toStrictEqual(expectedResult);
    });
  });
});
