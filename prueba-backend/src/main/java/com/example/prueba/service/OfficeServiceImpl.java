package com.example.prueba.service;

import com.example.prueba.interfaces.OfficeService;
import com.example.prueba.model.Employee;
import com.example.prueba.model.Office;
import com.example.prueba.repository.EmployeeRepository;
import com.example.prueba.repository.OfficeRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OfficeServiceImpl implements OfficeService {

    private OfficeRepository officeRepository;
    private EmployeeRepository employeeRepository;

    public OfficeServiceImpl(OfficeRepository officeRepository, EmployeeRepository employeeRepository) {
        this.officeRepository = officeRepository;
        this.employeeRepository = employeeRepository;
    }

    @Override
    public Office createOffice(Office request) {
        return officeRepository.save(request);
    }

    @Override
    public Office updateOffice(Long id, Office officeActualizada) {
        Optional <Office> officeOpt= officeRepository.findById(id);
        if (officeOpt.isPresent()) {
            Office officeExists = officeOpt.get();

            officeExists.setName(officeActualizada.getName());
            officeExists.setLocation(officeActualizada.getLocation());


            if (officeActualizada.getEmployees() != null) {
                officeExists.getEmployees().clear();
                officeExists.getEmployees().addAll(officeActualizada.getEmployees());
            }

            return officeRepository.save(officeExists);
        } else {
            throw new EntityNotFoundException("Empleado con ID " + id + " no encontrado.");
        }

    }

    public Office findByName(String name) {
        return officeRepository.findByName(name).orElse(null);
    }

    @Override
    public void deleteOffice(Long id) {
        Optional<Office> officeOpt = officeRepository.findById(id);
        if (officeOpt.isPresent()) {
            Office office = officeOpt.get();
            office.getEmployees().clear();
            officeRepository.save(office);
            officeRepository.deleteById(id);
        } else {
            throw new EntityNotFoundException("Oficina con ID " + id + " no encontrado.");
        }
    }

    @Override
    public List<Office> getAllOffices() {
        return officeRepository.findAll();
    }

    @Override
    public Optional<Office> findOfficeById(Long id) {
        return officeRepository.findById(id);
    }
}
