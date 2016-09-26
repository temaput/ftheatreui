import YTPlayerEmbed from './YTPlayerEmbed.js';

require('./video_embed.scss');

document.onreadystatechange = () => {
  if (document.readyState === 'interactive') {
    if (document.getElementById('ytplayer')) {
      window.onYouTubeIframeAPIReady = YTPlayerEmbed;
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/player_api';
      document.head.appendChild(tag);
    }
  }
};

