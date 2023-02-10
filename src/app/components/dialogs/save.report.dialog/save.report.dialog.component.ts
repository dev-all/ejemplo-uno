import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReporteBase } from 'src/app/models/Reporte/ReporteBase';
import { ReporteRequestMovimiento } from 'src/app/models/Reporte/ReporteRequestMovimiento';
import { TipoReporte } from 'src/app/models/Reporte/TipoReporte.enum';
import { MovimientoService } from 'src/app/services/movimiento/movimiento.service';
import { ReporteService } from 'src/app/services/reporte/reporte.service';

@Component({
  selector: 'app-save.report.dialog',
  templateUrl: './save.report.dialog.component.html',
  styleUrls: ['./save.report.dialog.component.scss'],
})
export class SaveReportDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private reporteService: ReporteService
  ) {}

  ngOnInit() {}

  async save(formatType: string) {
    var reportRequestCache = this.reporteService.getReportCache();

    let fileExtension: string;

    switch (formatType.toUpperCase()) {
      case 'PDF':
        fileExtension = 'pdf';
        break;
      case 'WORD':
        fileExtension = 'docx';
        break;
      case 'EXCEL':
        fileExtension = 'xlsx';
        break;
      case 'IMAGE':
        fileExtension = 'jpg';
        break;
      default:
        break;
    }
    reportRequestCache.formatoArchivo = formatType;
    reportRequestCache.reporteRequest.formatoArchivo = formatType;

    if (reportRequestCache.tipoReporte == TipoReporte.movimiento) {
      const response = await this.reporteService
        .generarReporteMovimiento(reportRequestCache.reporteRequest)
        .toPromise();

      this.generarReporte(response.Data, reportRequestCache, fileExtension);
    }

    if (reportRequestCache.tipoReporte == TipoReporte.movimientoDeposito) {
      const response = await this.reporteService
        .generarReporteMovimientoDeposito(reportRequestCache.reporteRequest)
        .toPromise();

      this.generarReporte(response.Data, reportRequestCache, fileExtension);
    }
  }

  private generarReporte(
    base64: string,
    reportRequestCache: ReporteBase,
    fileExtension: string
  ) {
    const fileContent = base64;
    var sampleArr = this.base64ToArrayBuffer(fileContent);
    let file = new Blob([sampleArr], {
      type: 'application/octet-stream',
    });
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(
        file,
        `${reportRequestCache.nombreArchivo}.${fileExtension}`
      );
    } else {
      // Chrome, Safari, Firefox, Opera
      let url = URL.createObjectURL(file);
      this.openLink(
        url,
        `${reportRequestCache.nombreArchivo}.${fileExtension}`
      );
      setTimeout(function () {
        window.URL.revokeObjectURL(url);
      }, 5000);
    }
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

  private openLink(url: string, fileName: string) {
    let a = document.createElement('a');
    // Firefox requires the link to be in the body
    document.body.appendChild(a);
    a.style.display = 'none';
    a.href = url;
    a.download = `${fileName}`;
    a.click();
    // Remove the link when done
    document.body.removeChild(a);
  }
}
