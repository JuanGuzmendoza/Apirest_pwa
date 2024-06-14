import { Injectable } from '@nestjs/common';
import { DataSnapshot, get, push, ref, set } from 'firebase/database';
import { firebaseDataBase } from 'src/firebase.config';
import axios from 'axios';
import { NotificacionDto } from '../dto/notificacion-create.dto';
import { timeStamp } from 'console';
@Injectable()
export class TutorialService {

  async createData(data: NotificacionDto): Promise<void> {
    const dataRef = ref(firebaseDataBase, 'Data');

    const ahora = new Date();
    const dia = ahora.getDate();
    const hora = ahora.getHours();
    const mes = ahora.getMonth() + 1;
    let minutos:any=ahora.getMinutes();
    if (minutos < 10) {
      minutos ="0"+minutos;
    }
    // Enviar solicitud HTTP POST a OneSignal
    const notificationData = {
      "app_id": "7bb3c888-1958-46dc-b92b-1214692ed5b5",
      "included_segments": ["All"],
      "headings": {"en": data.titulo},
      "contents": {"en":  data.descripcion},
      "big_picture": data.urlimagen,
      "chrome_web_image":data.urlimagen,
      "ios_attachments": {
        "id": data.urlimagen
      },
      "small_icon": "https://static.vecteezy.com/system/resources/previews/004/879/664/non_2x/simple-icon-of-a-paper-airplane-for-delivery-free-vector.jpg",
      "chrome_web_icon": "https://static.vecteezy.com/system/resources/previews/004/879/664/non_2x/simple-icon-of-a-paper-airplane-for-delivery-free-vector.jpg",
      "time":{
       "hora": hora,
       "dia":dia,
       "mes": mes,
       "minutos":minutos,
      }
    };

    const headers = {
      'Authorization': 'Basic NDNkMmViNDQtOTk5NC00MWNhLWExM2YtYjA4ZDgwMDc4OWMw',
      'Content-Type': 'application/json'
    };

    try {
      const response = await axios.post('https://onesignal.com/api/v1/notifications', notificationData, { headers });
      console.log('Notificación enviada exitosamente');
      const newElementRef = push(dataRef, { dataRef: notificationData });
      await set(newElementRef, notificationData);
    } catch (error) {
      console.error('Error al enviar notificación:', error);
    }
  }

  async getData(): Promise<any> {
    const dataRef = ref(firebaseDataBase, 'Data');
    const snapshot: DataSnapshot = await get(dataRef);
    console.log('Data recibida exitosamente');
    return snapshot.val();
  }
}