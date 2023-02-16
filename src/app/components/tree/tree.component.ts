import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { GrupoModel } from '@models/Grupo/GrupoModel';
import { RequestBase } from '@models/RequestBase';
import { TreeEvent } from '@models/Tree/TreeEvent';
import { ArbolService } from '@services/arbol/arbol.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements OnInit {
  @ViewChildren('grupo') grupoTrigger: QueryList<ElementRef>;
  @ViewChild('subRubro') subRubroTrigger: ElementRef;
  @ViewChild('selecionSubRubro') selecionSubRubroTrigger: ElementRef;
  showTree: boolean;
  marcarSubRubro: boolean;
  grupos: GrupoModel[];
  seleccionTree: string;
  @Output() TreeChangeEvent = new EventEmitter<TreeEvent>();

  private unlistener: () => void;

  constructor(
    private renderer2: Renderer2,
    private arbolService: ArbolService
  ) {}

  ngOnInit() {
    this.unlistener = this.renderer2.listen('body', 'click', (e) => {
      var isTreeEvent = e.target.getAttribute('tree');
      if (!isTreeEvent) {
        this.showTree = false;
      }
    });

    var arbolRequest = new RequestBase();
    this.arbolService.obtener(arbolRequest).subscribe((response) => {
      this.grupos = response.Data;
    });
  }

  ngOnDestroy() {
    this.unlistener();
  }

  expanderLista(
    index: number,
    tipo: string,
    nombreSelecciion: string,
    idGrupo = null,
    idRubro = null,
    idSubRubro = null,
    indexSub = null,
    event: HTMLSpanElement = null
  ) {
    if (tipo.toUpperCase() === 'GRUPO') this.grupo_Click(index, idGrupo);
    if (tipo.toUpperCase() === 'RUBRO')
      this.rubro_Click(index, idGrupo, idRubro, indexSub);
    if (tipo.toUpperCase() === 'SUBRUBRO')
      this.subRubro_Click(event, idGrupo, idRubro, idSubRubro);

    this.agregarSeleccion(nombreSelecciion);
  }

  private grupo_Click(index: number, idGrupo: number) {
    let grupoSeleccionado = this.grupoTrigger.find(
      (x) => x.nativeElement.getAttribute('index') == index
    );

    let estaExpandido =
      grupoSeleccionado.nativeElement.nextElementSibling.classList.contains(
        'nested'
      );

    if (estaExpandido) {
      grupoSeleccionado.nativeElement.classList.add('caret-down');
      grupoSeleccionado.nativeElement.nextElementSibling.classList.remove(
        'nested'
      );

      grupoSeleccionado.nativeElement.nextElementSibling.classList.add(
        'active'
      );

      var treeEvent = new TreeEvent({
        idGrupo,
      });

      this.emitTreeEvent(treeEvent);
    } else {
      grupoSeleccionado.nativeElement.classList.remove('caret-down');
      grupoSeleccionado.nativeElement.nextElementSibling.classList.remove(
        'active'
      );
      grupoSeleccionado.nativeElement.nextElementSibling.classList.add(
        'nested'
      );
    }
  }

  private rubro_Click(
    grupoIndex: number,
    idGrupo: number,
    idRubro: number,
    subGrupoIndex: number
  ) {
    let subGrupoSeleccionado = this.grupoTrigger.find(
      (x) => x.nativeElement.getAttribute('index') == grupoIndex
    ).nativeElement.nextElementSibling;

    for (let i = 0; i < subGrupoSeleccionado.children.length; i++) {
      var index = subGrupoSeleccionado.children[i].getAttribute('index');
      var subGrupo = subGrupoSeleccionado.children[i];

      if (index == subGrupoIndex) {
        let estaExpandido =
          subGrupo.firstChild.nextElementSibling.classList.contains('nested');

        if (estaExpandido) {
          subGrupo.firstChild.nextElementSibling.classList.add('caret-down');
          subGrupo.firstChild.nextElementSibling.classList.remove('nested');
          subGrupo.firstChild.nextElementSibling.classList.add('active');

          var treeEvent = new TreeEvent({
            idGrupo,
            idRubro,
          });

          this.emitTreeEvent(treeEvent);
        } else {
          subGrupo.firstChild.nextElementSibling.classList.remove('caret-down');
          subGrupo.firstChild.nextElementSibling.classList.remove('active');
          subGrupo.firstChild.nextElementSibling.classList.add('nested');
        }
      }
    }
  }

  private subRubro_Click(
    event: HTMLSpanElement,
    idGrupo: number,
    idRubro: number,
    idSubRubro: number
  ) {
    let subRubros = document.querySelectorAll('.marcar');
    subRubros.forEach((subRubro) => {
      subRubro.classList.remove('marcar');
    });

    var treeEvent = new TreeEvent({
      idGrupo,
      idRubro,
      idSubRubro,
    });

    this.emitTreeEvent(treeEvent);
    event.classList.add('marcar');
  }

  private emitTreeEvent(treeEvent: TreeEvent) {
    this.TreeChangeEvent.emit(treeEvent);
  }

  private agregarSeleccion(nombre: string) {
    this.seleccionTree = nombre.trim().toUpperCase();
  }
}
