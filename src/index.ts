import { createServer } from "./server";
import v1Router from "./v1/index";

const PORT = process.env.PORT || 4000;
const server = createServer();
server.use("/v1", v1Router);
server.listen(PORT, () => console.log(`Running on server in ${PORT}`));

