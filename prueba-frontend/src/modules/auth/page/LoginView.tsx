import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,

  Heading,
  Input,

  Stack,

  Flex,
  Field,

} from '@chakra-ui/react';
import { FormControl } from "@chakra-ui/form-control"

import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { useColorModeValue } from '@/components/ui/color-mode';
import { toaster } from '@/components/ui/toaster';

const loginSchema = z.object({
  email: z.string()
    .min(1, { message: "El correo electrónico es requerido" })
    .email({ message: "Formato de correo electrónico inválido" }),
  password: z.string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    .max(50, { message: "La contraseña no puede exceder los 50 caracteres" })
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginView = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const onSubmit = async (values: LoginFormValues) => {
    try {
      const response = await login(values.email, values.password);
      if (response.success) {
        toaster.create({
          title: response.message,
          description: `Bienvenido de nuevo ${values.email}`,
          type: 'success',
          duration: 3000,
        });
      } else {
        toaster.create({
          title: 'Error de autenticación',
          description: response.message,
          type: 'error',
          duration: 3000,
        });
      }
    } catch (err) {
      console.log(err)
      toaster.create({
        title: 'Error de conexión',
        description: 'No se pudo conectar al servidor.',
        type: 'error',
        duration: 3000,
      });
    }
  };


  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
      p={4}
    >
      <Box
        maxW="md"
        w="full"
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow="lg"
        rounded="lg"
        p={6}
      >
        <Stack mx={4}>
          <Heading
            as="h1"
            size="lg"
            textAlign="center"
            color={useColorModeValue('gray.800', 'white')}
            fontWeight="bold"
          >
            Iniciar sesión
          </Heading>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={4}> {/* Agrega espacio entre los elementos */}
              <FormControl>
                <Field.Root invalid={!!errors.email}>
                  <Field.Label>Email</Field.Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Tu@ejemplo.com"
                    {...register("email")}
                  />
                  <Field.ErrorText>
                    {errors.email && errors.email.message}
                  </Field.ErrorText>
                </Field.Root>
              </FormControl>

              <FormControl>
                <Field.Root invalid={!!errors.password}>
                  <Field.Label>Contraseña</Field.Label>
                  <Flex position="relative" align="center" width="full">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Contraseña"
                      {...register("password")}
                      pr="3rem"
                    />
                    <Button
                      position="absolute"
                      right="0.75rem"
                      top="50%"
                      transform="translateY(-50%)"
                      h="1.75rem"
                      size="sm"
                      onClick={togglePasswordVisibility}
                      variant="ghost"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </Button>
                  </Flex>
                  <Field.ErrorText>
                    {errors.password && errors.password.message}
                  </Field.ErrorText>
                </Field.Root>
              </FormControl>

              <Button
                type="submit"
                color="white"
                fontSize="md"
                loadingText="Procesando"
                mt={4}
              >
                Iniciar sesión
              </Button>
            </Stack>
          </form>



        </Stack>
      </Box>
    </Flex>
  );
};

export default LoginView;