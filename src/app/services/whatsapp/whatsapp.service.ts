import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { ResponseBase } from '@models/ResponseBase';
import { WhatsappRequest } from '@models/Whatsapp/WhatsappRequest';

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
