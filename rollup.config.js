import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "src/index.tsx",
    output: {
      dir: "dist",
      format: "esm",
      exports: "auto",
      sourcemap: false,
    },
    external: ["react", "styled-components", /@babel\/runtime/, "react/jsx-runtime"],
    plugins: [
      typescript(),
      babel({
        exclude: ["node_modules/**", "example/**", "__tests__/**"],
        plugins: ["@babel/transform-runtime", "babel-plugin-styled-components"],
        babelHelpers: "runtime",
      }),
      terser({ format: { comments: false } }),
    ],
  },
];
