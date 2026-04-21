package com.pfa.backend.infrastructure.persistence;

import com.pfa.backend.domain.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Long> {
}
