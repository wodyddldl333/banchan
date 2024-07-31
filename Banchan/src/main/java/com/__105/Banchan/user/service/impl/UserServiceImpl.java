package com.__105.Banchan.user.service.impl;

import com.__105.Banchan.auth.dto.SecurityUserDto;
import com.__105.Banchan.auth.jwt.JwtAuthFilter;
import com.__105.Banchan.common.exception.CustomException;
import com.__105.Banchan.common.exception.ErrorCode;
import com.__105.Banchan.user.dto.UserDto;
import com.__105.Banchan.user.dto.UserResponseDto;
import com.__105.Banchan.user.entity.Apartment;
import com.__105.Banchan.user.entity.User;
import com.__105.Banchan.user.entity.UserApartment;
import com.__105.Banchan.user.dto.SignupRequestDto;
import com.__105.Banchan.user.dto.UserAptRequestDto;
import com.__105.Banchan.user.repository.AptRepository;
import com.__105.Banchan.user.repository.UserAptRepository;
import com.__105.Banchan.user.repository.UserRepository;
import com.__105.Banchan.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private static final Logger log = LoggerFactory.getLogger(UserServiceImpl.class);
    private final UserRepository userRepository;
    private final AptRepository aptRepository;
    private final UserAptRepository userAptRepository;

    @Override
    @Transactional(readOnly = true)
    public UserResponseDto getMyInfo(){

        SecurityUserDto userDto = JwtAuthFilter.getUser();
        User user = userRepository.findByEmail(userDto.getEmail())
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        return new UserResponseDto(user);

    }

    @Override
    public User setMyInfo(User user, SignupRequestDto signupRequestDto) {

        User setUser = userRepository.findByUsername(user.getUsername())
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        String phoneNumber = signupRequestDto.getPhone();

        if (userRepository.findByPhone(phoneNumber).isPresent()) {

            log.error("이미 존재하는 전화번호입니다.");

            throw new CustomException(ErrorCode.PHONE_DUPLICATION);

        }

        setUser.changePhone(signupRequestDto.getPhone());

        setUser.changeRealname(signupRequestDto.getRealname());

        userRepository.save(setUser);

        log.info("전화번호, 이름 수정 완료");
        return setUser;
    }

    @Override
    @Transactional(readOnly = true)
    public boolean checkPhone(String phone) {

        // 전화번호로 검색 후 존재 유무를 boolean으로 반환
        Optional<User> entity = userRepository.findByPhone(phone);

        return entity.isPresent(); // 존재하면 true, 존재하지 않으면 false
    }

    @Override
    public UserResponseDto setUserApt(User user, UserAptRequestDto requestDto) {

        Apartment apt = aptRepository.findByCode(requestDto.getAptCode())
                .orElseThrow(() -> new CustomException(ErrorCode.APARTMENT_NOT_FOUND));

        UserApartment setUserApartment = UserApartment.builder()
                .user(user)
                .apartment(apt)
                .buildingNo(requestDto.getBuildingNo())
                .unitNo(requestDto.getUnitNo())
                .isGranted(false)
                .build();

        userAptRepository.save(setUserApartment);
        log.info("아파트 정보 초기 설정 완료");

        // 아파트 정보가 설정된 후 User 객체를 다시 로드하여 UserResponseDto로 변환하여 반환
        // 현재 지연 로딩이기 때문에 동작 수행 후에는 반영이 안된 상태의 Dto가 반환된다.
        // 유저 정보 조회할 때에는 제대로 반영되어 있음
        User updatedUser = userRepository.findById(user.getId())
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        return new UserResponseDto(updatedUser);
    }
}
