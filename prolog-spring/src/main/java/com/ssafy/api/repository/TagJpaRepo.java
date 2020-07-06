package com.ssafy.api.repository;

import com.ssafy.api.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TagJpaRepo  extends JpaRepository<Tag, Long> {
    Optional<Tag> findByTag(String tag);
}
