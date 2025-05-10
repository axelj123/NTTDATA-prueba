package com.example.prueba.controller;


import com.example.prueba.model.Office;
import com.example.prueba.service.OfficeServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/office")
@Tag(name = "Office API", description = "Operaciones CRUD para la gestión de oficinas")
public class OfficeController {

    @Autowired
    private OfficeServiceImpl officeService;

    @GetMapping
    @Operation(summary = "Obtener todas las oficinas", description = "Recupera la lista completa de oficinas registradas en el sistema")
    public List<Office> getOffices() {
        return officeService.getAllOffices();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar oficina por ID", description = "Obtiene la información de una oficina específica mediante su ID")
    public ResponseEntity<Office> getOfficeById(@PathVariable Long id) {
        return officeService.findOfficeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Crear una nueva oficina", description = "Registra una nueva oficina en el sistema")
    public ResponseEntity<Office> createOffice(@RequestBody Office officeRequest) {
        return ResponseEntity.ok(officeService.createOffice(officeRequest));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar una oficina", description = "Modifica los datos de una oficina existente mediante su ID")
    public ResponseEntity<Office> updateOffice(@PathVariable Long id, @RequestBody Office officeRequest) {
        return ResponseEntity.ok(officeService.updateOffice(id, officeRequest));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar una oficina", description = "Elimina una oficina por su ID")
    public ResponseEntity<Void> deleteOffice(@PathVariable Long id) {
        officeService.deleteOffice(id);
        return ResponseEntity.noContent().build();
    }
}
