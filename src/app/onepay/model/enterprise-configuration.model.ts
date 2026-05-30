import { IEnterprise } from "./enterprise.model";

export interface IEnterpriseConfiguration {
    id: number,
    enterprise: IEnterprise,
    maxAmountRestauration: number,
    maxAmountMarket: number,
    maxAmountGasStation: number,
    maxAmountTelephony: number,
    enterprisePercentage: number,
    employeePercentage: number
}