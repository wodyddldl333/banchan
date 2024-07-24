package com.__105.Banchan.vote.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user_apartment")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class UserApartment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "apartment_code")
    private Apartment apartment;

    @Column(name = "building_no")
    private String buildingNo;

    @Column(name = "unit_no")
    private String unitNumber;
}
