export class SnackBar {
  mensaje: string;
  action: string;

  constructor(init?: Partial<SnackBar>) {
    Object.assign(this, init);
  }
}
