import { useQuery } from "@tanstack/react-query";
import { getOffices } from "../services/oficinaService";



export const useOffices = () => {
  return useQuery({ queryKey: ['offices'], queryFn: getOffices });
};
