package com.example.prueba.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.example.prueba.model.Employee;
import com.example.prueba.model.Office;
import com.example.prueba.repository.EmployeeRepository;
import com.example.prueba.repository.OfficeRepository;
import com.example.prueba.dto.EmployeeDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.*;

class EmployeeServiceImplTest {

    @Mock
    private EmployeeRepository employeeRepository;

    @Mock
    private OfficeRepository officeRepository;

    @InjectMocks
    private EmployeeServiceImpl employeeService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createEmployee() {
        EmployeeDTO.EmployeeRequest request = new EmployeeDTO.EmployeeRequest();
        request.setName("John Doe");
        request.setPhone("123456");
        request.setNationalId("987654321");
        request.setAddress("Calle 123");
        request.setBirthDate(LocalDate.now()); // Cambiado a LocalDate
        request.setOffices(new HashSet<>(List.of(1L, 2L)));

        Office office1 = new Office(1L, "Oficina A", "Ubicación A", new HashSet<>());
        Office office2 = new Office(2L, "Oficina B", "Ubicación B", new HashSet<>());
        Set<Office> offices = new HashSet<>(List.of(office1, office2));

        when(officeRepository.findAllById(request.getOffices())).thenReturn(new ArrayList<>(offices));

        Employee employee = Employee.builder()
                .name(request.getName())
                .phone(request.getPhone())
                .nationalId(request.getNationalId())
                .address(request.getAddress())
                .birthDate(request.getBirthDate()) // Ahora es LocalDate
                .offices(offices)
                .build();

        when(employeeRepository.save(any(Employee.class))).thenReturn(employee);

        Employee createdEmployee = employeeService.createEmployee(request);

        assertNotNull(createdEmployee);
        assertEquals("John Doe", createdEmployee.getName());
        assertEquals(2, createdEmployee.getOffices().size());
    }

    @Test
    void updateEmployee() {
        Employee existingEmployee = new Employee(1L, "Jane Doe", "654321", "123456789", "Avenida 456", LocalDate.of(1990, 5, 10), new HashSet<>());
        Employee updatedEmployee = new Employee(1L, "Jane Smith", "789456", "111222333", "Avenida 789", LocalDate.of(1995, 7, 15), new HashSet<>());

        when(employeeRepository.findById(1L)).thenReturn(Optional.of(existingEmployee));
        when(employeeRepository.save(any(Employee.class))).thenReturn(updatedEmployee);

        Employee result = employeeService.updateEmployee(1L, updatedEmployee);

        assertNotNull(result);
        assertEquals("Jane Smith", result.getName());
        assertEquals("789456", result.getPhone());
    }

    @Test
    void deleteEmployee() {
        Employee employee = new Employee(1L, "John Doe", "123456", "987654321", "Calle 123", LocalDate.of(1992, 3, 20), new HashSet<>());

        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));
        doNothing().when(employeeRepository).deleteById(1L);

        employeeService.deleteEmployee(1L);

        verify(employeeRepository, times(1)).deleteById(1L);
    }

    @Test
    void getEmployees() {
        Employee employee1 = new Employee(1L, "John Doe", "123456", "987654321", "Calle 123", LocalDate.of(1988, 6, 25), new HashSet<>());
        Employee employee2 = new Employee(2L, "Jane Doe", "654321", "123456789", "Avenida 456", LocalDate.of(1990, 4, 12), new HashSet<>());

        when(employeeRepository.findAll()).thenReturn(List.of(employee1, employee2));

        List<Employee> employees = employeeService.getEmployees();

        assertEquals(2, employees.size());
        assertEquals("John Doe", employees.get(0).getName());
        assertEquals("Jane Doe", employees.get(1).getName());
    }

    @Test
    void getEmployeesById() {
        Employee employee = new Employee(1L, "John Doe", "123456", "987654321", "Calle 123", LocalDate.of(1985, 11, 5), new HashSet<>());

        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));

        Optional<Employee> result = employeeService.getEmployeesById(1L);

        assertTrue(result.isPresent());
        assertEquals("John Doe", result.get().getName());
    }
}
