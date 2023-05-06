import server from "./server";
import AccountRouter from "./presentation/routers/account-router";
import { GetAccounts } from "./domain/use-cases/account/get-accounts";
import { AccountRepositoryImpl } from "./domain/repositories/account-respository";
import { CreateAccount } from "./domain/use-cases/account/create-account";
import { MongoClient } from "mongodb";
import { NoSQLDatabaseWrapper } from "./data/interfaces/data-sources/nosql-database-wrapper";
import { MongoDBAccountDataSource } from "./data/data-sources/mongodb/mongodb-account-data-source";

(async () => {
  const url = "mongodb://localhost:27017";
  const client = await MongoClient.connect(url);

  const db = client.db("admin");

  const contactDatabase: NoSQLDatabaseWrapper = {
    find: (query) => db.collection("accounts").find(query).toArray(),
    insertOne: (doc) => db.collection("accounts").insertOne(doc),
  };

  const contactMiddleWare = AccountRouter(
    new GetAccounts(
      new AccountRepositoryImpl(new MongoDBAccountDataSource(contactDatabase))
    ),
    new CreateAccount(
      new AccountRepositoryImpl(new MongoDBAccountDataSource(contactDatabase))
    )
  );

  server.use("/accounts", contactMiddleWare);
  server.listen(4000, () => console.log("Running on server"));
})();
