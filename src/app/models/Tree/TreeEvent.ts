export class TreeEvent {
  idGrupo?: number;
  idRubro?: number;
  idSubRubro?: number;
  constructor(init?: Partial<TreeEvent>) {
    Object.assign(this, init);
  }
}
