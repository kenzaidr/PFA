package com.pfa.backend.infrastructure.persistence;

import com.pfa.backend.domain.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
}
