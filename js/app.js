import {API} from './api.js';
import * as UI from './interfaz.js';

console.log(UI);

UI.formularioBuscar.addEventListener('submit',(e) => {
    e.preventDefault();

    //Variables del Formulario
    const artista = document.querySelector('#artista').value,
          cancion = document.querySelector('#cancion').value;

          console.log('Artista : ' + artista + ', Canción : ' + cancion);

          if(artista === '' || cancion === ''){
              UI.divMensajes.innerHTML = 'Error, Los campos son obligatorios';
              UI.divMensajes.classList.add('error');
              setTimeout(() =>{
                UI.divMensajes.innerHTML = '';
                UI.divMensajes.classList.remove('error');
              },3000)
          }else{
              //Realizar Consulta
                const api = new API(artista,cancion);
                api.consultarAPI()
                .then(data =>{
                    console.log(data);
                    if(data.respuesta.lyrics){
                        console.log('Si Existe');
                        const letra = data.respuesta.lyrics;
                        //UI.divResultado.innerHTML = letra;
                        UI.divResultado.textContent = letra;
                    }else{
                        console.log('No Existe');
                        UI.divMensajes.innerHTML = 'Error, lyric not found';
                        UI.divMensajes.classList.add('error');
                        setTimeout(() =>{
                          UI.divMensajes.innerHTML = '';
                          UI.divMensajes.classList.remove('error');
                          UI.formularioBuscar.reset();
                            UI.divResultado.innerHTML = '';
                        },3000)
                    }
                })
          }
})