package com.__105.Banchan.conference.service;

import com.__105.Banchan.conference.config.ChatGptConfig;
import com.__105.Banchan.conference.dto.ChatGptRequestDto;
import com.__105.Banchan.conference.dto.ChatGptResponseDto;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;

@Service
public class ChatGptService {

    private static final RestTemplate restTemplate = new RestTemplate();

    public HttpEntity<ChatGptRequestDto> buildHttpEntity(ChatGptRequestDto requestDto) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType(ChatGptConfig.MEDIA_TYPE));
        headers.add(ChatGptConfig.AUTHORIZATION, ChatGptConfig.BEARER + ChatGptConfig.API_KEY);
        return new HttpEntity<>(requestDto, headers);
    }

    public ChatGptResponseDto getResponse(HttpEntity<ChatGptRequestDto> chatGptRequestDtoHttpEntity) {
        ResponseEntity<ChatGptResponseDto> responseEntity = restTemplate.postForEntity(
                ChatGptConfig.URL,
                chatGptRequestDtoHttpEntity,
                ChatGptResponseDto.class);

        return responseEntity.getBody();
    }

    public ChatGptResponseDto askQuestion(String text) {
        ChatGptRequestDto.Message systemMessage = new ChatGptRequestDto.Message("system", "You are a helpful assistant.");
        String prompt = String.format("다음은 아파트 반상회의 회의 내용입니다.\n" +
                        "회의 내용:\n%s" +
                        " \n주어진 회의 내용을 아래의 양식에 맞춰서 요약해 주세요:\n\n" +
                        "반상회 회의 요약\n\n" +
                        "1. 주차문제\n" +
                        "    a. \n" +
                        "    b. \n\n" +
                        "2. 층간 소음 문제\n" +
                        "    a. \n" +
                        "    b. \n" +
                        "    c. \n\n" +
                        "3. 주민 행사\n" +
                        "    a. \n" +
                        "    b. \n" +
                        "    c. \n\n",
                text);
        ChatGptRequestDto.Message userMessage = new ChatGptRequestDto.Message("user", prompt);

        ChatGptRequestDto request = new ChatGptRequestDto(
                ChatGptConfig.MODEL,
                Arrays.asList(systemMessage, userMessage),
                ChatGptConfig.MAX_TOKEN,
                ChatGptConfig.TEMPERATURE,
                ChatGptConfig.TOP_P
        );

        return this.getResponse(this.buildHttpEntity(request));
    }
}