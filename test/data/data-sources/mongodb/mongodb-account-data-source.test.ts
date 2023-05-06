import { MongoDBAccountDataSource } from "../../../../src/data/data-sources/mongodb/mongodb-account-data-source";
import { NoSQLDatabaseWrapper } from "../../../../src/data/interfaces/data-sources/nosql-database-wrapper";
import { ObjectId } from "mongodb";

describe("MongoDB DataSource", () => {
  let mockDatabase: NoSQLDatabaseWrapper;

  beforeAll(async () => {
    mockDatabase = {
      find: jest.fn(),
      insertOne: jest.fn(),
    };
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

  test("getForIds", async () => {
    const inputData = ["1"];
    const expectedResult = [account];

    const query = { ["id"]: { $in: inputData } };

    jest
      .spyOn(mockDatabase, "find")
      .mockImplementation(() => Promise.resolve([account]));

    const ds = new MongoDBAccountDataSource(mockDatabase);
    const result = await ds.getForIds(inputData);

    expect(mockDatabase.find).toHaveBeenCalledWith(query);
    expect(result).toStrictEqual(expectedResult);
  });

  test("create", async () => {
    const inputData = account;
    const expectedResult = account;

    jest
      .spyOn(mockDatabase, "insertOne")
      .mockImplementation(() => Promise.resolve(account));

    const ds = new MongoDBAccountDataSource(mockDatabase);
    const result = await ds.create(inputData);

    expect(mockDatabase.insertOne).toHaveBeenCalledWith(account);
    expect(result).toStrictEqual(expectedResult);
  });
});
