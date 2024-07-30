package com.__105.Banchan.vote.repository;

import com.__105.Banchan.vote.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    Boolean existsByUsername(String username);

    User findByUsername(String username);

    @Query("SELECT ua2.user FROM UserApartment ua1 " +
            "JOIN UserApartment ua2 ON ua1.apartment.code = ua2.apartment.code " +
            "WHERE ua1.user.id = :userId AND ua2.user.id != :userId")
    List<User> findUsersInSameApartment(@Param("userId") Long userId);
}
