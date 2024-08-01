package com.__105.Banchan.notice.repository;

import com.__105.Banchan.notice.entitiy.Notice;
import org.springframework.data.jpa.domain.Specification;

public class NoticeSpecification {

    public static Specification<Notice> containsKeyword(String keyword) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.or(
                        criteriaBuilder.like(root.get("title"), "%" + keyword + "%"),
                        criteriaBuilder.like(root.get("content"), "%" + keyword + "%")
                );
    }

    public static Specification<Notice> whereApt(String code) {
        return ((root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("apartment").get("code"), code));
    }
}
