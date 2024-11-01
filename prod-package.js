import fs from 'fs';
import path from 'path';
import p from './package.json' with { type: 'json' };

const {
  peerDependencies,
  devDependencies,
  dependencies,
  version,
  description,
  license,
  author,
  keywords,
  repository,
  private: prv,
} = p;

const startingDirectory = './dist/mjs'; // Change this to your desired starting directory

function readDirectoryRecursively(directoryPath, p) {
  let result = {};

  const files = fs.readdirSync(path.join(startingDirectory, directoryPath));

  files.forEach((file) => {
    const filePath = path.join(startingDirectory, directoryPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      result = {
        ...result,
        ...readDirectoryRecursively(
          path.join(directoryPath, file),
          `${p}/${file}`,
        ),
      };
    } else if (
      stats.isFile() &&
      stats.size > 0 &&
      path.extname(file) === '.js'
    ) {
      const key = `${path.join(directoryPath, file.replace('.js', ''))}`;
      result[`./${key}`] = {
        import: `./mjs/${key}.js`,
        require: `./cjs/${key}.js`,
      };
    }
  });

  return result;
}

const getProdPackage = () => {
  const jsonResult = readDirectoryRecursively('', '.');

  const p = {
    name: '@kloudlite/design-system',
    private: prv,
    version,
    description,
    license,
    author,
    keywords,
    main: './cjs/index.js',
    module: './mjs/index.js',
    exports: {
      './index.css': {
        import: './mjs/css/index.css',
        require: './cjs/css/index.css',
      },
      ...jsonResult,
    },
    files: ['./'],
    types: '.',
    dependencies,
    devDependencies,
    peerDependencies,
    repository,
  };

  return JSON.stringify(p, null, 2);
};

const outPath = './dist';
const setup = () => {
  const packageJson = getProdPackage();

  if (!fs.existsSync(outPath)) {
    fs.mkdirSync(outPath);
  }

  try {
    fs.writeFileSync(`${outPath}/package.json`, packageJson);
  } catch (e) {
    console.log('e', e);
  }

  console.log('Done!');
};

setup();

fs.copyFile('README.md', 'dist/README.md', (err) => {
  if (err) {
    console.error('Error copying file readme:', err);
  } else {
    console.log('File copied successfully readme!');
  }
});
