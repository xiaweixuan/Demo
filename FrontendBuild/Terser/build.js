const { minify } = require("terser")
const fs = require("fs")

async function build() {
  const result = await minify(fs.readFileSync("src/index.js", "utf8"))
  // console.log(result)
  fs.writeFileSync("handle.js", result.code, "utf8")
}
build()