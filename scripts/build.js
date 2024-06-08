const esbuild = require('esbuild');
const { sassPlugin } = require('esbuild-sass-plugin');
const { copy } = require('esbuild-plugin-copy');

const config = options => ({
  entryPoints: [
    'src/index.ts',
    'src/index.scss'
  ],
  bundle: true,
  minify: !options.watch,
  target: 'es6',
  outdir: 'docs',
  plugins: [
    sassPlugin({
      loadPaths: ['src/scss/lib']
    }),
    copy({
      assets: [{ from: 'src/index.html', to: 'index.html', watch: options.watch }],
    })
  ]
});

if (process.argv.slice(2)[0] === '-w') {
  esbuild.context(config({ watch: true }))
    .then(context => context.watch());
} else {
  esbuild.build(config({ watch: false }))
    .then(() => esbuild.stop());
}
