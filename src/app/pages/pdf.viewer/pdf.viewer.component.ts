import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { SaveReportDialogComponent } from '@components/dialogs/save.report.dialog/save.report.dialog.component';
import { ReporteService } from '@services/reporte/reporte.service';
import * as es6printJS from 'print-js';
import { WhatsappReportDialogComponent } from '@components/dialogs/whatsapp.report.dialog/whatsapp.report.dialog.component';
import { MailReportDialogComponent } from '@components/dialogs/mail.report.dialog/mail.report.dialog.component';
import { Location } from '@angular/common';
import { HostListener } from '@angular/core';
import { GlobalSnackbarService } from '@services/global.snackbar/global.snackbar.service';

@Component({
  selector: 'app-pdf.viewer',
  templateUrl: './pdf.viewer.component.html',
  styleUrls: ['./pdf.viewer.component.scss'],
})
export class PdfViewerPage implements OnDestroy {
  pdfSrc: string;
  zoomNumber: number = 1;
  page: number;
  imagenBytes: string;
  isRefresh: boolean;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private reporteService: ReporteService
  ) {
    this.imagenBytes = this.route.snapshot.paramMap.get('binaryData');

    var sampleArr = this.base64ToArrayBuffer(this.imagenBytes);

    let file = new Blob([sampleArr], { type: 'application/pdf' });
    var fileURL = URL.createObjectURL(file);
    this.pdfSrc = fileURL;

    if (localStorage.getItem('reportRefresh')) {
      localStorage.removeItem('reportRefresh');
      window.close();
    }
  }

  ngOnDestroy(): void {
    this.reporteService.removeReportCache();
  }

  @HostListener('window:beforeunload')
  onBeforeUnload() {
    localStorage.setItem('reportRefresh', 'true');
  }

  handleZoom(number: number) {
    if (this.zoomNumber.toFixed(1) == '0.1' && number === -0.1) {
      return;
    }
    this.zoomNumber += number;
  }

  sendMail() {
    this.dialog.open(MailReportDialogComponent, {
      width: '500px',
      data: {
        imagenBytes: this.imagenBytes,
      },
    });
  }

  sendWhatsApp() {
    this.dialog.open(WhatsappReportDialogComponent, {
      width: '500px',
      data: {
        imagenBytes: this.imagenBytes,
      },
    });
  }

  download() {
    this.dialog.open(SaveReportDialogComponent, {
      width: '500px',
    });
  }

  print() {
    es6printJS(this.pdfSrc);
  }

  base64ToArrayBuffer(base64: string) {
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
      var ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  }

  saveByteArray(reportName, byte) {
    var blob = new Blob([byte], { type: 'application/pdf' });
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    var fileName = reportName;
    link.download = fileName;
    link.click();
  }
}
