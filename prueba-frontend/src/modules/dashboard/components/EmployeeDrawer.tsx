

import { useEffect, useRef } from "react"
import { useForm, Controller } from "react-hook-form"
import {
  Button,
  Input,
  HStack,
  Select,
  Portal,
  createListCollection,
  Drawer,
  Stack,
  Field,
} from "@chakra-ui/react"
import { FormControl } from "@chakra-ui/form-control"
import type { Employee } from "@/types/Employee"
import type { Office } from "@/types/Office"



interface EmpleadoFormModalProps {
  isOpen: boolean
  onClose: () => void
  empleadoActual: Partial<Employee>
  onSubmit: (data: Employee) => void
  listaOficinas: Office[]
  modo: "crear" | "editar"
}

const EmpleadoDrawer = ({
  isOpen,
  onClose,
  empleadoActual = {},
  onSubmit,
  listaOficinas = [],
  modo = "crear",
}: EmpleadoFormModalProps) => {
  const contentRef = useRef<HTMLDivElement | null>(null)

  const oficinasCollection = createListCollection({
    items: listaOficinas.map(oficina => ({
      label: oficina.name,
      value: oficina.id,
      original: oficina
    }))
  })
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Employee>({

    defaultValues: {
      name: empleadoActual.name || "",
      phone: empleadoActual.phone || "",
      nationalId: empleadoActual.nationalId || "",
      address: empleadoActual.address || "",
      birthDate: empleadoActual.birthDate || "",
      offices: empleadoActual.offices || [],
    },
  })
  useEffect(() => {
    if (isOpen) {
      reset({
        id: empleadoActual.id,
        name: empleadoActual.name || "",
        phone: empleadoActual.phone || "",
        nationalId: empleadoActual.nationalId || "",
        address: empleadoActual.address || "",
        birthDate: empleadoActual.birthDate || "",
        offices: empleadoActual.offices || [],
      })
    }
  }, [empleadoActual, reset, isOpen])

  const handleClose = (): void => {
    reset()
    onClose()
  }

  const processSubmit = (data: Employee): void => {
    try {
      onSubmit(data)
      handleClose()
    } catch (error) {

      console.error(error)

    }
  }

  return (
    <Drawer.Root open={isOpen} closeOnEscape onOpenChange={handleClose}>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content p={6} maxW="md" ref={contentRef}>
            <Drawer.Header>
              <Drawer.Title>{modo === "crear" ? "Crear Nuevo" : "Editar"} Empleado</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <form onSubmit={handleSubmit(processSubmit)}>
                <Stack gap={6} width="full">
                  <Controller
                    name="name"
                    control={control}
                    rules={{
                      required: "El nombre es obligatorio",
                      minLength: {
                        value: 2,
                        message: "El nombre debe tener entre 2 y 100 caracteres",
                      },
                      maxLength: {
                        value: 100,
                        message: "El nombre debe tener entre 2 y 100 caracteres",
                      },
                    }}
                    render={({ field }) => (
                      <FormControl >
                        <Field.Root invalid={!!errors.name} >
                          <Field.Label>Nombre</Field.Label>
                          <Input placeholder="Nombre completo" {...field} />
                          <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                        </Field.Root>

                      </FormControl>
                    )}
                  />

                  <Controller
                    name="phone"
                    control={control}
                    rules={{
                      required: "El numero es obligatorio",

                      pattern: {
                        value: /^[0-9]{9,15}$/,
                        message: "El teléfono debe contener entre 9 y 15 dígitos numéricos",
                      },
                    }}
                    render={({ field }) => (
                      <FormControl>
                        <Field.Root invalid={!!errors.phone} >
                          <Field.Label>Teléfono</Field.Label>
                          <Input placeholder="Número de teléfono" {...field} />
                          <Field.ErrorText>{errors.phone?.message}</Field.ErrorText>
                        </Field.Root>

                      </FormControl>
                    )}
                  />

                  <Controller
                    name="nationalId"
                    control={control}
                    rules={{
                      required: "El DNI es obligatorio",
                      pattern: {
                        value: /^[A-Z0-9]{5,20}$/,
                        message: "El documento de identidad debe tener entre 5 y 20 caracteres alfanuméricos (solo mayúsculas y números)",
                      },
                    }}
                    render={({ field }) => (
                      <FormControl  >

                        <Field.Root invalid={!!errors.nationalId} >
                          <Field.Label>DNI</Field.Label>
                          <Input placeholder="Documento de identidad" {...field} />
                          <Field.ErrorText>{errors.nationalId?.message}</Field.ErrorText>
                        </Field.Root>



                      </FormControl>
                    )}
                  />

                  <Controller
                    name="address"
                    control={control}
                    rules={{
                      required: "La dirección es obligatoria",
                      minLength: {
                        value: 5,
                        message: "La dirección debe tener entre 5 y 200 caracteres",
                      },
                      maxLength: {
                        value: 200,
                        message: "La dirección debe tener entre 5 y 200 caracteres",
                      },
                    }}
                    render={({ field }) => (
                      <FormControl  >
                        <Field.Root invalid={!!errors.address} >
                          <Field.Label>Dirección</Field.Label>
                          <Input placeholder="Dirección" {...field} />
                          <Field.ErrorText>{errors.address?.message}</Field.ErrorText>
                        </Field.Root>

                      </FormControl>
                    )}
                  />

                  <Controller
                    name="birthDate"
                    control={control}
                    rules={{
                      required: "La fecha de nacimiento es obligatoria",
                      validate: value =>
                        new Date(value) < new Date() || "La fecha de nacimiento debe ser en el pasado",
                    }}
                    render={({ field }) => (
                      <FormControl  >

                        <Field.Root invalid={!!errors.birthDate} >
                          <Field.Label>Fecha de Nacimiento</Field.Label>
                          <Input type="date" placeholder="Dirección" {...field} />
                          <Field.ErrorText>{errors.birthDate?.message}</Field.ErrorText>
                        </Field.Root>

                      </FormControl>
                    )}
                  />

                  <Controller
                    name="offices"
                    control={control}
                    render={({ field }) => {
                      const oficinasIds = field.value && Array.isArray(field.value)
                        ? field.value.map(of => typeof of === 'object' ? of.id : of)
                        : [];

                      return (
                        <Stack gap={6} width="full">
                          <Select.Root
                            collection={oficinasCollection}
                            variant="outline"
                            value={oficinasIds}
                            multiple
                            onValueChange={({ value }) => {
                              const ids = value.map(id => Number(id));
                              field.onChange(ids);
                            }}

                            onInteractOutside={() => field.onBlur()}
                          >
                            <Select.HiddenSelect />
                            <Select.Label>Oficinas</Select.Label>
                            <Select.Control>
                              <Select.Trigger>
                                <Select.ValueText placeholder="Seleccione una oficina" />
                              </Select.Trigger>
                              <Select.IndicatorGroup>
                                <Select.Indicator />
                              </Select.IndicatorGroup>
                            </Select.Control>
                            <Portal container={contentRef}>
                              <Select.Positioner>
                                <Select.Content>
                                  {oficinasCollection.items.map((oficina) => (
                                    <Select.Item item={oficina} key={oficina.value}>
                                      {oficina.label}
                                      <Select.ItemIndicator />
                                    </Select.Item>
                                  ))}
                                </Select.Content>
                              </Select.Positioner>
                            </Portal>
                          </Select.Root>
                        </Stack>
                      );
                    }}
                  />
                </Stack>

                <HStack mt={8} gap={4} justify="flex-end">
                  <Drawer.CloseTrigger asChild>
                    <Button variant="ghost">Cancelar</Button>
                  </Drawer.CloseTrigger>
                  <Button type="submit">Guardar</Button>
                </HStack>
              </form>
            </Drawer.Body>

          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>

    </Drawer.Root>
  )
}

export default EmpleadoDrawer