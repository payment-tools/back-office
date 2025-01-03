import { Modules, Role, Status } from "./core.enum";

export interface IEnterpriseProfile {
    id?: number,
    ref?: string,
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    phoneNumber: string,
    role: Role,
    enterprise: IEnterprise,
    status: Status
}

export interface IEnterprise {
    id?: number,
    ref?: string,
    name?: string,
    address?: string,
    maxQuota?: number,
    actualQuota?: number,
    enrolledModules?: Modules[]
}