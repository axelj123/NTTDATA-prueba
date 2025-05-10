import type { Office } from "./Office"

export interface Employee {
    id: number
    name: string
    phone: string
    nationalId: string 
    address: string
    birthDate: string
    offices: Office[]
}
