package com.example.prueba.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.example.prueba.model.Office;
import com.example.prueba.repository.OfficeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

class OfficeServiceImplTest {

    @Mock
    private OfficeRepository officeRepository;

    @InjectMocks
    private OfficeServiceImpl officeService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createOffice() {
        Office newOffice = new Office(1L, "Oficina A", "Ubicación A", null);

        when(officeRepository.save(any(Office.class))).thenReturn(newOffice);

        Office createdOffice = officeService.createOffice(newOffice);

        assertNotNull(createdOffice);
        assertEquals("Oficina A", createdOffice.getName());
        assertEquals("Ubicación A", createdOffice.getLocation());
    }

    @Test
    void updateOffice() {
        Office existingOffice = new Office(1L, "Oficina A", "Ubicación A", null);
        Office updatedOffice = new Office(1L, "Oficina B", "Ubicación B", null);

        when(officeRepository.findById(1L)).thenReturn(Optional.of(existingOffice));
        when(officeRepository.save(any(Office.class))).thenReturn(updatedOffice);

        Office result = officeService.updateOffice(1L, updatedOffice);

        assertNotNull(result);
        assertEquals("Oficina B", result.getName());
        assertEquals("Ubicación B", result.getLocation());
    }

    @Test
    void deleteOffice() {
        Office office = new Office(1L, "Oficina A", "Ubicación A", new HashSet<>());

        when(officeRepository.findById(1L)).thenReturn(Optional.of(office));
        doNothing().when(officeRepository).deleteById(1L);

        officeService.deleteOffice(1L);

        verify(officeRepository, times(1)).deleteById(1L);
    }


    @Test
    void getAllOffices() {
        Office office1 = new Office(1L, "Oficina A", "Ubicación A", null);
        Office office2 = new Office(2L, "Oficina B", "Ubicación B", null);

        when(officeRepository.findAll()).thenReturn(List.of(office1, office2));

        List<Office> offices = officeService.getAllOffices();

        assertEquals(2, offices.size());
        assertEquals("Oficina A", offices.get(0).getName());
        assertEquals("Oficina B", offices.get(1).getName());
    }

    @Test
    void findOfficeById() {
        Office office = new Office(1L, "Oficina A", "Ubicación A", null);

        when(officeRepository.findById(1L)).thenReturn(Optional.of(office));

        Optional<Office> result = officeService.findOfficeById(1L);

        assertTrue(result.isPresent());
        assertEquals("Oficina A", result.get().getName());
    }
}
