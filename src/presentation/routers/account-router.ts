import express from "express";
import { Request, Response } from "express";
import { CreateAccountUseCase } from "../../domain/interfaces/use-cases/account/create-account-use-case";
import { GetAccountsUseCase } from "../../domain/interfaces/use-cases/account/get-accounts-use-case";

export default function AccountsRouter(
  getAccountsUseCase: GetAccountsUseCase,
  createAccountUseCase: CreateAccountUseCase
) {
  const router = express.Router();

  router.get("/", async (req: Request, res: Response) => {
    try {
      const {
        query: { account_ids },
      } = req;
      const accountIds = account_ids as string[];
      const accounts = await getAccountsUseCase.execute(accountIds);
      res.send(accounts);
    } catch (err) {
      res.status(500).send({ message: "Error fetching data" });
    }
  });

  router.post("/", async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const account = await createAccountUseCase.execute(body);
      res.statusCode = 201;
      res.json(account);
    } catch (err) {
      res.status(500).send({ message: "Error saving data" });
    }
  });

  return router;
}
