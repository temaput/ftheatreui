const DEFAULTS = {
  pswpClassName: '.pswp',
  galleryClassName: '.gallery-anchor',
  thumbsSelector: '.gallery-thumb-selector > a',
  masonryParams: {
    gutter: 20,
    itemSelector: '.gallery-thumb-selector',
    columnWidth: '.gallery-col-sizer',
  },
  photoSwipeParams: {
  },
};


function getThumbBoundsFnClosure(galleryAnchor, thumbsSelector) {
  return (index) => {
    // find thumbnail element
    const thumbnails = galleryAnchor.querySelectorAll(thumbsSelector);
    const currentThumbnail = thumbnails.item(index);

    // get window scroll Y
    const pageYScroll = (
      window.pageYOffset || document.documentElement.scrollTop
    );
    // optionally get horizontal scroll

    // get position of element relative to viewport
    const rect = currentThumbnail.getBoundingClientRect();

    // w = width
    return { x: rect.left, y: (rect.top + pageYScroll), w: rect.width };
  };
}


class Gallery {
  constructor(galleryAnchor, tools, opts) {
    this.galleryAnchor = galleryAnchor;
    this.tools = tools;
    this.opts = Object.assign({}, DEFAULTS, opts);
  }

  init() {
    this.initGalleryEvents();
    this.buildThumbnailsGrid();
  }

  onThumbClick(event) {
    event.preventDefault();
    const thumb = event.currentTarget;
    const thumbIndex = this.getThumbIndex(thumb);
    this.openPhotoSwipe(
      this.getPswpAnchor(),
      thumbIndex,
      this.parseThumbs(),
      this.preparePhotoSwipeParams(thumbIndex)
    );
  }

  buildThumbnailsGrid() {
    let Masonry = this.tools.Masonry;
    if (Masonry !== null) {
      Masonry = new Masonry(
        this.galleryAnchor, this.opts.masonryParams
      );
    }
    return Masonry;
  }

  openPhotoSwipe(pswpAnchor, thumbIndex, items, opts) {
    const pswp = new this.tools.PhotoSwipe(
      pswpAnchor, this.tools.PhotoSwipeUIDefault, items, opts
    );
    pswp.init();
  }

  initGalleryEvents() {
    const figures = Array.prototype.slice.call(
      this.galleryAnchor.querySelectorAll(this.opts.thumbsSelector)
    );
    figures.forEach(
      fig => fig.addEventListener('click', e => this.onThumbClick(e))
    );
  }

  getPswpAnchor() {
    return document.querySelector(this.opts.pswpClassName);
  }

  parseThumbs() {
    const figures = Array.prototype.slice.call(
      this.galleryAnchor.querySelectorAll(this.opts.thumbsSelector)
    );
    const items = figures.map(figLink => {
      const fig = figLink.parentNode;
      const item = {
        src: figLink.getAttribute('href'),
        w: parseInt(figLink.getAttribute('data-width'), 10),
        h: parseInt(figLink.getAttribute('data-height'), 10),
      };
      const figCaption = fig.querySelector('figcaption');
      if (figCaption !== null) {
        item.title = figCaption.innerHTML;
      }
      const figThumbImg = figLink.querySelector('img');
      if (figThumbImg !== null) {
        item.msrc = figThumbImg.getAttribute('src');
      }
      return item;
    });
    return items;
  }

  getThumbIndex(figLink) {
    return parseInt(figLink.getAttribute('data-index'), 10);
  }

  preparePhotoSwipeParams(thumbIndex) {
    const params = Object.assign({}, this.opts.photoSwipeParams);
    params.index = thumbIndex;
    params.getThumbBoundsFn = getThumbBoundsFnClosure(
      this.galleryAnchor, this.opts.thumbsSelector
    );
    return params;
  }

  static createGallery(
    PhotoSwipe,
    PhotoSwipeUIDefault,
    opts = DEFAULTS,
    Masonry = null
  ) {
    const newOpts = Object.assign(DEFAULTS, opts);
    const galleryAnchor = document.querySelector(newOpts.galleryClassName);
    if (galleryAnchor !== null) {
      const tools = { Masonry, PhotoSwipe, PhotoSwipeUIDefault };
      const gallery = new Gallery(galleryAnchor, tools, newOpts);
      gallery.init();
    }
    return null;
  }
}
export default Gallery;
