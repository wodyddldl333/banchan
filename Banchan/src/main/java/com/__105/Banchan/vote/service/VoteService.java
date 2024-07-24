package com.__105.Banchan.vote.service;

import com.__105.Banchan.vote.Dto.*;

import java.util.List;

public interface VoteService {

    void createVote(VoteRequestDto voteRequestDto, Long userId);

    VoteResponseDto getVoteWithDetails(Long voteId);

    List<VoteListResponseDto> getCurrentVoteList(Long userId);

    List<VoteListResponseDto> getlistFinished(Long userId);

    void vote(DoVoteRequestDto doVoteRequestDto);

    VoteResultDto getResult(Long voteId);
}
