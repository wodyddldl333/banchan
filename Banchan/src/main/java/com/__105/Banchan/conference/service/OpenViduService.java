package com.__105.Banchan.conference.service;

import com.__105.Banchan.conference.dto.ConfRequest;
import com.__105.Banchan.conference.dto.ConfRoomResponse;
import com.__105.Banchan.conference.entity.ConfRoom;
import com.__105.Banchan.conference.repository.ConfRoomRepository;
import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OpenViduService {

    private final ConfRoomRepository confRoomRepository;
    private final OpenVidu openVidu;

    public String createSession(Long id) throws OpenViduJavaClientException, OpenViduHttpException {

        SessionProperties properties = new SessionProperties.Builder().build();
        Session session = openVidu.createSession(properties);
        ConfRoom room = confRoomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("not fount ConfRoom"));

        if (room.getSession() != null) throw new RuntimeException("Session already exist");

        room = room.toBuilder()
                .session(session.getSessionId())
                .isActive(true)
                .build();

        confRoomRepository.save(room);

        return session.getSessionId();
    }

    public String createToken(String sessionId) throws OpenViduJavaClientException, OpenViduHttpException {

        ConfRoom room = confRoomRepository.findBySession(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        Session session = openVidu.getActiveSessions().stream()
                .filter(s -> s.getSessionId().equals(sessionId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Session invalid"));

        ConnectionProperties properties = new ConnectionProperties.Builder()
                .type(ConnectionType.WEBRTC)
                .build();

        return session.createConnection(properties).getToken();
    }

    public void createRoom(ConfRequest request) {

        ConfRoom confRoom = ConfRoom.builder()
                .roomName(request.getRoomName())
                .startDate(request.getStartDate())
                .startTime(request.getStartTime())
                .build();

        confRoomRepository.save(confRoom);
    }

    public List<ConfRoomResponse> getRooms() {

        List<ConfRoom> confRooms = confRoomRepository.findAll();

        return confRooms.stream().map(confRoom -> {
            ConfRoomResponse confRoomResponse = new ConfRoomResponse();
            confRoomResponse.setId(confRoom.getId());
            confRoomResponse.setRoomName(confRoom.getRoomName());
            confRoomResponse.setSession(confRoom.getSession());
            confRoomResponse.setStartDate(confRoom.getStartDate());
            confRoomResponse.setStartTime(confRoom.getStartTime());
            confRoomResponse.setActive(confRoom.isActive());
            return confRoomResponse;
        }).collect(Collectors.toList());
    }

    public void deleteSession(String sessionId) throws OpenViduJavaClientException, OpenViduHttpException {

        ConfRoom room = confRoomRepository.findBySession(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        Session session = openVidu.getActiveSessions().stream()
                .filter(s -> s.getSessionId().equals(sessionId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Session invalid"));

        session.close();

        room = room.toBuilder()
                .isActive(false)
                .build();

        confRoomRepository.save(room);
    }

    public void deleteRoom(Long roomId) {

        ConfRoom room = confRoomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        confRoomRepository.delete(room);
    }
}
