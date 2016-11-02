import { assert } from 'chai';
import jsdom from 'jsdom';

import Gallery from '../Gallery.js';
import { thumbsMock } from './test_fixtures.js';

describe('Gallery', function() {
  const doc = jsdom.jsdom(thumbsMock);
  const galleryAnchor = doc.querySelector('.gallery');
  const thumbsSelector = 'figure.gallery-thumb > a';
  const opts = {
    thumbsSelector: thumbsSelector,
  };
  const gallery = new Gallery(galleryAnchor, {}, opts);
  before(function() {
    global.document = doc;
    global.window = doc.defaultView;
  });
  describe('parseThumbs', function() {
    const items = gallery.parseThumbs();
    it('should find 2 thumbnails', function() {
      assert.lengthOf(items, 2);
    });
    it('should provide src of images', function() {
      assert.equal(items[0].src, '/media/images/18.original.jpg');
      assert.equal(items[1].src, '/media/images/17.original.jpg');
    });
    it('should recognize width and height', function() {
      assert.equal(items[0].w, 960);
      assert.equal(items[0].h, 720);
      assert.equal(items[1].w, 704);
      assert.equal(items[1].h, 504);
    });
    it('should add figcaption when available', function() {
      assert.equal(items[0].title, 'Some figure caption');
    });
    it('should add msrc of thumbnail', function() {
      assert.equal(items[0].msrc, '/media/images/18.width-240.jpg');
      assert.equal(items[1].msrc, '/media/images/17.width-240.jpg');
    });
  });
  describe('getThumbIndex', function() {
    const thumb = galleryAnchor.querySelectorAll(thumbsSelector).item(0);
    it('should parse data-index of thumb', function() {
      assert.equal(0, gallery.getThumbIndex(thumb));
    });
  });
  describe('getPswpAnchor', function() {
    it('should find pswp element', function() {
      const pswpAnchor = gallery.getPswpAnchor();
      assert.isOk(pswpAnchor);
    });
  });
  describe('preparePhotoSwipeParams', function() {
    const thumbIndex = 1;
    const showAnimationDuration = 111;
    const photoSwipeParams = { showAnimationDuration };
    gallery.opts.photoSwipeParams = photoSwipeParams;
    const result = gallery.preparePhotoSwipeParams(thumbIndex);
    it('should inject index into params', function() {
      assert.equal(result.index, thumbIndex);
    });
    it('should contain the attributes of defaults', function() {
      assert.equal(
        result.showAnimationDuration, showAnimationDuration
      );
    });
    it('should provide thumbs coordinates', function() {
      assert.isOk(result.getThumbBoundsFn(thumbIndex));
    });
  });
});
