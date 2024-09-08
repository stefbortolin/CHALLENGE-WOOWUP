import { InformativeAlert } from "../entities/InformativeAlert";
import { Topic } from "../entities/Topic";
import { UrgentAlert } from "../entities/UrgentAlert";
import { User } from "../entities/User";
import { Alert } from "../interface/Alert";
import AlertType from "../interface/AlertType";
import { AlertMessage } from "../value-objects/AlertMessage";



export class AlertFactory {
    static createAlert(
      type: AlertType,
      message: string,
      user: User | null,
      topic: Topic | null,
      creationDate: Date,
      expirationDate: Date
    ): Alert {
      const alertMessage = AlertMessage.create(message);
      if (type === AlertType.URGENT) {
        return new UrgentAlert(alertMessage, topic , user, creationDate, expirationDate);
      } else if (type === AlertType.INFORMATIVE) {
        return new InformativeAlert(alertMessage, topic , user, creationDate, expirationDate);
      } else {
        throw new Error('Invalid alert input');
      }
    }
  }