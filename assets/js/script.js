let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let stop = document.querySelector('#stop');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume = document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track-image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');

let timer;
let autoplay = 0;
let index_no = 0;
let playing_song = false;


//creando el elemento audio
let radio = new Audio('https://stream.zeno.fm/sg11xrm1qa0uv');
//funcion para reproducir la radio stream
play.addEventListener('click', function() {
  radio.play();
});
stop.addEventListener('click', () => {
  radio.pause();
})
