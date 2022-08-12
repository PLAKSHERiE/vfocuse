const srcPath = 'src';
const destPath = 'build';

const config = {
  src: {
    root: srcPath,
    sass: `${srcPath}/scss`,
    js: `${srcPath}/js`,
    fonts: `${srcPath}/assets/fonts`,
    img: `${srcPath}/assets/img`,
    icons: `${srcPath}/assets/img/icons`,
    pug: `${srcPath}/pug`,
    css: `${srcPath}/css`,
    php: `${srcPath}/php`,
    files: `${srcPath}/files`,

    domain: 'http://test/',
  },

  dest: {
    root: destPath,
    html: destPath,
    css: `${destPath}/css`,
    js: `${destPath}/js`,
    fonts: `${destPath}/fonts`,
    img: `${destPath}/img`,
    php: `${destPath}/php`,
    files: `${destPath}/files`,

    domain: '',
  },

  setEnv() {
    this.isProd = process.argv.includes('--prod');
    this.isDev = !this.isProd;
  },
};

export default config;
