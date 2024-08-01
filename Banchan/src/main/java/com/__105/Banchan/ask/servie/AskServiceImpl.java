package com.__105.Banchan.ask.servie;

import com.__105.Banchan.ask.dto.*;
import com.__105.Banchan.ask.entity.*;
import com.__105.Banchan.ask.repository.*;
import com.__105.Banchan.notice.dto.SearchCondition;
import com.__105.Banchan.user.entity.Apartment;
import com.__105.Banchan.user.entity.User;
import com.__105.Banchan.user.entity.UserApartment;
import com.__105.Banchan.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class AskServiceImpl implements AskService {

    private final AskRepository askRepository;
    private final AskCommentRepository askCommentRepository;
    private final UserRepository userRepository;
    private final AskLikeRepository askLikeRepository;
    private final AskImageRepository askImageRepository;

    @Override
    public void registAsk(AskPostRequest requestDto, String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("user not fount"));

        Set<UserApartment> ua = user.getUserApartments();

        if (ua.isEmpty()) {
            throw new RuntimeException("User has no Apartment");
        }

        Apartment apt = ua.stream()
                .findFirst()
                .orElse(null)
                .getApartment();

        Ask ask = Ask.builder()
                .user(user)
                .apt(apt)
                .title(requestDto.getTitle())
                .content(requestDto.getContent())
                .build();

        askRepository.save(ask);
    }

    @Override
    public AskDetailResponse detailAsk(Long askId, String username, boolean isAdmin, boolean isViewed) {

        Ask ask = askRepository.findById(askId)
                .orElseThrow(() -> new RuntimeException("ask not found"));

        if (!isViewed) {
            ask.updateViews();
        }

        AskDetailResponse responseDto = AskDetailResponse.builder()
                .id(askId)
                .username(ask.getUser().getUsername())
                .apt(ask.getApt())
                .title(ask.getTitle())
                .content(ask.getContent())
                .createdAt(ask.getCreatedAt())
                .views(ask.getViews())
                .isAdmin(isAdmin)
                .isWriter(ask.getUser().getUsername().equals(username))
                .build();

        return responseDto;
    }

    @Override
    public void deleteAsk(Long askId, boolean isAdmin, String username) {

        Ask ask = askRepository.findById(askId)
                .orElseThrow(() -> new RuntimeException("ask not found"));

        if (!ask.getUser().getUsername().equals(username) && !isAdmin) {
            throw new RuntimeException("Unable to delete because you are not the author or administrator");
        }

        List<AskImage> images = askImageRepository.findAllByAsk(ask);
        List<AskComment> comments = askCommentRepository.findAllByAsk(ask);
        List<AskLike> likes = askLikeRepository.findAll();

        if (!images.isEmpty()) askImageRepository.deleteAll(images);
        if (!comments.isEmpty()) askCommentRepository.deleteAll(comments);
        if (!likes.isEmpty()) askLikeRepository.deleteAll(likes);

        askRepository.delete(ask);
    }

    @Override
    public void updateAsk(Long askId, AskPostRequest requestDto, boolean isAdmin, String username) {

        Ask ask = askRepository.findById(askId)
                .orElseThrow(() -> new RuntimeException("ask not found"));

        if (!ask.getUser().getUsername().equals(username) && !isAdmin) {
            throw new RuntimeException("Unable to update because you are not the author or administrator");
        }

        ask = ask.toBuilder()
                .title(requestDto.getTitle())
                .content(requestDto.getContent())
                .build();

        askRepository.save(ask);
    }

    @Override
    public Page<AskListResponse> getListAsk(SearchCondition searchCondition, String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("user not fount"));

        Set<UserApartment> ua = user.getUserApartments();

        if (ua.isEmpty()) {
            throw new RuntimeException("User has no Apartment");
        }

        String aptCode = ua.stream()
                .findFirst()
                .orElse(null)
                .getApartment().getCode();

        Specification<Ask> spec = Specification.where(null);
        spec = spec.and(AskSpecification.whereApt(aptCode));

        if (searchCondition.getKeyword() != null && !searchCondition.getKeyword().isEmpty()) {
            spec = spec.and(AskSpecification.containsKeyword(searchCondition.getKeyword()));
        }

        Sort sort = Sort.by(Sort.Direction.fromString(searchCondition.getSortDirection()), searchCondition.getSortBy());
        Pageable pageable = PageRequest.of(searchCondition.getPage(), searchCondition.getSize(), sort);

        Page<Ask> askPage = askRepository.findAll(spec, pageable);

        List<AskListResponse> askList = askPage.getContent().stream().map(ask ->
                AskListResponse.builder()
                        .id(ask.getId())
                        .title(ask.getTitle())
                        .content(ask.getContent())
                        .username(ask.getUser().getUsername())
                        .createdAt(ask.getCreatedAt())
                        .build()
        ).collect(Collectors.toList());

        return new PageImpl<>(askList, pageable, askPage.getTotalElements());
    }

    @Override
    public void registAskComment(Long askId, AskCommentRequest requestDto, String username) {

        Ask ask = askRepository.findById(askId)
                .orElseThrow(() -> new RuntimeException("ask not found"));

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("user not fount"));

        AskComment askComment = AskComment.builder()
                .ask(ask)
                .user(user)
                .content(requestDto.getContent())
                .build();

        askCommentRepository.save(askComment);
    }

    @Override
    public List<AskCommentResponse> getListAskComment(Long askId, String username, boolean isAdmin) {
        Ask ask = askRepository.findById(askId)
                .orElseThrow(() -> new RuntimeException("ask not found"));

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("user not fount"));

        List<AskComment> comments = askCommentRepository.findAllByAsk(ask);

        return comments.stream().map(comment -> {
            AskCommentResponse commentResponse = new AskCommentResponse();
            commentResponse.setId(comment.getId());
            commentResponse.setUsername(comment.getUser().getUsername());
            commentResponse.setContent(comment.getContent());
            commentResponse.setCreatedAt(comment.getCreatedAt());
            commentResponse.setAdmin(isAdmin);
            commentResponse.setWriter(comment.getUser().getUsername().equals(username));
            return commentResponse;
        }).collect(Collectors.toList());
    }

    @Override
    public void deleteAskComment(Long commentId, boolean isAdmin, String username) {
        AskComment askComment = askCommentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("askComment not found"));

        if (!askComment.getUser().getUsername().equals(username) && !isAdmin) {
            throw new RuntimeException("Unable to delete because you are not the author or administrator");
        }

        askCommentRepository.delete(askComment);
    }


    @Override
    public void updateAskComment(Long commentId, AskCommentRequest requestDto, String username, boolean isAdmin) {
        AskComment askComment = askCommentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("askComment not found"));

        if (!askComment.getUser().getUsername().equals(username) && !isAdmin) {
            throw new RuntimeException("Unable to update because you are not the author or administrator");
        }

        askComment = askComment.toBuilder()
                .content(requestDto.getContent())
                .build();

        askCommentRepository.save(askComment);
    }

    @Override
    public void likeAsk(Long askId, String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("user not fount"));

        Ask ask = askRepository.findById(askId)
                .orElseThrow(() -> new RuntimeException("ask not found"));

        AskLikeId askLikeId = AskLikeId.builder()
                .user(user.getId())
                .ask(askId)
                .build();

        if (!askLikeRepository.existsById(askLikeId)) {

            AskLike askLike = AskLike.builder()
                    .id(askLikeId)
                    .ask(ask)
                    .user(user)
                    .build();

            askLikeRepository.save(askLike);
        }

    }

    @Override
    public void unlikeAsk(Long askId, String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("user not fount"));

        AskLikeId askLikeId = AskLikeId.builder()
                .user(user.getId())
                .ask(askId)
                .build();

        if (askLikeRepository.existsById(askLikeId)) {
            askLikeRepository.deleteById(askLikeId);
        }
    }
}
