package com.__105.Banchan.redis.service;

import com.__105.Banchan.auth.dto.otp.OtpRequestDto;
import com.__105.Banchan.auth.dto.otp.OtpResponseDto;
import com.__105.Banchan.auth.dto.otp.OtpValidateRequestDto;

public interface OtpService {
    OtpResponseDto generateOtp(OtpRequestDto requestDto);
    OtpResponseDto validateOtp(OtpValidateRequestDto requestDto, String otp);
}
