import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contacto } from 'src/app/models/Contacto/Contacto';
import { ContactoRequest } from 'src/app/models/Contacto/ContactoRequest';
import { TipoReporte } from 'src/app/models/Reporte/TipoReporte.enum';
import { WhatsappRequest } from 'src/app/models/Whatsapp/WhatsappRequest';
import { ContactoService } from 'src/app/services/contacto/contacto.service';
import { ReporteService } from 'src/app/services/reporte/reporte.service';
import { WhatsappService } from 'src/app/services/whatsapp/whatsapp.service';

@Component({
  selector: 'app-whatsapp.report.dialog',
  templateUrl: './whatsapp.report.dialog.component.html',
  styleUrls: ['./whatsapp.report.dialog.component.scss'],
})
export class WhatsappReportDialogComponent {
  contactoFormControl = new FormControl('');
  contactos: Contacto[] = [];
  tipoContacto = 4;

  displayedColumns: string[] = ['nombre', 'numero', 'enviar'];
  imagenBytes: string;

  constructor(
    private contactoService: ContactoService,
    private whatsAppService: WhatsappService,
    private reporteService: ReporteService,
    private dialogRef: MatDialogRef<WhatsappReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    var reportRequestCache = this.reporteService.getReportCache();

    this.buscarDestinatario();
  }

  async enviar(numero: string) {
    var reportRequestCache = this.reporteService.getReportCache();
    reportRequestCache.formatoArchivo = 'image';
    reportRequestCache.reporteRequest.formatoArchivo = 'image';

    if (reportRequestCache.tipoReporte == TipoReporte.movimiento) {
      const response = await this.reporteService
        .generarReporteMovimiento(reportRequestCache.reporteRequest)
        .toPromise();
      this.imagenBytes = response.Data;
    }

    if (reportRequestCache.tipoReporte == TipoReporte.movimientoDeposito) {
      const response = await this.reporteService
        .generarReporteMovimientoDeposito(reportRequestCache.reporteRequest)
        .toPromise();

      this.imagenBytes = response.Data;
    }

    this.whatsAppService
      .enviarWhatsApp(new WhatsappRequest({ imagenBytes: this.imagenBytes }))
      .subscribe((response) => {
        window.open(
          `https://web.whatsapp.com/send?phone=${numero}&text=Puede+visualizar+el+siguiente+documento++AQUI:+${response.Data}&source&data&app_absent`
        );

        this.dialogRef.close();
      });
  }

  buscarDestinatario() {
    this.contactoService
      .obtenerContacto(
        new ContactoRequest({
          tipo: this.tipoContacto,
          nombre: this.contactoFormControl.value,
        })
      )
      .subscribe((response) => {
        this.contactos = response.Data;
      });
  }
}
