"use client";

import type { Office } from "@/types/Office";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";

interface ModalOfficesProps {
  isOpen: boolean;
  onClose: () => void;
  employeeName?: string; 
  employeeOffices: Office[] | null;
}

const ModalOffices = ({ isOpen, onClose, employeeName, employeeOffices }: ModalOfficesProps) => {

  
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose} size="md" placement="center" motionPreset="slide-in-bottom">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Oficinas de {employeeName || "Empleado"}</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body>
              {employeeOffices && employeeOffices.length > 0 ? (
                <ul style={{ listStyleType: "none", padding: 0 }}>
                  {employeeOffices.map((oficina) => (
                    <li key={oficina.id} style={{ marginBottom: "8px" }}>
                      <strong>{oficina.name}</strong> - {oficina.location}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Este empleado no tiene oficinas asignadas o trabaja remoto.</p>
              )}
            </Dialog.Body>
            <Dialog.Footer>
              <Button variant="outline" onClick={onClose}>Cerrar</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default ModalOffices;
