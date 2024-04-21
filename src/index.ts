import { httpServer } from "./server";

const port = 3000;

async function main() {
    httpServer.listen(port, () => console.log(`server berjalan di http://localhost:${port}`));
}
main()