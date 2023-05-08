import { Account } from "../../../domain/models/account";
import { AccountDataSource } from "../../interfaces/data-sources/account-data-source";
import { NoSQLDatabaseWrapper } from "../../interfaces/data-sources/nosql-database-wrapper";

export class MongoDBAccountDataSource implements AccountDataSource {
  private db: NoSQLDatabaseWrapper;
  constructor(db: NoSQLDatabaseWrapper) {
    this.db = db;
  }
  async create(account: Account): Promise<void> {
    await this.db.insertOne(account);
  }

  async getForIds(ids: string[]): Promise<Account[]> {
    const query = { ["id"]: { $in: ids } };

    const result = await this.db.find(query);
    return result.map((item) => ({
      id: item.id,
      holder: item.holder,
      identification: item.identification,
      bank: item.bank,
      number: item.number,
      type: item.type,
    }));
  }
}
