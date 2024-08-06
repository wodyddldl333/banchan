package com.__105.Banchan.conference.controller;

import com.__105.Banchan.conference.dto.ConfRequest;
import com.__105.Banchan.conference.dto.ConfRoomResponse;
import com.__105.Banchan.conference.dto.DataResponse;
import com.__105.Banchan.conference.service.OpenViduService;
import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/session")
@RequiredArgsConstructor
public class OpenViduController {

    private final OpenVidu openVidu;
    private final OpenViduService openViduService;
    private final Map<String, Session> sessions = new HashMap<>();

    @PostMapping("/{roomId}")
    public ResponseEntity<?> createSession(@PathVariable Long roomId) {

        try {
            return ResponseEntity.ok().body(openViduService.createSession(roomId));
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            throw new RuntimeException(e);
        }
    }

    // 세션 아이디로 받아서 토큰 발급
    @PostMapping("{sessionId}/token")
    public ResponseEntity<?> createToken(@PathVariable String sessionId) {

        try {
            return ResponseEntity.ok().body(openViduService.createToken(sessionId));
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            throw new RuntimeException(e);
        }
    }

    // 방 생성
    // Request : roomName(String), startDate(String), startTime(String)
    @PostMapping("/createRoom")
    public ResponseEntity<?> createRoom(@RequestBody ConfRequest request) {

        openViduService.createRoom(request);
        return ResponseEntity.ok().body("successfully created room");
    }

    // 방 목록 조회
    // response : id(Long), roomName(String), 등등 있슴돠
    @GetMapping("/get/roomList")
    public ResponseEntity<?> getRoomList() {

        List<ConfRoomResponse> rooms = openViduService.getRooms();
        return ResponseEntity.ok().body(new DataResponse(rooms));
    }

    @DeleteMapping("/delete/{sessionId}")
    public ResponseEntity<?> deleteRoom(@PathVariable String sessionId) {

        try {
            openViduService.deleteSession(sessionId);
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            throw new RuntimeException(e);
        }

        return ResponseEntity.ok().body("successfully deleted room");
    }

    @DeleteMapping("/delete/room/{roomId}")
    public ResponseEntity<?> deleteRoom(@PathVariable Long roomId) {

        openViduService.deleteRoom(roomId);
        return ResponseEntity.ok().body("successfully deleted room");
    }

    @PostMapping("/{sessionId}/startRecording")
    public ResponseEntity<?> startRecording(@PathVariable String sessionId) {
        try {
            // RecordingProperties 설정
            RecordingProperties properties = new RecordingProperties.Builder()
                    .name("recording_" + sessionId) // 녹화 파일의 이름
                    .outputMode(Recording.OutputMode.COMPOSED) // 합성된 출력 모드
                    .hasAudio(true) // 오디오 녹음 활성화
                    .hasVideo(true) // 비디오 녹화 활성화
                    .build();

            // 녹화 시작
            Recording recording = openVidu.startRecording(sessionId, properties);
            return ResponseEntity.ok().body(recording);
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/{recordingId}/stopRecording")
    public ResponseEntity<?> stopRecording(@PathVariable String recordingId) {
        try {
            // 녹화 중지
            Recording recording = openVidu.stopRecording(recordingId);
            return ResponseEntity.ok().body(recording);
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            throw new RuntimeException(e);
        }
    }
}
