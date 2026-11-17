const fs = require('node:fs');
const fsp = require('node:fs/promises');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const toolsDir = path.join(root, '.tools');
fs.mkdirSync(toolsDir, {recursive: true});
// Keep this export's temporary files isolated so they can be cleaned reliably.
const tempDir = fs.mkdtempSync(path.join(toolsDir, 'render-temp-'));
process.env.TMP = tempDir;
process.env.TEMP = tempDir;
process.env.TMPDIR = tempDir;
const {bundle} = require('@remotion/bundler');
const {selectComposition, renderMedia} = require('@remotion/renderer');
const check = process.argv.includes('--check');
const bundleDir = path.join(tempDir, 'bundle');

async function linkAssets(source, destination) {
  await fsp.mkdir(destination, {recursive: true});
  for (const item of await fsp.readdir(source, {withFileTypes: true})) {
    const src = path.join(source, item.name);
    const dest = path.join(destination, item.name);
    if (item.isDirectory()) await linkAssets(src, dest);
    else if (item.isFile()) await fsp.link(src, dest);
  }
}

async function main() {
  const disk = await fsp.statfs(root);
  const free = disk.bavail * disk.bsize;
  if (free < 1.5 * 1024 ** 3) {
    throw new Error('Na export treba aspon 1,5 GB volneho miesta. Aktualne: ' + (free / 1024 ** 3).toFixed(2) + ' GB.');
  }
  console.log('Pripravujem export bez kopirovania zdrojovych videi...');
  const emptyPublic = path.join(tempDir, 'empty-public');
  await fsp.mkdir(emptyPublic, {recursive: true});
  const serveUrl = await bundle({
    entryPoint: path.join(root, 'src/index.ts'),
    outDir: bundleDir,
    publicDir: emptyPublic,
    enableCaching: false,
    webpackOverride: config => ({...config, cache: false}),
  });
  await linkAssets(path.join(root, 'public'), path.join(bundleDir, 'public'));
  const chrome = path.join(process.env.ProgramFiles || 'C:/Program Files', 'Google/Chrome/Application/chrome.exe');
  const browserExecutable = fs.existsSync(chrome) ? chrome : undefined;
  const composition = await selectComposition({serveUrl, id: 'Main', browserExecutable});
  const outputLocation = path.join(root, check ? '.tools/render-check.mp4' : 'out/Main.mp4');
  await fsp.mkdir(path.dirname(outputLocation), {recursive: true});
  let lastReport = 0;
  await renderMedia({
    serveUrl, composition, browserExecutable, outputLocation,
    codec: 'h264', pixelFormat: 'yuv420p', crf: 20,
    imageFormat: 'jpeg', jpegQuality: 75,
    concurrency: 2, offthreadVideoThreads: 2,
    overwrite: true,
    ...(check ? {frameRange: [1268, 1276]} : {}),
    onProgress: p => {
      if (Date.now() - lastReport < 10000 && p.progress < 1) return;
      lastReport = Date.now();
      console.log(Math.round(p.progress * 100) + '% | snimky ' + p.renderedFrames + ', enkodovane ' + p.encodedFrames);
    },
  });
  console.log('HOTOVO: ' + outputLocation);
}

main().catch(error => {
  console.error(error.message || error);
  process.exitCode = 1;
}).finally(async () => {
  // Only delete the uniquely created directory owned by this invocation.
  if (path.dirname(tempDir) === toolsDir && path.basename(tempDir).startsWith('render-temp-')) {
    await fsp.rm(tempDir, {recursive: true, force: true}).catch(error => {
      console.error('Docasne subory sa nepodarilo uplne vycistit: ' + error.message);
    });
  }
});
