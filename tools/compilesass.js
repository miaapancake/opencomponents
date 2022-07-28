const sass = require('sass');
const {readdir, writeFile} = require('fs/promises');
const { resolve } = require('path');
let postcss = require('postcss')
let autoprefixer = require('autoprefixer');

async function getFiles(dir) {
    const dirents = await readdir(dir, { withFileTypes: true });
    const files = await Promise.all(dirents.map((dirent) => {
      const res = resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    }));
    return Array.prototype.concat(...files);
}

(async () => {

    let output = [];

    for(let file of await getFiles('./src')) {
        if(file.endsWith('.scss')) {
            const css = sass.compile(file, {style: 'compressed'}).css;
            output.push(css);
        }
    }

    const result = await postcss(autoprefixer()).process(output.join(''));
    
    await writeFile('./lib/style.css',result.css);

})();