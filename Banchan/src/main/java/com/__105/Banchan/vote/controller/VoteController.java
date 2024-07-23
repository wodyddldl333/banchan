package com.__105.Banchan.vote.controller;


import com.__105.Banchan.vote.Dto.*;
import com.__105.Banchan.vote.service.VoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/votes")
@RequiredArgsConstructor
public class VoteController {

    private final VoteService voteService;

    @PostMapping("/create/{userId}")
    public ResponseEntity<?> create(@RequestBody VoteRequestDto voteRequestDto, @PathVariable Long userId) {
        voteService.createVote(voteRequestDto, userId);
        return ResponseEntity.ok().build();
    }

    // 투표 상세 조회
    @GetMapping("/detail/{voteId}")
    public ResponseEntity<?> detail(@PathVariable Long voteId) {
        VoteResponseDto voteResponseDto = voteService.getVoteWithDetails(voteId);
        return ResponseEntity.ok().body(voteResponseDto);
    }

    // 현재 진행 중인 투표 목록 조회
    @GetMapping("/list/current/{userId}")
    public ResponseEntity<?> listCurrent(@PathVariable Long userId) {
        List<VoteListResponseDto> votes = voteService.getCurrentVoteList(userId);
        return ResponseEntity.ok().body(votes);
    }

    // 투표 완료된 투표 목록 조회
    @GetMapping("/list/finished/{userId}")
    public ResponseEntity<?> listFinished(@PathVariable Long userId) {
        List<VoteListResponseDto> votes = voteService.getlistFinished(userId);
        return ResponseEntity.ok().body(votes);
    }

    // 투표 결과 조회
    @GetMapping("/result/{voteId}")
    public ResponseEntity<?> result(@PathVariable Long voteId) {
        VoteResultDto result = voteService.getResult(voteId);
        return ResponseEntity.ok().body(result);
    }

    // 투표 하기
    @PostMapping("/vote")
    public ResponseEntity<?> vote(@RequestBody DoVoteRequestDto voteRequestDto) {
        voteService.vote(voteRequestDto);
        return ResponseEntity.ok().build();
    }
}
