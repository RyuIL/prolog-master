package com.ssafy.api.service;

import com.ssafy.api.repository.TagJpaRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;


@Service
@Transactional
@RequiredArgsConstructor
public class TagService {
    private TagJpaRepo tagJpaRepo;
//    public String[] findTags(List<TagManage> tIdList){
//        // tag list 반환
//        //tIdList크기만큼의 반복문으로 각 인덱스의 값을 이용해 tag내용을 찾는다.
//
//        //찾은 태그들의 List를 반환한다.
//        return ;
//    }
}
