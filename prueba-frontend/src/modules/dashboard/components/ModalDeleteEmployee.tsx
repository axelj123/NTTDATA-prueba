"use client";

import { Button, CloseButton, Dialog, Portal, Text } from "@chakra-ui/react";

interface ModalDeleteEmployeeProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  employeeName: string;
}

const ModalDeleteEmployee = ({ isOpen, onClose, onConfirm, employeeName }: ModalDeleteEmployeeProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose} size="sm" placement="center" motionPreset="scale">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Eliminar Empleado</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body>
              <Text>¿Estás seguro de que deseas eliminar a <strong>{employeeName}</strong>?</Text>
              <Text color="red.500" mt={2}>Esta acción no se puede deshacer.</Text>
            </Dialog.Body>
            <Dialog.Footer>
              <Button variant="outline" onClick={onClose}>Cancelar</Button>
              <Button colorScheme="red" onClick={onConfirm}>Eliminar</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default ModalDeleteEmployee;
