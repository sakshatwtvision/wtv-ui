import { defineConfig } from "tsup";
import { readFileSync, writeFileSync } from "node:fs";

const { version } = JSON.parse(readFileSync("./package.json", "utf-8"));

export default defineConfig({
  entry: {
    index: "src/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  external: ["react", "react-dom", "react/jsx-runtime", /^@base-ui\/react/, "lucide-react"],
  sourcemap: false,
  clean: true,
  treeshake: true,
  splitting: false,
  tsconfig: "./tsconfig.build.json",
  esbuildOptions(options) {
    options.conditions = ["module"];
    options.define = { __PKG_VERSION__: JSON.stringify(version) };
  },
  async onSuccess() {
    for (const path of ["./dist/index.js", "./dist/index.cjs"]) {
      const src = readFileSync(path, "utf-8");
      if (!src.startsWith('"use client"')) {
        writeFileSync(path, '"use client";\n' + src);
      }
    }
    // Stub so `import '@sakshatwtvision/wtv-ui/styles'` resolves in TypeScript
    writeFileSync("./dist/style.d.ts", "export {};\n");
  },
});
