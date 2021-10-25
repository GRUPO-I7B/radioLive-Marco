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
let original = new Audio('https://node-22.zeno.fm/sg11xrm1qa0uv?rj-ttl=5&rj-tok=AAABfF928RgAZfAMD0hOBomREw');
let yinetradio = new Audio('https://cp.usastreams.com/pr2g/APPlayerRadioHTML5.aspx?stream=http://streaming.servicioswebmx.com:8030//;&fondo=02&formato=mp3&color=14&titulo=2&autoStart=1&vol=5&tipo=13&nombre=Yin+Et+Radio&botonPlay=3&imagen=https://yinetradio.com/logo.png')
play.addEventListener('click', () => {
  original.play();
  
});
stop.addEventListener('click', () => {
  original.pause();
});
//rango del volumen
rango.oninput =(() => {
  let value = rango.value;
  volume_show.textContent = value;
  original.volume = value/parseFloat(100);
});

