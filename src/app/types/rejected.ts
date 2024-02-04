import { Base } from "./base"

export type SunatErrors = {
    docType: string;
    longDocType: string;
    longSunatStatus: number;
    sunatMessage: string;
    count: number;
}

export type RejectedData = {
    ruc: string,
    issuerName: string,
    errors: SunatErrors[]
}

export type Rejected = Base & {
    info: RejectedData[]
}