package com.__105.Banchan.conference.repository;

import com.__105.Banchan.conference.entity.ConfRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ConfRoomRepository extends JpaRepository<ConfRoom, Long> {

    Optional<ConfRoom> findBySession(String sessionId);
}
