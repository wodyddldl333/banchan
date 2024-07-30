package com.__105.Banchan.user.service.impl;

import com.__105.Banchan.auth.dto.SecurityUserDto;
import com.__105.Banchan.auth.jwt.JwtAuthFilter;
import com.__105.Banchan.common.exception.CustomException;
import com.__105.Banchan.common.exception.ErrorCode;
import com.__105.Banchan.user.domain.User;
import com.__105.Banchan.user.repository.UserRepository;
import com.__105.Banchan.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public User getMyInfo(){

        SecurityUserDto userDto = JwtAuthFilter.getUser();

        return userRepository.findByEmail(userDto.getEmail())
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
    }
}
