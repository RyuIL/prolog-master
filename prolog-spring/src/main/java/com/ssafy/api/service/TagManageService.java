package com.ssafy.api.service;

import com.ssafy.api.entity.Post;
import com.ssafy.api.entity.Tag;
import com.ssafy.api.entity.TagManage;
import com.ssafy.api.repository.TagJpaRepo;
import com.ssafy.api.repository.TagManageJpaRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class TagManageService {
    private final TagJpaRepo tagJpaRepo;
    private final TagManageJpaRepo tagManageJpaRepo;

    // Tag 전체
    public List<Tag> getAllTags(){
        return tagJpaRepo.findAll();
    }
    // 게시물 번호로 tId들 찾기
    public List<String> getTagsByPostCode(Post post){
        // post_code가 tag_manage에 없다면 종료
        if(!tagManageJpaRepo.findByPost(post).isPresent()) {
            return null;
        }
        List<TagManage> mngs = tagManageJpaRepo.findByPost(post).get();
        List<String> tags = new ArrayList<>();
            for (int i = 0; i < mngs.size(); i++) {
                tags.add(mngs.get(i).getTag().getTag());
        }
        return tags;
    }

    // tId로 게시물 번호들 찾기
    public List<TagManage> getTagsByTagId(Tag tag){
        return tagManageJpaRepo.findByTag(tag).get();
    }
}
