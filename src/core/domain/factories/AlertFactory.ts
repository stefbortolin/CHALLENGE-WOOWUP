import { InformativeAlert } from "../entities/InformativeAlert";
import { Topic } from "../entities/Topic";
import { UrgentAlert } from "../entities/UrgentAlert";
import { User } from "../entities/User";
import { Alert } from "../interface/Alert";
import AlertType from "../interface/AlertType";
import { AlertMessage } from "../value-objects/AlertMessage";


// Factory que se encarga de crear alertas, dependiendo del tipo de alerta que se quiera crear, se creará un tipo de alerta u otro. Otro factor importante es si dependiendo que envien user o topic, se creará una alerta para un usuario en concreto o para todos los suscriptores de un tema.
export class AlertFactory {
    static createAlert(
      id: string,
      type: AlertType,
      message: string,
      user: User | null,
      topic: Topic | null,
      creationDate: Date,
      expirationDate: Date
    ): Alert {
      const alertMessage = AlertMessage.create(message);
      if (type === AlertType.URGENT) {
        return new UrgentAlert(id, alertMessage, topic , user, creationDate, expirationDate);
      } else if (type === AlertType.INFORMATIVE) {
        return new InformativeAlert(id, alertMessage, topic , user, creationDate, expirationDate);
      } else {
        throw new Error('Invalid alert input');
      }
    }
  }