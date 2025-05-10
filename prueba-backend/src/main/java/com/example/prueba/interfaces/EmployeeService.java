package com.example.prueba.interfaces;


import com.example.prueba.dto.EmployeeDTO;
import com.example.prueba.model.Employee;

import java.util.List;
import java.util.Optional;

public interface EmployeeService {
    Employee createEmployee(EmployeeDTO.EmployeeRequest request);


    Employee updateEmployee(Long id, EmployeeDTO.EmployeeRequest request);
    void deleteEmployee(Long id);
    List<Employee> getEmployees();
    Optional<Employee> getEmployeesById(Long id);
}