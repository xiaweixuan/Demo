### rollup
`npm i rollup`
> 2015 年，前端的ES module发布后，rollup应声而出。
> rollup编译ES6模块，提出了Tree-shaking，根据ES module静态语法特性，删除未被实际使用的代码，支持导出多种规范语法
rollup专注于纯javascript,可以将小块代码编译成大块复杂的代码,大多被用作打包tool工具或library库。

### terser
`npm install terser`
terser 是 uglify-es 的一个分支，主要保留了 uglify-es 的 API 和 CLI 和 uglify-js@3。

### parcel
`pnpm i parcel@next @parcel/transformer-react-refresh-wrap`
parcel 使用 worker 进程去启用多核编译，并且使用文件缓存
parcel 支持 0 配置，内置了 html、babel、typescript、less、sass、vue等功能，无需配置，并且不同于webpack只能将 js 文件作为入口，在 parcel 中万物皆资源，所以 html 文件 css 文件都可以作为入口来打包。
parcel会自动查找babel、postcss、posthtml的配置文件
parcel可以很方便的起一个自带热更新的server来开发vue/react项目。
parcel 的缺点：0 配置的代价是如果想要配置一些复杂的配置就很麻烦。
parcel2 使用 Rust 重写了 JavaScript 编译器

### ESBuild
`npm i esbuild`
它是用「Go」语言编写的，该语言可以编译为本地代码，所以在 i/o 和运算运行速度上比解释性语言 NodeJs 快得多
除了在终端执行，它允许我们在node、deno等环境同步或移步的执行构建操作
他支持解析jsx、ts等语法，支持压缩、treeShaking等

### snowpack
`npm i snowpack`
`npx create-snowpack-app react-snowpack --template @snowpack/app-template-minimal`
Snowpack 利用 JavaScript 的原生模块系统,试图取代webpack、parcel等打包程序。
Snowpack 对 JSX、TypeScript、React、Preact、CSS 模块等的内置支持。
开发环境下热更新。
使用esbuild打包

### vite
`npm i vite`
它由 开发服务器 和 构建命令 构成
开发服务器 vite在启动服务器后，会预先以所有 html 为入口，使用 esbuild 编译一遍，把所有的 node_modules 下的依赖编译并缓存起来，例如vue缓存为单个文件。
构建时使用rollup进行构建
