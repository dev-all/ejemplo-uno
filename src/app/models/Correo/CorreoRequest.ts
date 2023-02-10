export class CorreoRequest {
  destinatario: string;
  cco: string;
  asunto: string;
  cuerpo: string;
  fileBytes: string;
  fileName: string;
  idCasilla: string;

  constructor(init?: Partial<CorreoRequest>) {
    Object.assign(this, init);
  }
}
