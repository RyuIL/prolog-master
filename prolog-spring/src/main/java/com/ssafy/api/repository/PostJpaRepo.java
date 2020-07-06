package com.ssafy.api.repository;

import com.ssafy.api.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostJpaRepo extends JpaRepository<Post, Integer> {
    Optional<List<Post>> findAllByUserMsrl(Long msrl); // user에 해당하는 모든 게시물
    Optional<List<Post>> findAllByTitleContains(String title);
}
