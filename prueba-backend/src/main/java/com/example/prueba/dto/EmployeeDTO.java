package com.example.prueba.dto;

import lombok.Getter;
import lombok.Setter;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Past;

import java.time.LocalDate;
import java.util.Set;

public class EmployeeDTO {

    @Getter
    @Setter
    public static class EmployeeRequest {
        @NotBlank(message = "El nombre es obligatorio")
        @Size(min = 2, max = 100, message = "El nombre debe tener entre 2 y 100 caracteres")
        private String name;

        @NotBlank(message = "El teléfono es obligatorio")
        @Pattern(regexp = "^[0-9]{9,15}$", message = "El teléfono debe contener entre 9 y 15 dígitos numéricos")
        private String phone;

        @NotBlank(message = "El documento de identidad es obligatorio")
        @Pattern(regexp = "^[A-Z0-9]{5,20}$", message = "El documento de identidad debe tener entre 5 y 20 caracteres alfanuméricos")
        private String nationalId;

        @NotBlank(message = "La dirección es obligatoria")
        @Size(min = 5, max = 200, message = "La dirección debe tener entre 5 y 200 caracteres")
        private String address;

        @NotNull(message = "La fecha de nacimiento es obligatoria")
        @Past(message = "La fecha de nacimiento debe ser en el pasado")
        private LocalDate birthDate;

        private Set<Long> offices;
    }
}