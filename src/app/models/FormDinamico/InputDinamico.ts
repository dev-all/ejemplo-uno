export class InputDinamico {
  descripcion: string;
  checked: boolean;
  isDefault: boolean;

  constructor(init?: Partial<InputDinamico>) {
    Object.assign(this, init);
  }
}
