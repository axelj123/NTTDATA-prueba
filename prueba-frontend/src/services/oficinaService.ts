import type { Office } from "@/types/Office"
import { oficinaApi } from "../api/oficinaApi"


export const getOffices = async ():Promise<Office[]> => {
    const response=await oficinaApi.get<Office[]>("")
    return response.data
}
