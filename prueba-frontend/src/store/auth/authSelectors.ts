import { useAuthStore } from './authStore'

export const useIsAuthenticated = () => {
  return !!useAuthStore((state) => state.token)
}
