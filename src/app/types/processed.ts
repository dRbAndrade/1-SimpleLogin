import { Base } from "./base"

export type ProcessedData = {
    name: string,
    data: number[]
}

export type Processed = Base & {
    info: ProcessedData[]
}