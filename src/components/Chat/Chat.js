import React, {Component} from 'react';
import styles from './Chat.module.css';

class Chat extends Component {
    /* 9- creamos una ref que haga referencia al contenedor del chat
        para asi poder tener acceso al evento del dom y saber la posicion
        del scroll
    */
   box = React.createRef()

    getSnapshotBeforeUpdate(){
        /* 
        10 - accedemos al elemento referenciado y usamos la propiedad current
        para acceder al elemento en el DOM, luego ya podemos setear la posicion
        de la barra con la propiedad scrollTop;
        */
        const box = this.box.current;
        /* 
        11- indicamos que si la suma de la posicion del scroll y el total del height
        de la ventana de chat (offsetHeight) es mayor o igual que el alto total de todos 
        los mensajes juntos (scrollHeight), quiere decir que el usuario esta situado
        al final del chat.
        */
        if(box.scrollTop + box.offsetHeight >= box.scrollHeight){
           // si el usuario esta al final del chat, el snapshot va a ser true
           return true
        }
        // de lo contrario va a tener valor false
        return false
        /*
        Este calculo debe ser realizado en el snapshot ya que si lo hacemos en el
        componentDidUpdate, al momento de realizarlo ya el componente estaria renderizado
        por lo que cuando evaluamos la posicion del scroll, ya el mensaje fue agregado al DOM
        asi que nunca el usuario va a estar al final del scroll
        */
    }
    componentDidUpdate(prevProps, prevState, snapshot){

       const box = this.box.current
       /* 
       12 - Cada vez que el componente se actualice, recibimos como 
       3er parametro el snapshot, el mismo nos indica (si es true o false) si el usuario
       se encuentra el final del scroll o esta viendo un mensaje arriba,
       si se encuentra al final del scroll, setea el scroll y lo mantiene en el final del 
       mismo aunque lleguen nuevos mensajes.
       */
        if(snapshot){
           box.scrollTop = box.scrollHeight;
        }
    }

    render(){
        return(
            /* 8- iteramos la lista de mensajes que recibimos como prop
                e imprimimos cada uno de los mensajes
            */
            <div
            // 10- agregamos la ref al contenedor del chat
            ref={this.box}
            className={styles.container}
            >
                { this.props.list.map(item => (
                    <div 
                    key={item.id} 
                    className={styles.bubble}
                    >
                        <p 
                        className={styles.message}
                        >
                        {item.message}</p>
                        <div 
                        className={styles.name}
                        >
                        {item.name}
                        </div>
                        <img 
                            className={styles.avatar}
                            src={item.avatar} 
                            alt='Avatar'
                        />
                    </div>
                ))}
            </div>
        )
    }
}

export default Chat;