let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
let shuffle_btn = document.querySelector(".shuffle-track");
let repeat_btn = document.querySelector(".repeat-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;
let updateTimer;

// Create new audio element
let curr_track = new Audio();

// Define the tracks that have to be played
let track_list = [
  {
    name: "Chuttamalle",
    artist: "Shilpa Rao",
    image: "Img/chu.jpg",
    path: "mp3/Chuttamalle.mp3"
  },
  {
    name: "Ayudha Pooja",
    artist: "Anirudh Ravichander",
    image: "Img/ayujpg.jpg",
    path: "mp3/Ayudha Pooja.mp3"
  },
  {
    name: "Daavudi",
    artist: "Nakash Aziz",
    image: "Img/ntr.jpg",
    path: "mp3/Daavudi.mp3"
  },
];

// Load the first track in the tracklist
loadTrack(track_index);

function loadTrack(index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[index].image + ")";
  track_name.textContent = track_list[index].name;
  track_artist.textContent = track_list[index].artist;
  now_playing.textContent = "PLAYING " + (index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", () => {
    if (isRepeat) {
      loadTrack(index);
      playTrack();
    } else {
      nextTrack();
    }
  });
  
  random_bg_color(); // Change background color on new track
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
  if (isShuffle) {
    track_index = Math.floor(Math.random() * track_list.length);
  } else {
    track_index = (track_index + 1) % track_list.length;
  }
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  track_index = (track_index - 1 + track_list.length) % track_list.length;
  loadTrack(track_index);
  playTrack();
}

function shuffleTrack() {
  isShuffle = !isShuffle;
  shuffle_btn.classList.toggle("active");
}

function repeatTrack() {
  isRepeat = !isRepeat;
  repeat_btn.classList.toggle("active");
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

// Function to change the background color randomly
function random_bg_color() {
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";
  document.body.style.background = bgColor;
}
