import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Eye, Pen, Trash } from "lucide-react";
import {
  Table,
  ButtonGroup,
  IconButton,
  Box,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import type { Employee } from "@/types/Employee";

type Props = {
  data: Employee[] | undefined;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onView: (id: number) => void;
};

const columnHelper = createColumnHelper<Employee>();

export const EmployeeTable = ({ data = [], onEdit, onDelete, onView }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    return data.filter((empleado) =>
      `${empleado.name} ${empleado.nationalId} ${empleado.phone} ${empleado.address}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, data]);

  const columns = [
    columnHelper.accessor("name", { header: "Nombre" }),
    columnHelper.accessor("phone", { header: "Teléfono" }),
    columnHelper.accessor("nationalId", { header: "DNI" }),
    columnHelper.accessor("address", { header: "Dirección" }),
    columnHelper.accessor("birthDate", { header: "Fecha de Nacimiento" }),
    columnHelper.display({
      id: "acciones",
      header: "Acciones",
      cell: ({ row }) => (
        <ButtonGroup size="sm">
          <IconButton aria-label="Editar" onClick={() => onEdit(row.original.id)}>
            <Pen />
          </IconButton>
          <IconButton aria-label="Ver" onClick={() => onView(row.original.id)}>
            <Eye />
          </IconButton>
          <IconButton aria-label="Eliminar" onClick={() => onDelete(row.original.id)}>
            <Trash />
          </IconButton>
        </ButtonGroup>
      ),
    }),
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Box mt={4}>

      <Stack direction="row" gap={4} mb={4}>
        <Input
          placeholder="Buscar empleado..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Stack>

      <Box overflowX="auto">
        <Table.Root size="md" variant="outline" striped>
          <Table.Header bg="gray.100">
            <Table.Row>
              {table.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers.map((header) => (
                  <Table.ColumnHeader key={header.id} textAlign="left" px={4} py={2}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </Table.ColumnHeader>
                ))
              )}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {table.getRowModel().rows.map((row) => (
              <Table.Row key={row.id} _hover={{ bg: "gray.50" }}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell key={cell.id} px={4} py={3}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </Box>
  );
};
