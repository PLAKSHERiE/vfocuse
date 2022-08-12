// import '../../node_modules/focus-visible/dist/focus-visible.js';
import lazyImages from './modules/lazyImages.js';
import documentReady from './helpers/documentReady.js';
// import Sliders from './modules/sliders.js';
import Sliders from './modules/sliders.js';
import Popups from './modules/popups.js';

documentReady(() => {
  lazyImages();
  Sliders();
  Popups();
});
