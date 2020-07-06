package com.ssafy.api.controller.v1;

import com.ssafy.api.entity.Post;
import com.ssafy.api.model.PostDTO;
import com.ssafy.api.model.PostResponseDTO;
import com.ssafy.api.model.response.CommonResult;
import com.ssafy.api.model.response.ListResult;
import com.ssafy.api.model.response.SingleResult;
import com.ssafy.api.service.PostsService;
import com.ssafy.api.service.ResponseService;
import com.ssafy.api.service.TagManageService;
import com.ssafy.api.service.TagService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Api(tags={"3.Post"})
@RestController
@RequestMapping("/v1")
@CrossOrigin({"*"})
@RequiredArgsConstructor
public class PostsController {

    private final PostsService postsService;
    private final TagManageService tagManageService;
    private final TagService tagService;
    private final ResponseService responseService;

    @ApiOperation(value="게시판 글 목록" , notes= "게시글 리스트 입니다.")
    @GetMapping("/postsAll")
    public ListResult<Post> posts(){
        return responseService.getListResult(postsService.getAllPosts());
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header")
    })
    @ApiOperation(value="글 목록" , notes= "현 계정에 대한 게시글 리스트 입니다.")
    @GetMapping("/post")
    public ListResult<Post> postsBySignInId(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String id = authentication.getName();
        return responseService.getListResult(postsService.getAllPostsByUser(Long.parseLong(id)));
    }
    @ApiOperation(value="글 목록" , notes= "계정에 따른 게시글 리스트 입니다.")
    @GetMapping("/post/user/{msrl}")
    public ListResult<Post> getPostsById(@PathVariable Long msrl){
        return responseService.getListResult(postsService.getAllPostsByUser(msrl));
    }

    @ApiOperation(value = "게시판 글 상세", notes = "게시판 글 상세정보를 조회한다.")
    @GetMapping(value = "/post/{postCode}") //id
    public SingleResult<PostResponseDTO> post(@PathVariable int postCode){
        //PostDTO 반환
        System.out.println("!!" + postCode);
        return responseService.getSingleResult(postsService.getPostDetail(postCode));
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header")
    })
    @ApiOperation(value = "Post 작성", notes = "글을 새로 작성합니다.")
    @PostMapping(value = "/post") //data : post()
    public CommonResult post(@RequestBody @Valid PostDTO post){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String id = authentication.getName();
        postsService.writePost(Long.parseLong(id), post);
        return responseService.getSuccessResult();
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header")
    })
    @ApiOperation(value = "Post 수정", notes = "글을 수정합니다.")
    @PutMapping(value ="/post/{postCode}")
    public SingleResult<Post> post(@PathVariable int postCode, @RequestBody PostDTO post){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String id = authentication.getName();
        return responseService.getSingleResult(postsService.updatePost(postCode,Long.parseLong(id), post));
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header")
    })
    @ApiOperation( value="Post Delete", notes = "글을 삭제합니다.")
    @DeleteMapping(value="/post/{postCode}") // id
    public CommonResult deletePost(@PathVariable int postCode){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String id = authentication.getName();
        postsService.deletePost(Long.parseLong(id),postCode);
        return responseService.getSuccessResult();
    }

    @ApiOperation( value="작성된 태그들 Msrl로 검색", notes = "해쉬태그 전체 검색.")
    @GetMapping(value="/tags/{msrl}") // id
    public List<String> getUserTags(@PathVariable Long msrl) {
        //msrl의 postCode로 - tag 검색
        List<Post> posts = postsService.getAllPostsByUser(msrl);
        Set<String> tagSet = new HashSet<>();
        for (Post p: posts) {
            List<String> tagList = tagManageService.getTagsByPostCode(p);
            if(tagList==null) continue;
            for (String tag: tagList  ) {
                tagSet.add(tag);
            }
        }
        return new ArrayList<>(tagSet);
    }

    @ApiOperation(value="Post Search" , notes = "글을 검색합니다.")
    @GetMapping(value="/post/search/{searchKeyWord}")
    public ListResult<Post> getSearchPosts(@PathVariable String searchKeyWord){
        return responseService.getListResult(postsService.searchByKeyWords(searchKeyWord));
    }

}