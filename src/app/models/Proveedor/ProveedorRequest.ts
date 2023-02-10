export class ProveedorRequest {
    database: string;

    constructor(init?:Partial<ProveedorRequest>){
        Object.assign(this,init)
    }
}
