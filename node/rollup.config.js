import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { dependencies } from "./package.json";

export default [
  {
    input: "src/app.ts",
    output: {
      file: "build/app.js",
      format: "cjs",
    },
    plugins: [
      json(),
      alias({ entries: [{ find: /@\/(\*)/, replacement: "./src/$1" }] }),
      resolve({ preferBuiltins: true }),
      commonjs(),
      typescript(),
    ],
    external: [...Object.keys({ ...dependencies })],
  },
];
