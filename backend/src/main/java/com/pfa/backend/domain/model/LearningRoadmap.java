package com.pfa.backend.domain.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.time.Instant;

@Entity
@Table(name = "learning_roadmaps")
public class LearningRoadmap extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    @Column(name = "content_json", columnDefinition = "jsonb")
    private String contentJson;

    @Column(name = "created_at", nullable = false, insertable = false, updatable = false)
    private Instant createdAt;

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public String getContentJson() {
        return contentJson;
    }

    public void setContentJson(String contentJson) {
        this.contentJson = contentJson;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}
