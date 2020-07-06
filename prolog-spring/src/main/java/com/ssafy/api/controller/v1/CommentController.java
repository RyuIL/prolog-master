package com.ssafy.api.controller.v1;

import com.ssafy.api.entity.Comment;
import com.ssafy.api.model.response.CommonResult;
import com.ssafy.api.model.response.ListResult;
import com.ssafy.api.service.CommentService;
import com.ssafy.api.service.ResponseService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


@Api(tags={"4.Comment"})
@RestController
@RequiredArgsConstructor
@RequestMapping(value="/post")
public class CommentController {

    private final CommentService commentService;
    private final ResponseService responseService; // 결과를 처리할 Service

    // select each post's comments
    @ApiOperation(value = "comments for Each" , notes = "한 포스트에 대한 코멘트 리스트")
    @GetMapping(value = "/{postCode}/comment")
    public ListResult<Comment> getCommentsEachPost(@PathVariable int postCode){
        return responseService.getListResult(commentService.findByPostId(postCode).get());
    }

    // delete comments - id 비교 필요
    @ApiImplicitParams({
            @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header")
    })
    @ApiOperation(value = "delete" , notes = "삭제")
    @DeleteMapping(value = "/{postCode}/comment/{cmtId}")
    public CommonResult deleteComment(@PathVariable int cmtId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String id = authentication.getName();
        if(id.equals(commentService.fingByCmtId(cmtId).getUser().getMsrl())){
            commentService.deleteCommentByCmtId(cmtId);
        }
        return responseService.getSuccessResult();
    }

    //insert comments
    @ApiOperation(value = "insert" , notes = "등록")
    @PostMapping(value = "/{postCode}/comment")
    public CommonResult save(@PathVariable int postCode, @RequestBody Comment comment){
        commentService.save(comment);
        return responseService.getSuccessResult();
    }

    //modify - comments - ID 비교 필요
    @ApiImplicitParams({
            @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header")
    })
    @ApiOperation(value = "update", notes = "수정")
    @PutMapping(value="/{postCode}/comment/{cmtId}")
    public CommonResult updateComment( @PathVariable int cmtId,@RequestBody Comment comment){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String id = authentication.getName();
        if(id.equals(commentService.fingByCmtId(cmtId).getUser().getMsrl())) { // Id 일치시 게시글 작성
            commentService.save(comment); // save --> update
        }
        return responseService.getSuccessResult();
    }
}
