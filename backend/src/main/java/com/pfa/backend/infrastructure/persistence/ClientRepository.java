package com.pfa.backend.infrastructure.persistence;

import com.pfa.backend.domain.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Long> {
}
