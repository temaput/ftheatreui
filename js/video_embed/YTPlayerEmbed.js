/* global YT */

const DEFAULTS = {
  playerDataId: 'ytplayer-data',
  playerDivId: 'ytplayer',
};

function onPlayerReadyClosure(data) {
  return (event) => {
    const p = event.target;
    if (data.autoplay === 1) {
      p.mute();
      p.playVideo();
    }
  };
}


// eslint-disable-next-line no-unused-vars
export default function onYouTubeIframeAPIReady() {
  const { videoId, playerVars } = JSON.parse(
    document.getElementById(DEFAULTS.playerDataId).textContent
  );
  playerVars.modestbranding = 1;

  // eslint-disable-next-line no-unused-vars
  const player = new YT.Player(DEFAULTS.playerDivId, {
    videoId,
    playerVars,
    events: {
      onReady: onPlayerReadyClosure(playerVars),
    },
  });
}

