import { Modules, Role, Status } from "./core.enum";

export interface ISalesProfile {
    id?: number,
    ref?: string,
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    phoneNumber: string,
    role: Role,
    sales: ISales,
    status: Status
}
export interface ISales {
    id?: number,
    ref?: string,
    name: string,
    address: string,
    type: Modules
}

export interface ISalesConfiguration {
    id?: number,
    ref?: string,
    sales: ISales,
    minAmount: number,
    maxAmount: number
}