'use client';

import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    useBreakpointValue,
} from '@chakra-ui/react';
import { Menu, X, LogOut } from 'lucide-react';
import { useColorModeValue } from './ui/color-mode';
import type { JSX } from 'react';

interface NavbarProps {
    onLogout: () => void;
    open: boolean;
    onToggle: () => void;
}

export default function Navbar({ onLogout,open,onToggle }: NavbarProps): JSX.Element {

    return (
        <Box>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}>
                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}>

                    <IconButton
                        variant="ghost"
                        aria-label="Toggle"
                        onClick={onToggle}
                    >
                        {open ? <X size={18} /> : <Menu size={18} />}
                    </IconButton>
                </Flex>
                <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                    <Text
                        textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                        fontFamily={'heading'}
                        fontWeight={'bold'}
                        color={useColorModeValue('gray.800', 'white')}>
                        Mi Aplicación
                    </Text>
                </Flex>

                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    gap={6}>

                    <Button display={'inline-flex'}
                        fontSize={'sm'}
                        fontWeight={600}
                        color={'white'}
                        bg={'red.500'}
                        onClick={onLogout}>
                        <LogOut size={18} /> Cerrar Sesión
                    </Button>
                </Stack>
            </Flex>

            {/* Mostrar el menú móvil sin usar Collapse */}
            {open && <MobileNav onLogout={onLogout} />}
        </Box>
    );
}

const MobileNav = ({ onLogout }: { onLogout: () => void }): JSX.Element => {
    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            p={4}
            display={{ md: 'none' }}>
            <Stack gap={4}>
                <Box
                    py={2}
                    as="button"
                    onClick={onLogout}
                    justifyContent="space-between"
                    alignItems="center"
                    _hover={{
                        textDecoration: 'none',
                    }}>
                    <Flex align="center" gap={2}>
                        <LogOut size={18} color="red" />
                        <Text fontWeight={600} color={'red.500'}>
                            Cerrar Sesión
                        </Text>
                    </Flex>
                </Box>
            </Stack>
        </Stack>
    );
};
