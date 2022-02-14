const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('.music-container__action-btn_play');
const prevBtn = document.querySelector('.music-container__action-btn_prev');
const nextBtn = document.querySelector('.music-container__action-btn_next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.music-container__progress');
const progressContainer = document.querySelector('.music-container__progress-container');
const nameSong = document.querySelector('.music-container__name-song');
const imgSong = document.querySelector('.music-container__imag');
const musicInfo = document.querySelector('.music-container__info');
const btnVolum = document.querySelector('.music-container__volume');
const imgSongPlay = 'music-container__imag_play';
const musicInfoPlay = 'music-container__info_play';
const songs = ['BASMAT', 'soldat', 'Sound', '2_Unlimited_-_No_limit', 'Akula_-_Malo', 'Edward_Maya_-_Stereo_Love', 'O-Zone_-_Dragostea_Din_Tei', 'Ruki_Vverkh_-_Kroshka_moya', 'Ruki_Vverkh_-_CHuzhie_Guby'];
const img = ['serato_blue', 'serato_dark', 'serato_green', 'serato_red', 'serato_yellow', 'serato_pink'];

playBtn.addEventListener('click', handlePlayBtn);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

let songIndex = 0;
let imgIndex = 0;

loadSong(songs[songIndex]);
loadImg(img[imgIndex]);

function loadSong(song) {
    nameSong.innerText = song;
    audio.src = `music/${song}.mp3`;
}

function loadImg(img){
    imgSong.src = `img/${img}.png`;
}

function playSong(){
    musicInfo.classList.add(musicInfoPlay);
    imgSong.classList.add(imgSongPlay);
    playBtn.classList.remove('music-container__action-btn_play');
    playBtn.classList.add('music-container__action-btn_stop');
    audio.play();
}

function pauseSong(){
    musicInfo.classList.remove(musicInfoPlay);
    imgSong.classList.remove(imgSongPlay);
    playBtn.classList.add('music-container__action-btn_play');
    playBtn.classList.remove('music-container__action-btn_stop');
    audio.pause();
}

function handlePlayBtn(evt){
    evt.preventDefault();
    const isPlaying = musicInfo.classList.contains(musicInfoPlay);

    if(isPlaying){
        pauseSong()
    } else {
        playSong()
    }
}

function prevSong(){
    songIndex--

    imgIndex--
    
    if(songIndex < 0){
        songIndex = songs.length - 1
    }

    if(imgIndex < 0){
        imgIndex = img.length - 1
    }

    loadSong(songs[songIndex]);
    loadImg(img[imgIndex]);

    playSong()
}

function nextSong(){
    songIndex++

    imgIndex++

    if (songIndex > songs.length - 1) {
        songIndex = 0
    }

    if(imgIndex > img.length - 1){
        imgIndex = 0
    }


    loadSong(songs[songIndex]);
    loadImg(img[imgIndex]);

    playSong()
}

function updateProgress(evt){
    const {duration, currentTime} = evt.srcElement
    const progressPersent = (currentTime / duration) * 100
    progress.style.width = `${progressPersent}%`
}

function setProgress(evt){
    const width = this.clientWidth
    const clickX = evt.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);