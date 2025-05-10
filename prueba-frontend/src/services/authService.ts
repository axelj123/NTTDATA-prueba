import { authApi } from "../api/authApi";
import type { LoginResponse } from "../types/User";

  export const authLogin = async (
      email: string,
      password: string
    ): Promise<LoginResponse> => {
      const response = await authApi.post<LoginResponse>("/login", {
        email, 
        password,
      });
      return response.data;
  };
