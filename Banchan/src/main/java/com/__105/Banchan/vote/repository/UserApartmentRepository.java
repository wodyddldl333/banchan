package com.__105.Banchan.vote.repository;

import com.__105.Banchan.user.domain.UserApartment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserApartmentRepository extends JpaRepository<UserApartment, String> {
}
