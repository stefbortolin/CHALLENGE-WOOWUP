import { Alert } from "./Alert";
import { Subscriber } from "./Subscriber";


//Interfaz que contiene la definicion del metodo polimorfico del publisher en el patron observer utilizado para manejar el envio de notificaciones/alertas a los usuarios.
export interface Publisher {
    subscribe(suscriber: Subscriber): void;
    unsubscribe(suscriber: Subscriber): void;
    //Tenemos dos notificar porque una notifica a todos los usuarios suscritos a la alerta y la otra notifica a un usuario en particular.
    notify(alert: Alert): void;
}