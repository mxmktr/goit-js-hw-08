import Player from '@vimeo/player';
import throttle from '../../node_modules/lodash.throttle';

const iframe = document.getElementById('vimeo-player');
const player = new Player(iframe);

const VIDEO_CURRENT_TIME = 'videoplayer-current-time';

let currentVideoTime = getItemFromLocalStorage(VIDEO_CURRENT_TIME);

if (currentVideoTime !== null) {
  setPointOfStart(currentVideoTime);
}

player.on(
  'timeupdate',
  throttle(({ seconds }) => setVideoCurrentTime(seconds), 1000)
);

function setPointOfStart(baseInterval) {
  player
    .setCurrentTime(baseInterval)
    .then(function (seconds) {})
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          console.log(
            'The time was less than 0 or greater than the video’s duration'
          );
          break;
        default:
          console.log('We have unknown mistake!');
          break;
      }
    });
}

function getItemFromLocalStorage(key) {
  return localStorage.getItem(key);
}

function setVideoCurrentTime(seconds) {
  localStorage.setItem(VIDEO_CURRENT_TIME, seconds);
}
