package com.__105.Banchan.ask.repository;


import com.__105.Banchan.ask.entity.Ask;
import com.__105.Banchan.ask.entity.AskLike;
import com.__105.Banchan.ask.entity.AskLikeId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AskLikeRepository extends JpaRepository<AskLike, AskLikeId> {
    List<AskLike> findAllByAsk(Ask ask);
}
