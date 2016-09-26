// eslint-disable-next-line no-unused-vars
import PhotoSwipe from 'photoswipe';

// eslint-disable-next-line no-unused-vars
import PhotoSwipeUIDefault from 'photoswipe/dist/photoswipe-ui-default.js';
import Gallery from './Gallery.js';

require('./gallery.scss');
require('./photoswipe.scss');
require('./photoswipe-default-skin/default-skin.scss');

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    Gallery.createGallery(PhotoSwipe, PhotoSwipeUIDefault);
  }
};
