import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
      exports: 'named',
    },
  ],
  external: [...Object.keys(pkg.peerDependencies || {}), 'styled-components'],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist',
      exclude: ['**/*.test.tsx', '**/*.test.ts']
    }),
    babel({
      exclude: 'node_modules/**',
      plugins: ['babel-plugin-styled-components'],
      babelHelpers: 'runtime',
      extensions: ['.ts', '.tsx']
    }),
    terser(),
  ],
};
