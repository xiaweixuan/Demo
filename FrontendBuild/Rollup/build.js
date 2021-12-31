const rollup = require('rollup')
const json = require('rollup-plugin-json')

const config = {
  input: 'src/index.js',
  plugins: [json()]
}

const outputOptions = {
  file: 'dist/bundle.js',
  format: 'umd',
  name: 'myBundle'
}

async function build() {
  // create a bundle
  const bundle = await rollup.rollup(config)

  await bundle.write(outputOptions)
}

build()