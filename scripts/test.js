const esbuild = require('esbuild');
const glob = require('fast-glob');

const fs = require('fs');
const path = require('path');

const outdir = path.join(process.cwd(), 'test');

fs.rmSync(outdir, { recursive: true, force: true });

esbuild.build({
  entryPoints: glob.sync('src/**/*.spec.ts'),
  bundle: true,
  external: ['tape'],
  platform: 'node',
  outdir
});
