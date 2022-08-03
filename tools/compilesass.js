const sass = require('sass');
const {readdir, writeFile, stat} = require('fs/promises');
const { resolve } = require('path');
let postcss = require('postcss')
let autoprefixer = require('autoprefixer');
let {cyanBright, bold, green} = require('chalk');


let [bin, scriptPath, srcPath, outputPath] = process.argv;


if(!outputPath) throw "Please specify an output path";

async function getFiles(dir) {
    const dirents = await readdir(dir, { withFileTypes: true });
    const files = await Promise.all(dirents.map((dirent) => {
      const res = resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    }));
    return Array.prototype.concat(...files);
}

(async () => {

    console.log(cyanBright(`CSS`) + bold(' Compiling directory: ') + srcPath);

    let output = [];

    for(let file of await getFiles(srcPath)) {
        if(file.endsWith('.scss')) {
            console.log(cyanBright(`CSS`) + bold(' Compiling file: ') + file);
            const css = sass.compile(file, {style: 'compressed'}).css;
            output.push(css);
        }
    }

    const result = await postcss(autoprefixer()).process(output.join(''), {from: undefined});

    
    await writeFile(outputPath, result.css);
    const {size} = await stat(outputPath);

    console.log(cyanBright(`CSS `) + bold(outputPath) + green(` ${(size / (1024)).toFixed(2)} KiB`));

})();