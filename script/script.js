const musicContainer = document.querySelector(".music-container");
const playBtn = document.querySelector(".music-container__action-btn_play");
const prevBtn = document.querySelector(".music-container__action-btn_prev");
const nextBtn = document.querySelector(".music-container__action-btn_next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".music-container__progress");
const progressContainer = document.querySelector(
  ".music-container__progress-container"
);
const nameSong = document.querySelector(".music-container__name-song");
const imgSong = document.querySelector(".music-container__imag");
const musicInfo = document.querySelector(".music-container__info");
const musicValue = document.querySelector(".music-container__volume");
const volumeInfo = document.querySelector(".music-container__fill-volume");
const timeDuration = document.querySelector(".music__time-duration");
const timeCurrent = document.querySelector(".music__time-current");
const imgSongPlay = "music-container__imag_play";
const musicInfoPlay = "music-container__info_play";
const songs = [
  "BASMAT",
  "soldat",
  "Sound",
  "2_Unlimited_-_No_limit",
  "Akula_-_Malo",
  "Edward_Maya_-_Stereo_Love",
  "O-Zone_-_Dragostea_Din_Tei",
  "Ruki_Vverkh_-_Kroshka_moya",
  "Ruki_Vverkh_-_CHuzhie_Guby",
  "Propaganda_-_Melom",
  "VIA_Gra_-_YA_ne_vernus",
  "Virus_-_Poproshu_tebya",
  "Virus_-_Schaste",
  "Virus_-_Ty_menya_ne_ishhi",
  "YUrijj_SHatunov_-_Detstvo",
  "Splin_-_Mojo_serdce",
  "Strelki_-_Na_vecherinke",
  "ZHenya_Belousov_-_Devochka_Moya_Sineglazaya",
  "ZHasmin_-_Perepishu_lyubov",
  "ZHanna_riske_-_A_na_more_belyjj_pesok",
  "Kombinaciya_-_Russian_Girl",
  "Kombinaciya_-_Bukhgalter",
  "E-Type_-_Set_The_World_On_Fire",
  "Dj_MIKO_-_Whats_Up",
  "Dr_Alban_-_Its_My_Life",
  "Demo_-_20_let",
  "Tekhnologiya_-_Strannye_Tancy_28609370",
  "Sash_-_Ecuador",
  "Ace_Of_Base_-_All_That_She_Wants",
  "Ace_Of_Base_-_Happy_Nation",
  "Activate_-_Let_The_Rhythm_Take_Control",
  "Akula_-_Kislotnyjj_Didzhejj",
  "Alena_Apina_-_JElektrichka",
  "Alisa_-_Vereteno",
  "Andrejj_Gubin_-_Zima-kholoda",
  "Army_of_lovers_-_Sexual_Revolution",
  "Crazy_Frog_-_Axel_f",
  "Blestyashhie_-_A_ya_vse_letala",
  "Snap_-_Ive_Got_the_Power",
  "Tatyana_Bulanova_-_YAsnyjj_mojj_svet",
  "Tatyana_Bulanova_I_Dj_Cvetkoff_-_Mojj_Son",
  "Shivaree_-_Goodnight_Moon",
  "Otpetye_Moshenniki_-_Lyubi_menya",
  "Otpetye_Moshenniki_-_A_u_reki",
  "Mirazh_-_Muzyka_nas_svyazala",
  "Igor_Nikolaev_i_Natasha_Koroljova_-_Taksi",
  "Gosti_iz_budushhego_-_Begi_ot_menya",
  "Gosti_iz_budushhego_-_Metko",
  "Ivanushki_International_-_Topolinyjj_pukh"
];
const img = [
  "serato_blue",
  "serato_dark",
  "serato_green",
  "serato_red",
  "serato_yellow",
  "serato_pink",
];

playBtn.addEventListener("click", handlePlayBtn);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

let songIndex = 0;
let imgIndex = 0;

loadSong(songs[songIndex]);
loadImg(img[imgIndex]);

function switchingVolume() {
  volumeInfo.innerHTML = musicValue.value;
  audio.volume = volumeInfo.innerHTML / 100;
}

function loadSong(song) {
  nameSong.innerText = song;
  audio.src = `music/${song}.mp3`;
}

function loadImg(img) {
  imgSong.src = `img/${img}.png`;
}

function playSong() {
  musicInfo.classList.add(musicInfoPlay);
  imgSong.classList.add(imgSongPlay);
  playBtn.classList.remove("music-container__action-btn_play");
  playBtn.classList.add("music-container__action-btn_stop");
  audio.play();
}

function pauseSong() {
  musicInfo.classList.remove(musicInfoPlay);
  imgSong.classList.remove(imgSongPlay);
  playBtn.classList.add("music-container__action-btn_play");
  playBtn.classList.remove("music-container__action-btn_stop");
  audio.pause();
}

function handlePlayBtn(evt) {
  evt.preventDefault();
  const isPlaying = musicInfo.classList.contains(musicInfoPlay);

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
}

function prevSong() {
  songIndex--;

  imgIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  if (imgIndex < 0) {
    imgIndex = img.length - 1;
  }

  loadSong(songs[songIndex]);
  loadImg(img[imgIndex]);

  playSong();
}

function nextSong() {
  songIndex++;

  imgIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  if (imgIndex > img.length - 1) {
    imgIndex = 0;
  }

  loadSong(songs[songIndex]);
  loadImg(img[imgIndex]);

  playSong();
}

audio.ontimeupdate = function () {
  if (audio.duration) {
    let durmin = Math.floor(audio.duration / 60);
    let dursec = Math.floor(audio.duration - durmin * 60);
    let curmin = Math.floor(audio.currentTime / 60);
    let cursec = Math.floor(audio.currentTime - curmin * 60);

    if (durmin < 10) durmin = "0" + durmin;
    if (dursec < 10) dursec = "0" + dursec;
    if (curmin < 10) curmin = "0" + curmin;
    if (cursec < 10) cursec = "0" + cursec;

    duration = durmin + ":" + dursec;
    currentTime = curmin + ":" + cursec;

    timeCurrent.innerHTML = `${currentTime}`;
    timeDuration.innerHTML = `${duration}`;
  }
};

function updateProgress(evt) {
  const { duration, currentTime } = evt.srcElement;
  const progressPersent = (currentTime / duration) * 100;
  progress.style.width = `${progressPersent}%`;
}

function setProgress(evt) {
  const width = this.clientWidth;
  const clickX = evt.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

musicValue.addEventListener("mousemove", switchingVolume);
musicValue.addEventListener("onchange", switchingVolume);

audio.addEventListener("timeupdate", updateProgress);

progressContainer.addEventListener("click", setProgress);

audio.addEventListener("ended", nextSong);
