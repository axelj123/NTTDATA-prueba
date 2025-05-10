import { employeeApi } from "@/api/empleadoApi";
import type { Employee } from "@/types/Employee";


export const getEmployee = async ():Promise<Employee[]> => {
    const response=await employeeApi.get<Employee[]>("")
    return response.data
}

export const createEmployee = async (data: Employee):Promise<Employee> => {
    const response=await employeeApi.post<Employee>("",data)
    return response.data
}
export const updateEmployee = async (id: number, data: Employee):Promise<Employee> => {
    const response=await employeeApi.put<Employee>(`/${id}`,data)
    return response.data
}
export const deleteEmployee = async (id: number):Promise<void> => {
    await employeeApi.delete<void>(`/${id}`)
}
export const getEmployeeById = async (id: number):Promise<Employee> => {
    const response=await employeeApi.get<Employee>(`/${id}`)
    return response.data
}


