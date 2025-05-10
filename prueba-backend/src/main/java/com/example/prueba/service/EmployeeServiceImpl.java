package com.example.prueba.service;


import com.example.prueba.dto.EmployeeDTO;
import com.example.prueba.interfaces.EmployeeService;
import com.example.prueba.model.Employee;
import com.example.prueba.model.Office;
import com.example.prueba.repository.EmployeeRepository;
import com.example.prueba.repository.OfficeRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final OfficeRepository officeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository, OfficeRepository officeRepository) {
        this.employeeRepository = employeeRepository;
        this.officeRepository = officeRepository;
    }


    @Override
    public Employee createEmployee(EmployeeDTO.EmployeeRequest request) {
        Set<Office> offices = new HashSet<>();

        if (request.getOffices() != null && !request.getOffices().isEmpty()) {
            offices = new HashSet<>(officeRepository.findAllById(request.getOffices()));
        }

        Employee employee = Employee.builder()
                .name(request.getName())
                .phone(request.getPhone())
                .nationalId(request.getNationalId())
                .address(request.getAddress())
                .birthDate(request.getBirthDate())
                .offices(offices)
                .build();

        return employeeRepository.save(employee);
    }

    @Override
    public Employee updateEmployee(Long id, EmployeeDTO.EmployeeRequest employeeActualizado) {
        Optional<Employee> empleadoOpt = employeeRepository.findById(id);
        if (empleadoOpt.isPresent()) {
            Employee employeeExistente = empleadoOpt.get();

            employeeExistente.setName(employeeActualizado.getName());
            employeeExistente.setPhone(employeeActualizado.getPhone());
            employeeExistente.setNationalId(employeeActualizado.getNationalId());
            employeeExistente.setAddress(employeeActualizado.getAddress());
            employeeExistente.setBirthDate(employeeActualizado.getBirthDate());

            if (employeeActualizado.getOffices() != null) {
                Set<Office> oficinas = new HashSet<>(officeRepository.findAllById(employeeActualizado.getOffices()));
                employeeExistente.getOffices().clear();
                employeeExistente.getOffices().addAll(oficinas);
            }

            return employeeRepository.save(employeeExistente);
        } else {
            throw new EntityNotFoundException("Empleado con ID " + id + " no encontrado.");
        }
    }

    @Override
    public void deleteEmployee(Long id) {
        Optional<Employee> empleadoOpt = employeeRepository.findById(id);
        if (empleadoOpt.isPresent()) {
            Employee employee = empleadoOpt.get();
            employee.getOffices().clear();
            employeeRepository.save(employee);
            employeeRepository.deleteById(id);
        } else {
            throw new EntityNotFoundException("Empleado con ID " + id + " no encontrado.");
        }
    }

    @Override
    public List<Employee> getEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public Optional<Employee>getEmployeesById (Long id) {
        return employeeRepository.findById(id);
    }
}
