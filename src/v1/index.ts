import AccountRouter from "./presentation/routers/account-router";
import { GetAccounts } from "./domain/use-cases/account/get-accounts";
import { AccountRepositoryImpl } from "./domain/repositories/account-respository";
import { CreateAccount } from "./domain/use-cases/account/create-account";
import { NoSQLDatabaseWrapper } from "./data/interfaces/data-sources/nosql-database-wrapper";
import { MongoDBAccountDataSource } from "./data/data-sources/mongodb/mongodb-account-data-source";
import { createRouter } from "../server";
import getDb from "./config/mongodb";

async function getAccountRouter() {
  const db = await getDb();

  const accountDatabase: NoSQLDatabaseWrapper = {
    find: (query) => db.collection("accounts").find(query).toArray(),
    insertOne: (doc) => db.collection("accounts").insertOne(doc),
  };

  return AccountRouter(
    new GetAccounts(
      new AccountRepositoryImpl(new MongoDBAccountDataSource(accountDatabase))
    ),
    new CreateAccount(
      new AccountRepositoryImpl(new MongoDBAccountDataSource(accountDatabase))
    )
  );
}

const router = createRouter();
router.get("/account", getAccountRouter);

export default router;
