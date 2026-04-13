package com.pfa.backend.infrastructure.persistence;

import com.pfa.backend.domain.model.JobOffer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobOfferRepository extends JpaRepository<JobOffer, Long> {
}
