package com.ssafy.api.service;

import com.ssafy.api.advice.exception.CNotOwnerException;
import com.ssafy.api.advice.exception.CResourceNotExistException;
import com.ssafy.api.advice.exception.CUserNotFoundException;
import com.ssafy.api.entity.Post;
import com.ssafy.api.entity.Tag;
import com.ssafy.api.entity.TagManage;
import com.ssafy.api.entity.User;
import com.ssafy.api.model.PostDTO;
import com.ssafy.api.model.PostResponseDTO;
import com.ssafy.api.repository.PostJpaRepo;
import com.ssafy.api.repository.TagJpaRepo;
import com.ssafy.api.repository.TagManageJpaRepo;
import com.ssafy.api.repository.UserJpaRepo;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class PostsService {
    private final PostJpaRepo postJpaRepo;
    private final UserJpaRepo userJpaRepo;
    private final TagJpaRepo tagJpaRepo;
    private final TagManageJpaRepo tagManageJpaRepo;
    private final ModelMapper modelMapper;

    //게시물 전체
    public List<Post> getAllPosts() {
        return postJpaRepo.findAll();
    }
    //게시물 전체 - By Id
    public List<Post> getAllPostsByUser(Long msrl) {
        return postJpaRepo.findAllByUserMsrl(msrl).orElseThrow(CResourceNotExistException::new);
    }
    //단일 게시물 - 읽기
    public Post getPost(int postCode) {
        return postJpaRepo.findById(postCode).orElseThrow(CResourceNotExistException::new);
    }
    public Post viewCount(Post post){
        // 빈도수 셋팅 필요
        int viewCnt= post.getPostView();
        post.setPostView(viewCnt+1);
        return postJpaRepo.save(post); // view update
    }

    //상세페이지 가져오기
    public PostResponseDTO getPostDetail(int postCode){
        Post post = getPost(postCode);
        User user = post.getUser();
        post = viewCount(post);
        List<TagManage> mngs = tagManageJpaRepo.findByPost(post).orElse(null);
        PostResponseDTO postDTO = modelMapper.map(post, PostResponseDTO.class);
        postDTO.setMsrl(user.getMsrl());
        postDTO.setPicture(user.getPicture());
        //tag 있을때만
        if(mngs!=null){
            String[] tags = new String[mngs.size()];
            for (int i = 0; i < mngs.size(); i++) {
                tags[i] = mngs.get(i).getTag().getTag();
            }
            postDTO.setTagList(tags);
        }else{
            postDTO.setTagList(null);
        }
        return postDTO;
    }

    // 단일 게시물 - 작성
    public boolean writePost(Long msrl, PostDTO post) {
        //ID check - 존재하면 작성가능
        Post newPost = new Post(userJpaRepo.findByMsrl(msrl).orElseThrow(CUserNotFoundException::new),post.getTitle(),post.getBody(),
                post.getCoverImage(),post.getCoverColor());
        Post savedPost = postJpaRepo.save(newPost); // post 저장
        //Tag 처리
        //Tag가 Null일때 -> tag 처리안함
        if(!post.getTagList().equals(null)){
            String[] tags = post.getTagList(); // DTO 에서 String[] 으로 태그 받아옴
            for (String tag :tags) {
                Tag savedTag = tagJpaRepo.findByTag(tag).orElse(null);
                if(savedTag == null) {
                    savedTag = tagJpaRepo.save(new Tag(tag));
                }
                tagManageJpaRepo.save(new TagManage(savedPost,savedTag));
            }
        }
        return true;
    }

    // 단일 게시물 - 수정
    public Post updatePost(int postCode, Long mrsl, PostDTO post) {
        //ID Check 필요
        Post postOrigin = getPost(postCode);
        if(postOrigin.getUser().getMsrl() != mrsl)
            throw new CNotOwnerException();
        postOrigin.setUpdate(post.getTitle(),post.getBody(),post.getCoverImage(),post.getCoverColor());

        //Tag 처리
        //Tag가 Null일때 -> tag 처리안함
        if(!post.getTagList().equals(null)){
            //기존 태그 Delete
            tagManageJpaRepo.deleteAllByPost(postOrigin);
            String[] tags = post.getTagList();
            for (String tag :tags) {
                Tag savedTag = tagJpaRepo.findByTag(tag).orElse(null);
                if(savedTag == null) {
                    savedTag = tagJpaRepo.save(new Tag(tag));
                }
                tagManageJpaRepo.save(new TagManage(postOrigin,savedTag));
            }
        }
        return postOrigin;
    }

    // 단일 게시물 - 삭제
    public boolean deletePost(Long msrl, int postCode) {
        Post post = getPost(postCode);
        if(post.getUser().getMsrl() != msrl)
            throw new CNotOwnerException();
        postJpaRepo.deleteById(postCode);
        return true;
    }

    //검색어 이용
    public List<Post> searchByKeyWords(String searchKeyWord) {
        return postJpaRepo.findAllByTitleContains(searchKeyWord).get();
    }
}