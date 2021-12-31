(async () => {
  require('esbuild')
    .build({
      entryPoints: ['src/index.jsx'],
      // bundle: true, // 将依赖文件内敛
      format: 'iife', // iife cjs esm
      minify: true, // 压缩
      platform: 'browser', // browser node 
      outfile: 'dist/index.js',
      treeShaking: true,
      target: [
        'es2020',
        'chrome58',
        'firefox57',
        'safari11',
        'edge16',
        'node12',
      ],
      // watch: {
      //   onRebuild(error, result) {
      //     if (error) console.error('watch build failed:', error)
      //     else console.log('watch build succeeded:', result)
      //   },
      // },
    })
    .catch(() => process.exit(1))
})()