package com.__105.Banchan.vote.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "apt")
public class Apartment {

    @Id
    private String code;

    @Column(name = "apartment_name", nullable = false)
    private String apartmentName;

    @Column(name = "addr", nullable = false)
    private String addr;

    @Column(name = "total_units")
    private int totalUnits;
}
