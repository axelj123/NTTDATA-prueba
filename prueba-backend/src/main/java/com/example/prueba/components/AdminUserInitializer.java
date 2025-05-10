package com.example.prueba.components;


import com.example.prueba.model.Office;
import com.example.prueba.service.OfficeServiceImpl;
import com.example.prueba.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
@Component
public class AdminUserInitializer implements CommandLineRunner {

    private final UserService userService;
    private final OfficeServiceImpl officeService;

    public AdminUserInitializer(UserService userService, OfficeServiceImpl officeService) {
        this.userService = userService;
        this.officeService = officeService;
    }

    @Override
    public void run(String... args) throws Exception {
        String email = "admin@example.com";
        String password = "admin123";

        try {
            userService.registerUser(email, password, "ADMIN");
            System.out.println("✅ Usuario administrador creado con éxito.");
        } catch (RuntimeException e) {
            System.out.println("⚠️ Usuario administrador ya existe, no se crea nuevamente.");
        }

        createOfficesIfNotExist("Oficina A", "Ubicación A");
        createOfficesIfNotExist("Oficina B", "Ubicación B");
        createOfficesIfNotExist("Oficina C", "Ubicación C");
        createOfficesIfNotExist("Oficina Lima", "Lima, Perú");
        createOfficesIfNotExist("Oficina Cusco", "Cusco, Perú");
        createOfficesIfNotExist("Oficina Arequipa", "Arequipa, Perú");
        createOfficesIfNotExist("Oficina Trujillo", "Trujillo, Perú");
        createOfficesIfNotExist("Oficina Piura", "Piura, Perú");
        createOfficesIfNotExist("Oficina Iquitos", "Iquitos, Perú");
    }

    private void createOfficesIfNotExist(String name, String location) {
        if (officeService.findByName(name) == null) {
            Office office = new Office();
            office.setName(name);
            office.setLocation(location);
            officeService.createOffice(office);
            System.out.println("✅ Oficina " + name + " creada con éxito.");
        } else {
            System.out.println("⚠️ La oficina " + name + " ya existe.");
        }
    }
}
