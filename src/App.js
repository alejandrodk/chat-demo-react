import React, { Component } from 'react';
import Chat from './components/Chat'
import faker from 'faker';

const styleButton = {
        background : '#9be812',
        width : 75,
        border : 'none',
        borderRadius : 5,
        padding : 3,
        margin : 6
    }
class App extends Component {
  state = {
      //1- creamos un array vacio donde guardaremos los mensajes
      list : []
  }
  /* 3- creamos el manejador addMessage, dentro de el, vamos a generar
  un nuevo mensaje y ademas, agregarlo al chat */
  addMessage = () => {
      // 4 - creamos el mensaje
      // la informacion del mensaje la traemos a traves de la libreria faker
      const message = {
          id : faker.random.uuid(),
          name : faker.name.findName(),
          avatar : faker.image.avatar(),
          message : faker.hacker.phrase()
      }
      // 5- agregamos el mensaje a la lista
      /* la funcion setState() puede recibir dos callbacks, al primero podemos
      pasarle como parametro el valor del estado actual, el segundo recibe el valor
      del estado ya actualizado.
      */
      this.setState( state => ({
          list : [
              // traemos el estado actual con spread, no hace falta this porque
              // recibimos el estado como parametro.
              ...state.list,
              // añadimos el mensaje a la lista
              message
              // una vez añadido, mostramos el resultado por consola con el segundo callback
          ]
      }),() => console.log(this.state.list))
  }
  render(){
      return(
          <div>
              {/* 7- agregamos el componente chat y le pasamos como prop
                  la lista de mensajes que tenemos en el estado
              */}
              <Chat
              list={this.state.list}
              />
              {/* 2- Creamos un boton que al hacer click envia un nuevo mensaje */}
            <button
			style={styleButton} 
			onClick={this.addMessage}
			>
            Nuevo mensaje
            </button>
          </div>
      )
  }
}


export default App;
