package com.ssafy.api.service;

import com.ssafy.api.entity.Comment;
import com.ssafy.api.repository.CommentRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentService {

    private CommentRepo commentRepo;

    // 쓸일없...
    public List<Comment> findAllComments(){
        return commentRepo.findAll();
    }

    // select by postId : 해당게시물의 comment 불러옴
    public Optional<List<Comment>> findByPostId(int postCode) {
        Optional<List<Comment>> comments = commentRepo.findAllByPost(postCode);
        return comments;
    }
    //select one
    public Comment fingByCmtId(int cmtId){
        return commentRepo.findByCmtId(cmtId).get();
    }

    //select one target
    //insert & update
    public Comment save(Comment comment) {
        return commentRepo.save(comment);
    }

    //삭제
    public void deleteCommentByCmtId(int cmtId){
        commentRepo.deleteById(cmtId);
    }
}
