export const thumbsMock = `
  <html>
    <body>
<div class="gallery" itemScope itemType="http://schema.org/ImageGallery">
    <div class="gallery-col-sizer"></div>

      <figure itemProp="associatedMedia" itemScope itemType="http://schema.org/ImageObject" class="gallery-thumb">

        <a  href=/media/images/18.original.jpg itemProp="contentUrl" 
          data-width=960 
          data-height=720
          data-index=0
          >
          <img alt="18.jpeg" height="180" src="/media/images/18.width-240.jpg" width="240">
        </a>
    <figcaption>Some figure caption</figcaption>

      </figure>

      <figure itemProp="associatedMedia" itemScope itemType="http://schema.org/ImageObject" class="gallery-thumb">

        <a  href=/media/images/17.original.jpg itemProp="contentUrl" 
          data-width=704 
          data-height=504
          data-index=1
          >
          <img alt="17.jpeg" height="171" src="/media/images/17.width-240.jpg" width="240">
        </a>

      </figure>
 <!-- PhotoSwipe element -->
    <!-- Root element of PhotoSwipe. Must have class pswp. -->
    <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">

      <!-- Background of PhotoSwipe. 
         It's a separate element as animating opacity is faster than rgba(). -->
      <div class="pswp__bg"></div>

      <!-- Slides wrapper with overflow:hidden. -->
      <div class="pswp__scroll-wrap">

        <!-- Container that holds slides. 
            PhotoSwipe keeps only 3 of them in the DOM to save memory.
            Don't modify these 3 pswp__item elements, data is added later on. -->
        <div class="pswp__container">
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
        </div>

        <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
        <div class="pswp__ui pswp__ui--hidden">

          <div class="pswp__top-bar">

            <!--  Controls are self-explanatory. Order can be changed. -->

            <div class="pswp__counter"></div>

            <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>

            <button class="pswp__button pswp__button--share" title="Share"></button>

            <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>

            <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

            <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
            <!-- element will get class pswp__preloader - active when preloader is running -->
            <div class="pswp__preloader">
              <div class="pswp__preloader__icn">
                <div class="pswp__preloader__cut">
                  <div class="pswp__preloader__donut"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
            <div class="pswp__share-tooltip"></div> 
          </div>

          <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
          </button>

          <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
          </button>

          <div class="pswp__caption">
            <div class="pswp__caption__center"></div>
          </div>

        </div>

      </div>

    </div>
    </body>
  </html>
  `;
