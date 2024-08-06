package com.__105.Banchan.conference.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
@Table(name = "conf_room")
public class ConfRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "conf_room_id")
    private Long id;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "host_id", nullable = false)
//    private User user;

    @Column(name = "room_name", nullable = false)
    private String roomName;

    @Column(name = "start_date", nullable = false)
    private String startDate;

    @Column(name = "start_time", nullable = false)
    private String startTime;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "session")
    private String session;

    // 회의 활성화 시 발급된 세션을 저장하면서 1로 수정
    @Column(name = "is_active", columnDefinition = "TINYINT(1) default 0")
    private boolean isActive;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
