import Navbar from '@/components/NavBar';
import { useAuth } from '@/hooks/useAuth';
import { Box, useDisclosure } from '@chakra-ui/react';
;
import { Outlet } from 'react-router';



export default function Layout() {

  const { open, onToggle } = useDisclosure();
  const { logout } = useAuth()
  const onLogout = () => {
    logout();
  }

  return (
    <Box>

      <Navbar
        open={open}
        onLogout={onLogout}
        onToggle={onToggle}
      />

      <Outlet />
    </Box>
  );
}