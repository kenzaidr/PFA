package com.pfa.backend.domain.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(
    name = "applications",
    uniqueConstraints = @UniqueConstraint(columnNames = {"job_offer_id", "client_id"})
)
public class Application extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_offer_id", nullable = false)
    private JobOffer jobOffer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;

    @Column(name = "matching_score", precision = 5, scale = 2)
    private BigDecimal matchingScore;

    @Column(length = 50)
    private String status = "PENDING";

    @Column(name = "applied_at", nullable = false, insertable = false, updatable = false)
    private Instant appliedAt;

    public JobOffer getJobOffer() {
        return jobOffer;
    }

    public void setJobOffer(JobOffer jobOffer) {
        this.jobOffer = jobOffer;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public BigDecimal getMatchingScore() {
        return matchingScore;
    }

    public void setMatchingScore(BigDecimal matchingScore) {
        this.matchingScore = matchingScore;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Instant getAppliedAt() {
        return appliedAt;
    }
}
