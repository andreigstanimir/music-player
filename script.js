const img = document.querySelector('img');
const title = document.querySelector('.title');
const artist = document.querySelector('.artist');
const music = document.querySelector('audio');
const progressContainer = document.querySelector('.progress-container');
const progressBar = document.querySelector('.progress-bar');
const currentTimeEl = document.querySelector('.current-time');
const durationEl = document.querySelector('.duration');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const playBtn = document.querySelector('.play');

//  Music
const songs = [
  {
    name: 'music-1',
    displayName: 'Manybeat, Jimmix - Mi Fe (Original Mix)',
    artist: 'Andrei G. Stanimir',
  },
  {
    name: 'music-2',
    displayName: 'Dimitri Vegas & Like Mike x Ne-Yo x Danna Paola - Mexico',
    artist: 'Andrei G. Stanimir',
  },
  {
    name: 'music-3',
    displayName: 'Breathe Carolina & APEK - Anywhere But Home',
    artist: 'Andrei G. Stanimir',
  },
];

// Check if Playing
let isPlaying = false;

// Play
const playSong = function () {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
};

// Pause
const pauseSong = function () {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
};

// Play or Pause Event Listener
playBtn.addEventListener('click', () => {
  isPlaying ? pauseSong() : playSong();
});

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  img.src = `img/${song.name}.jpg`;
}

//  Current Song
let songIndex = 0;

// Prev Song
const prevSong = function () {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
};

// Next Song
const nextSong = function () {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
};

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
const updateProgressBar = function (event) {
  if (isPlaying) {
    const { currentTime, duration } = event.target;

    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }

    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    // Calculate display for current
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
};

// Set Progress Bar
const setProgressBar = function (event) {
  const width = this.clientWidth;
  console.log(width);
  const clickX = event.offsetX;
  console.log(clickX);
  const { duration } = music;

  console.log(clickX / width);
  console.log((clickX / width) * duration);
  music.currentTime = (clickX / width) * duration;
};

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
