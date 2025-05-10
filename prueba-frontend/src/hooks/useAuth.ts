import { useAuthStore } from '../store/auth/authStore'
import { authLogin } from '../services/authService'
import type { LoginResponse } from '@/types/User'
import type { AxiosError } from 'axios'

export const useAuth = () => {
  const setToken = useAuthStore((state) => state.setToken)
  const clearToken = useAuthStore((state) => state.clearToken)
  const token = useAuthStore((state) => state.token)

  const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await authLogin(email, password);
      setToken(response.token ?? '');
      return response; 
    } catch (error: unknown) { 
      const axiosError = error as AxiosError<{ message: string; success: boolean }>;
      if (axiosError.response && axiosError.response.data) {
        return {
          success: false,
          message: (axiosError.response.data as LoginResponse).message ?? "Error de autenticación", 
          token: "", 
        };
      } else {
        return {
          success: false,
          message: "Error inesperado al procesar la autenticación.",
          token: "",
        };
      }
    }
  };
  
  

  const logout = () => {
    clearToken()
  }

  return {
    token,
    login,
    logout,
    isAuthenticated: !!token,
  }
}
