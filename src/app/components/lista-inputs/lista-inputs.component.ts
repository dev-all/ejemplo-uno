import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { InputDinamico } from 'src/app/models/FormDinamico/InputDinamico';

@Component({
  selector: 'app-lista-inputs',
  templateUrl: './lista-inputs.component.html',
  styleUrls: ['./lista-inputs.component.scss'],
})
export class ListaInputsComponent implements OnInit {
  @Input() listaInputs: InputDinamico[];
  @Output() listaChange_Event = new EventEmitter<InputDinamico>();
  mostrarLista: boolean;
  private unlistener: () => void;
  constructor(private renderer2: Renderer2) {}

  ngOnInit() {
    this.unlistener = this.renderer2.listen('body', 'click', (e) => {
      const listaEvent = e.target.getAttribute('listaInput');
      if (listaEvent) {
        const spanEvent =
          e.target.parentElement.parentElement.parentElement.getAttribute(
            'listaInput'
          );

        const checkEvent =
          e.target.parentElement.parentElement.getAttribute('listaInput');

        if (!listaEvent && !checkEvent && !spanEvent) {
          this.mostrarLista = false;
        }
      }
    });
  }

  ngOnDestroy() {
    this.unlistener();
  }

  listChange(input: MatSelectionListChange) {
    const inputDinamico = input.options[0].value;

    if (
      inputDinamico.isDefault ||
      inputDinamico.isDefault ||
      inputDinamico.isDefault ||
      inputDinamico.isDefault
    ) {
      input.options[0].selected = true;
      return;
    }

    inputDinamico.checked = !inputDinamico.checked;
    this.listaChange_Event.emit(inputDinamico);
  }
}
