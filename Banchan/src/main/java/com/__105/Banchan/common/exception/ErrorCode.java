package com.__105.Banchan.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    USER_NOT_FOUND(404, "U001", "회원정보를 찾을 수 없습니다."),
    DUPLICATE_EMAIL(400, "U002", "이미 존재하는 이메일 입니다."),
    DUPLICATE_NICKNAME(400, "U003", "이미 존재하는 별명입니다."),
    DUPLICATE_ID(400, "U004", "이미 존재하는 아이디입니다."),
    INVALID_PARAMETER(400, "U005", "잘못된 요청입니다."),
    POST_NOT_FOUND(404, "U006", "게시글이 존재하지 않습니다."),

    // 카카오 로그인 관련 에러 코드
    KAKAO_TOKEN_PARSING_FAILED(500, "K001", "카카오 액세스 토큰 또는 사용자 정보 파싱 실패"),
    KAKAO_TOKEN_REQUEST_FAILED(500, "K002", "카카오 액세스 토큰 요청 실패"),
    KAKAO_USER_INFO_REQUEST_FAILED(500, "K003", "카카오 사용자 정보 요청 실패"),
    KAKAO_USER_INFO_NOT_FOUND(400, "K004", "카카오 사용자 정보를 가져오는 데 실패했습니다."),
    KAKAO_USER_INFO_PARSING_FAILED(500, "K005", "카카오 사용자 정보 파싱 실패"),
    LOGIN_OR_REGISTER_FAILED(500, "K006", "회원가입 또는 로그인 처리 중 오류 발생");


    private final int status;
    private final String code;
    private final String message;
}
