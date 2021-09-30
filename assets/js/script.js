let play = document.querySelector('#play');
let stop = document.querySelector('#stop');
let title = document.querySelector('#title');
let recent_volume = document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');
let rango = document.querySelector('#rango');

let timer;
let autoplay = 0;
let index_no = 0;
let playing_song = false;


//creando el elemento audio
let radio = new Audio('https://stream.zeno.fm/sg11xrm1qa0uv');

play.addEventListener('click', () => {
  radio.play();
  
});
stop.addEventListener('click', () => {
  radio.pause();
});
//rango del volumen
rango.oninput =(() => {
  let value = rango.value;
  volume_show.textContent = value;
  radio.volume = value/parseFloat(100);
});

