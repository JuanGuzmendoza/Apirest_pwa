import { Injectable } from '@nestjs/common';
import { DataSnapshot, get, push, ref, set } from 'firebase/database';
import { firebaseDataBase } from 'src/firebase.config';
import axios from 'axios';
import { NotificacionDto } from '../dto/notificacion-create.dto';
@Injectable()
export class TutorialService {

  async createData(data: NotificacionDto): Promise<void> {
    const dataRef = ref(firebaseDataBase, 'Data');


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
      "small_icon": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Sena_Colombia_logo.svg/2090px-Sena_Colombia_logo.svg.png",
      "chrome_web_icon": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Sena_Colombia_logo.svg/2090px-Sena_Colombia_logo.svg.png"
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