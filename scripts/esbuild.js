const esbuild = require('esbuild');
const fs = require('fs')
const path = require('path')

async function buildDir(start) {
  const relativePath = start ? start : './src'

  const all = await fs.readdirSync(relativePath)
  const files = all.filter(ext => ext.endsWith('.ts'))
    .map(name => path.resolve(relativePath, name))

  const dirs = all.filter(ext => !ext.endsWith('.ts'))

  await esbuild.buildSync({
    entryPoints: files,
    outdir: path.join('./build', relativePath.replace('src', '')),
    // target: 'es2016',
    format: 'cjs'
  })

  for (let i = 0; i < dirs.length; i++) {
    console.log('building', dirs[i], relativePath)
    buildDir(path.join(relativePath, dirs[i]));
  }
}

buildDir()