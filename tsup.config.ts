import { defineConfig } from "tsup";
import { readFileSync, writeFileSync } from "node:fs";

const { version } = JSON.parse(readFileSync("./package.json", "utf-8"));

export default defineConfig({
  entry: {
    index: "src/index.ts",
  },
  format: ["esm"],
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
    const src = readFileSync("./dist/index.js", "utf-8");
    if (!src.startsWith('"use client"')) {
      writeFileSync("./dist/index.js", '"use client";\n' + src);
    }
    // Stub so `import '@sakshatwtvision/wtv-ui/styles'` resolves in TypeScript
    writeFileSync("./dist/style.d.ts", "export {};\n");
  },
});
