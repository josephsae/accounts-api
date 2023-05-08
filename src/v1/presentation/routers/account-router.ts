import { Request, Response } from "express";
import { CreateAccountUseCase } from "../../domain/interfaces/use-cases/account/create-account-use-case";
import { GetAccountsUseCase } from "../../domain/interfaces/use-cases/account/get-accounts-use-case";
import { createRouter } from "../../../server";

function AccountRouter(
  getAccountsUseCase: GetAccountsUseCase,
  createAccountUseCase: CreateAccountUseCase
) {
  const router = createRouter();

  router.get("/", async (req: Request, res: Response) => {
    try {
      const {
        query: { account_ids },
      } = req;
      const accountIds = <string>account_ids;
      const accounts = await getAccountsUseCase.execute(accountIds.split(","));
      res.send(accounts);
    } catch (err) {
      res.status(500).send({ message: "Error fetching data" });
    }
  });

  router.post("/", async (req: Request, res: Response) => {
    try {
      const { body } = req;
      await createAccountUseCase.execute(body);
      res.statusCode = 201;
      res.json({ message: "Created" });
    } catch (err) {
      res.status(500).send({ message: "Error saving data" });
    }
  });

  return router;
}

export default AccountRouter;
