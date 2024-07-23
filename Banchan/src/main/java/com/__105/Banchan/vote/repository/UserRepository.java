package com.__105.Banchan.vote.repository;

import com.__105.Banchan.vote.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * 특정 사용자의 아파트 코드와 동일한 아파트에 거주하는 다른 사용자들을 조회합니다.
     *
     * @param userId 조회할 사용자의 ID
     * @return 동일한 아파트에 거주하는 다른 사용자들의 목록
     */
    @Query("SELECT ua2.user FROM UserApartment ua1 " +
            "JOIN UserApartment ua2 ON ua1.apartment.code = ua2.apartment.code " +
            "WHERE ua1.user.id = :userId AND ua2.user.id != :userId")
    List<User> findUsersInSameApartment(@Param("userId") Long userId);
}
