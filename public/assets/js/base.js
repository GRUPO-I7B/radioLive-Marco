//constantes para el chat y su seleccion
const botones = document.querySelector('#botones');
const cliente = document.querySelector('#cliente');
const formulario = document.querySelector('#formulario');
const textoChat = document.querySelector('#textoChat');
//const datosChat = document.querySelector('#chatMessage')
const datosChatLeft = document.querySelector('#chatMessageLeft');
const panelChat = document.querySelector('#panelChat');
const seccionListaUsuarios = document.querySelector("#seccionListaUsuarios");
const usuarioSeleccionado = document.querySelector("#usuarioSeleccionado");
const userText = document.querySelector("#userText");
const panelEscritura = document.querySelector(".panel-escritura");

//Configuracion de firebase
firebase.auth().onAuthStateChanged( user => {
  if(user) {
    seccionListaUsuarios.innerHTML = '';
    usuarioSeleccionado.innerHTML = '';
    console.log(user.photoURL)
    contenidoChat(user);
    botones.innerHTML = `<button id="btnCerrarSesion" class="btn btn-danger">Cerrar sesión</button> 
        <h3>
            <i class="fas fa-comments"></i>
            Sistema de mensajeria
        </h3>`;
    totalUsuarios(user);
    usuarioActivo(user);
    cerrarSesion();
    panelEscritura.style.display='block';
  } else {
    console.log('no existe user')
    botones.innerHTML = `<button id="btnAcceder" class="btn btn-success">Acceder</button>`;
    iniciarSesion();
    formulario.addEventListener('submit', (e) => {
      e.preventDefault();
    })
  }
})
const cerrarSesion = () => {
  const btnCerrarSesion = document.querySelector('#btnCerrarSesion');
  btnCerrarSesion.addEventListener('click', () => {
    firebase.auth().signOut();
  })
}
const iniciarSesion = () => {
  const btnAcceder = document.querySelector('#btnAcceder');
  btnAcceder.addEventListener('click', async() => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider()
      await firebase.auth().signInWithPopup(provider)
      document.location.reload();
    } catch (e) {
      console.log(e);
    }
  })
}
const usuarioActivo = (user) => {
    usuarioSeleccionado.innerHTML= `
            <div class="avatar">
                <img src="${user.photoURL}" alt="img">
            </div>
            <div class="cuerpo">
                <span>${user.displayName}</span>
                <span id="userText" class="userText">Activo - Escribiendo....</span>
            </div>
            <div class="opciones">
                <ul>
                    <li>
                        <button type="button"><i class="fas fa-video"></i></button>
                    </li>
                    <li>
                        <button type="button"><i class="fas fa-phone-alt"></i></button>
                    </li>
                </ul>
            </div> `;
    let userT = document.getElementById('userText');
    textoChat.addEventListener('keyup', () => {
      userT.style.color="green";
      console.log("Escribiendo--")
    })
    
}
const totalUsuarios = (user) => {
    seccionListaUsuarios.innerHTML+= `
        <div class="usuario">
          <div class="avatar">
             <img src="${user.photoURL}" alt="img">
             <span class="estado-usuario enlinea"></span>
          </div>
          <div class="cuerpo">
             <span> ${user.displayName}</span>
             <span>detalles de mensaje</span>
          </div>
             <span class="notificacion">
                    3
             </span>
        </div>
       `;

    //userold = user.photoURL;
    //nameold = user.displayName;
}
const contenidoChat = (user) => {
  formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(textoChat.value);
    textoChat.value;
    if(!textoChat.value.trim()){
      console.log('input vacio')
      return
    } 
    //obteniendo la fecha y la hora
    let today = new Date();
    let days = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
    let numberDaysOnWeek = today.getDay();
    
    let hour = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();

    let day = hour >= 12 ? 'PM' : 'AM';

    minutes = ('0' + minutes).slice(-2);
    seconds = ('0' + seconds).slice(-2);


    firebase.firestore().collection('chat').add({
      texto: textoChat.value,
      uid: user.uid,
      displayName: user.displayName,
      dateOrder: Date.now(),
      day: days[numberDaysOnWeek],
      date: `${hour % 12} : ${minutes} : ${seconds} ${day}`,
      photoURL: user.photoURL
    })
      .then(res => {console.log(res + 'mensaje guardado')})
      .catch(error => console.log(error))
      textoChat.value = '';
  }) 

    firebase.firestore().collection('chat').orderBy('dateOrder').onSnapshot(query => {
      datosChatLeft.innerHTML = '';
      query.forEach(doc => {
        if(user.uid === doc.data().uid) { 
           datosChatLeft.innerHTML+= `
              <div class="chatContainer">
                <div class="cuerpo">
                    <div class="texto">
                       ${doc.data().texto} 
                        <span class="tiempo">
                            <i class="far fa-clock"></i>
                            ${doc.data().date}
                        </span>
                    </div>
                    <ul class="opciones-msj">
                        <li>
                            <button type="button">
                                <i class="fas fa-times"></i>
                            </button>
                        </li>
                        <li>
                            <button type="button">
                                <i class="fas fa-share-square"></i>
                            </button>
                        </li>
                    </ul>
                </div>
                <div class="avatar">
                    <img src="${doc.data().photoURL}" alt="img">
                </div> 
              </div>`;
        } else { 
           datosChatLeft.innerHTML+= `
              <div class="chatContainer chatSecondary">
                <div class="cuerpo">
                    <div class="texto">
                       ${doc.data().texto} 
                        <span class="tiempo">
                            <i class="far fa-clock"></i>
                            ${doc.data().date}
                        </span>
                    </div>
                    <ul class="opciones-msj">
                        <li>
                            <button type="button">
                                <i class="fas fa-times"></i>
                            </button>
                        </li>
                        <li>
                            <button type="button">
                                <i class="fas fa-share-square"></i>
                            </button>
                        </li>
                    </ul>
                </div>
                <div class="avatar">
                    <img src="${doc.data().photoURL}" alt="img">
                </div> 
              </div>`;
        }
        panelChat.scrollTop = panelChat.scrollHeight;
      })
    })
}
