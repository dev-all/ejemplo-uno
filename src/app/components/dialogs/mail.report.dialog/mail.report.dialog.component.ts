import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatDialog,
  MatDialogConfig,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CorreoRequest } from '@models/Correo/CorreoRequest';
import { CorreoService } from '@services/correo/correo.service';
import { ReporteService } from '@services/reporte/reporte.service';
import { UserService } from '@services/user/user.service';
import { MessageDialogComponent } from '../message.dialog/message.dialog.component';
import { ConfirmationDialogComponent } from '@components/dialogs/confirmation.dialog/confirmation.dialog.component';

@Component({
  selector: 'app-mail.report.dialog',
  templateUrl: './mail.report.dialog.component.html',
  styleUrls: ['./mail.report.dialog.component.scss'],
})
export class MailReportDialogComponent implements OnInit {
  paraFormControl = new FormControl('');
  ccoFormControl = new FormControl('');
  asuntoFormControl = new FormControl('');
  mensajeFormControl = new FormControl('');
  nombreArchivo: string;

  constructor(
    private correoService: CorreoService,
    private userService: UserService,
    private reporteService: ReporteService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.nombreArchivo = this.reporteService.getReportCache().nombreArchivo;
  }

  ngOnInit() {}

  enviarCorreo() {
    if (!this.paraFormControl.value) {
      this.dialog.open(MessageDialogComponent, {
        data: {
          message: 'Debes ingresar un destinatario',
        },
      });

      return;
    }

    if (!this.asuntoFormControl.value) {
      const dialogConfig = this.asuntoDialogConfirm();

      const dialogRef = this.dialog.open(
        ConfirmationDialogComponent,
        dialogConfig
      );

      dialogRef.afterClosed().subscribe((responseDialog) => {
        if (responseDialog === 'Confirm') {
          this.enviar();

          return;
        }
      });
    } else {
      this.enviar();
    }
  }

  private enviar() {
    let request = new CorreoRequest({
      destinatario: this.paraFormControl.value,
      cco: this.ccoFormControl.value,
      asunto: this.asuntoFormControl.value,
      cuerpo: this.mensajeFormControl.value,
      fileBytes: this.data.imagenBytes,
      fileName: `${this.nombreArchivo}.pdf`,
      idCasilla: this.userService.getUserValue().idCasilla.toString(),
    });
    this.correoService.enviar(request).subscribe((response) => {
      console.log('correo enviado');
    });
  }

  private asuntoDialogConfirm() {
    const title = '¿Estas seguro de enviar el correo sin asunto?';
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title,
      text: '',
      btnPrimaryText: 'Si',
      btnSecondaryText: 'No',
    };

    return dialogConfig;
  }
}
