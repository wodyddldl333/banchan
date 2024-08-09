package com.__105.Banchan.conference.service;

import com.__105.Banchan.conference.AudioConvertor;
import com.__105.Banchan.conference.entity.ConfRoom;
import com.__105.Banchan.conference.repository.ConfRoomRepository;
import com.google.cloud.speech.v1.RecognitionAudio;
import com.google.cloud.speech.v1.RecognitionConfig;
import com.google.cloud.speech.v1.RecognizeResponse;
import com.google.cloud.speech.v1.SpeechClient;
import com.google.protobuf.ByteString;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@RequiredArgsConstructor
@Slf4j
public class SpeechService {

    private final SpeechClient speechClient;
    private final ConfRoomRepository confRoomRepository;

    @Value("${file.record.path}")
    private String openviduUrl;

    @Transactional
    public String summaryConf(Long roomId) {

        ConfRoom room = confRoomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        if (room.getRecordingPath() == null) {
            throw new RuntimeException("Recording not found");
        }

        // convert to wav
        File audioFile = convertFile(room.getRecordingPath());

        byte[] audioBytes;
        try {
            audioBytes = Files.readAllBytes(audioFile.toPath());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        // 인식할 음성 데이터를 설정합니다.
        RecognitionAudio audio = RecognitionAudio.newBuilder()
                .setContent(ByteString.copyFrom(audioBytes))
                .build();

        // 인식 구성 설정 (여기서는 한국어로 설정)
        RecognitionConfig config = RecognitionConfig.newBuilder()
                .setEncoding(RecognitionConfig.AudioEncoding.LINEAR16)
                .setLanguageCode("ko-KR")
                .setSampleRateHertz(16000)
                .setAudioChannelCount(1) // 오디오 채널 수 설정
                .build();

        // 음성 인식 수행
        RecognizeResponse response = speechClient.recognize(config, audio);

        log.info("STT Response: " + response.toString());

        // 응답 결과에서 텍스트 추출
        StringBuilder transcription = new StringBuilder();
        response.getResultsList().forEach(result ->
                transcription.append(result.getAlternativesList().get(0).getTranscript())
                        .append("\n")
        );

        // 인식된 텍스트를 txt 파일로 저장하는 코드입니당!!
        String transcriptionText = transcription.toString();
        saveTranscriptionToFile(transcriptionText, room.getRecordingPath());

        // 인식된 텍스트 반환
        return transcriptionText;
    }

    private File convertFile(String recordInfo) {

        try {
            // AudioConvertor 인스턴스 생성
            AudioConvertor audioConvertor = new AudioConvertor();
            return audioConvertor.convertFile(recordInfo)
                    .orElseThrow(() -> new RuntimeException("Audio file not found"));

        } catch (Exception e) {
            e.printStackTrace();
            log.error(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    private void saveTranscriptionToFile(String transcriptionText, String rpath) {

        try {
            String recordingPath = openviduUrl + rpath;
            String fileName = rpath + ".txt";
            Path path = Paths.get(recordingPath, fileName);
            Files.write(path, transcriptionText.getBytes());
            System.out.println("Transcription saved to file: " + path.toString());
        } catch (IOException e) {
            throw new RuntimeException("Error saving transcription to file", e);
        }
    }
}