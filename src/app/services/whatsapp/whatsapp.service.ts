import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseBase } from 'src/app/models/ResponseBase';
import { WhatsappRequest } from 'src/app/models/Whatsapp/WhatsappRequest';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WhatsappService {
  constructor(private http: HttpClient) {}

  enviarWhatsApp(request: WhatsappRequest) {
    return this.http.post<ResponseBase<string>>(
      `${environment.apiUrl}/v1/whatsapp/guardar`,
      request
    );
  }
}
