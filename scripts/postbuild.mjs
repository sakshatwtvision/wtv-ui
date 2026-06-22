import { copyFileSync, writeFileSync } from "node:fs";

// Type stubs so consumers don't get TS2882 on side-effect CSS imports.
writeFileSync("./dist/style.d.ts", "export {};\n");
writeFileSync("./dist/tokens.d.ts", "export {};\n");

// Source @theme tokens — copied as-is so the consumer's Tailwind build can
// process the @theme directive and remove default color utilities.
copyFileSync("./src/styles/tokens.css", "./dist/tokens.css");
