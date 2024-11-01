import { build } from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';
import p from './package.json' with { type: 'json' };

const { dependencies } = p;

// const entryFile = 'components/*';
const outPath = './dist';
const shared = {
  packages: 'external',
  bundle: true,
  entryPoints: ['components/*', 'components/**/*'],
  loader: { '.js': 'jsx' },
  external: Object.keys(dependencies),
  logLevel: 'info',
  minify: false,
  sourcemap: false,
  plugins: [sassPlugin()],
};

build({
  ...shared,
  format: 'esm',
  outdir: `${outPath}/mjs`,
  target: ['esnext', 'node20.6.0', 'es2022'],
});

build({
  ...shared,
  format: 'cjs',
  outdir: `${outPath}/cjs`,
  target: ['esnext', 'node20.6.0', 'es2022'],
});
