package com.example.prueba.configuration;

import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.OpenAPI;

@Configuration
public class OpenAPIConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("API de Gestión de Empleados y Oficinas")
                        .description("Documentación de las APIs de EmployeeService y OfficeService.")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Axel")
                                .email("axeljhosmell13@gmail.com")
                        )
                );
    }
}