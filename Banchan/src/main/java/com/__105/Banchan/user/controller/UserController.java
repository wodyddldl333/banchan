package com.__105.Banchan.user.controller;

import com.__105.Banchan.user.domain.User;
import com.__105.Banchan.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@Tag(name = "UserController", description = "유저 관련 API")
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

//    @GetMapping("/me")
//    @Operation(summary = "내 정보 조회", description = "현재 로그인된 사용자의 정보를 반환합니다.")
//    public ResponseEntity<?> getMyInfo(@AuthenticationPrincipal UserDetails userDetails) {
//        String user = userDetails.getUsername();
//        return ResponseEntity.ok().body(user);
//    }

    @GetMapping("/me")
    @Operation(summary = "내 정보 조회", description = "현재 로그인된 사용자의 정보를 반환합니다.")
    public ResponseEntity<User> getMyInfo() {
        User currentUser = userService.getCurrentUser();
        return ResponseEntity.ok(currentUser);
    }
}
