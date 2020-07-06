package com.ssafy.api.repository;

import com.ssafy.api.entity.Post;
import com.ssafy.api.entity.Tag;
import com.ssafy.api.entity.TagManage;
import com.ssafy.api.entity.TagManageId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TagManageJpaRepo extends JpaRepository<TagManage, TagManageId> {
    Optional<List<TagManage>> findByTag(Tag tag);
    Optional<List<TagManage>> findByPost(Post post);
    Integer deleteAllByPost(Post post);
}
