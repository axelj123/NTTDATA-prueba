package com.example.prueba.interfaces;


import com.example.prueba.model.Employee;
import com.example.prueba.model.Office;

import java.util.List;
import java.util.Optional;

public interface OfficeService {

    Office createOffice(Office request);

    Office updateOffice(Long id, Office updatedOffice);

    void deleteOffice(Long id);

    List<Office> getAllOffices();

    Optional<Office> findOfficeById(Long id);
}
