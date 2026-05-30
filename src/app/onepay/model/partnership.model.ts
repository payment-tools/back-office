import { Status } from "./core.enum";
import { IEnterprise } from "./enterprise.model";
import { ISales } from "./sales.model";

export interface IPartnership {
    enterprise: IEnterprise,
    sales: ISales,
    status: Status
}