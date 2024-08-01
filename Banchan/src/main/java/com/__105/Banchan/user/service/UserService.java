package com.__105.Banchan.user.service;

import com.__105.Banchan.user.dto.UserDto;
import com.__105.Banchan.user.dto.UserResponseDto;
import com.__105.Banchan.user.entity.User;
import com.__105.Banchan.user.dto.SignupRequestDto;
import com.__105.Banchan.user.dto.UserAptRequestDto;

public interface UserService {
    UserResponseDto getMyInfo();

    boolean checkPhone(String phone);

    User  setMyInfo(User user, SignupRequestDto signupRequestDto);

    UserResponseDto setUserApt(User user, UserAptRequestDto requestDto);
}
