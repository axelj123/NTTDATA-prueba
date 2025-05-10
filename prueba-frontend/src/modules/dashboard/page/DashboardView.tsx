import {

  Button,
  Card,
  CardBody,
  Container,
  Flex,

  Heading,

  SimpleGrid,

  Text,

  useDisclosure,

} from '@chakra-ui/react';
import { useCreateEmployee, useDeleteEmployee, useEmployees, useUpdateEmployee } from '../../../hooks/useEmployees';
import { EmployeeTable } from '../components/EmployeeTable';
import {  useState } from 'react';
import { useOffices } from '../../../hooks/useOffices';
import EmpleadoDrawer from '../components/EmployeeDrawer';
import ModalOffices from '../components/ModalOffices';
import ModalDeleteEmployee from '../components/ModalDeleteEmployee';
import { toaster } from '@/components/ui/toaster';
import type { Employee } from '@/types/Employee';

function DashboardView() {
  // controles drawer y modal
  const { onOpen: onOpenDrawer, onClose: onCloseDrawer, open: openDrawer } = useDisclosure();
  const { onOpen: onOpenModalVer, onClose: onCloseModalVer, open: openModalVer } = useDisclosure();
  const { onOpen: onOpenModalEliminar, onClose: onCloseModalEliminar, open: openModalEliminar } = useDisclosure();

  //hooks apis
  const { data: employees } = useEmployees();
  const { mutate: createEmployee } = useCreateEmployee();
  const { mutate: deleteEmployee } = useDeleteEmployee();
  const { mutate: updateEmployee } = useUpdateEmployee();

  const { data: officess } = useOffices();
  const [modo, setModo] = useState<'crear' | 'editar'>('crear');

  const [empleadoActual, setEmpleadoActual] = useState<Partial<Employee>>({
    name: '',
    phone: '',
    nationalId: '',
    address: '',
    birthDate: '',
    offices: []
  });





  const abrirDrawerCrear = (): void => {
    setEmpleadoActual({
      name: '',
      phone: '',
      nationalId: '',
      address: '',
      birthDate: '',
      offices: []
    });
    setModo('crear');
    onOpenDrawer();
  };

  const abrirDrawerEditar = (empleado: Employee): void => {
    const empleadoConSoloIDs = {
      ...empleado,
      offices: empleado.offices.map((oficina) => oficina.id), 
    };
  
    setEmpleadoActual(empleadoConSoloIDs as unknown as Partial<Employee>);
    setModo('editar');
    onOpenDrawer();
  };
  
  const abrirModalVer = (empleado: Employee): void => {
    setEmpleadoActual(empleado);
    onOpenModalVer();
  };

  
  const handleSubmit = async (data: Employee) => {
    try {
      if (modo == "crear") {
          
        createEmployee(data);
        toaster.create({
          title: `Se ha creado un nuevo empleado`,
          description: `Se ha registrado al empleado ${data.name} con telefono ${data.phone}`,
          type: 'success',
          duration: 3000,
        })

      } else {
        updateEmployee({ id: data.id, data });
        toaster.create({
          title: `Se ha actualizado exitosamente los datos del empleado`,
          description: `Se ha actualizado al empleado ${data.name} con telefono ${data.phone}`,
          type: 'success',
          duration: 3000,
        })
      }

    } catch (error) {
      console.log("ERROR AL ENVIAR DATA", error)
    }

  };

  const abrirModalEliminar = (empleado: Employee): void => {
    setEmpleadoActual(empleado);
    onOpenModalEliminar();
  };

  return (
    <Container py={5}>
      <Flex mb={5} justifyContent="space-between" alignItems="center">
        <Heading size="lg" style={{ fontWeight: 'bold', fontSize: 24 }}>Dashboard de Empleados</Heading>
        <Button onClick={abrirDrawerCrear}>
          Registrar Nuevo Empleado
        </Button>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 3 }} mx={6} mb={8} gap={4}>
        <Card.Root variant="elevated">
          <CardBody>
            <Heading size="md" mb={2}>Total Empleados</Heading>
            <Text fontSize="3xl">{employees?.length || 0}</Text>
          </CardBody>
        </Card.Root>


      </SimpleGrid>


      {/* Employee Table */}
      <EmployeeTable
        data={employees}
        onEdit={(id: number) => {
          const empleado = employees?.find(emp => emp.id === id);
          if (empleado) abrirDrawerEditar(empleado);
        }}
        onDelete={(id: number) => {
          const empleado = employees?.find(emp => emp.id === id);
          if (empleado) abrirModalEliminar(empleado);
        }}
        onView={(id: number) => {
          const empleado = employees?.find(emp => emp.id === id);
          if (empleado) abrirModalVer(empleado);
        }}

      />


      {/*  Drawer empleado*/}
      <EmpleadoDrawer
        isOpen={openDrawer}
        onSubmit={handleSubmit}
        onClose={onCloseDrawer}

        empleadoActual={empleadoActual}
        listaOficinas={officess || []}
        modo={modo}
      />

      {/*  Modal ver oficinas*/}

      <ModalOffices
        isOpen={openModalVer}
        onClose={onCloseModalVer}
        employeeOffices={empleadoActual.offices || []}
        employeeName={empleadoActual.name}
      />

      {/*  Modal eliminar empleado*/}
      <ModalDeleteEmployee
        employeeName={empleadoActual.name || ''}
        isOpen={openModalEliminar}
        onClose={onCloseModalEliminar}
        onConfirm={() => {
          if (empleadoActual.id) {
            deleteEmployee(empleadoActual.id);
            onCloseModalEliminar();
          }
        }}

      />

    </Container>
  );
}

export default DashboardView;