package com.ssafy.api.controller.v1;

import com.google.gson.Gson;
import com.ssafy.api.advice.exception.CUserNotFoundException;
import com.ssafy.api.model.response.CommonResult;
import com.ssafy.api.model.response.ListResult;
import com.ssafy.api.model.response.SingleResult;
import com.ssafy.api.model.user.UserParamDTO;
import com.ssafy.api.repository.UserJpaRepo;
import com.ssafy.api.service.ResponseService;
import com.ssafy.api.entity.User;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@Api(tags = {"2. User"})
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/v1")
public class UserController {

    private final UserJpaRepo userJpaRepo;
    private final ResponseService responseService; // 결과를 처리할 Service

    @ApiImplicitParams({
            @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header")
    })
    @ApiOperation(value = "회원 리스트 조회", notes = "모든 회원을 조회한다")
    @GetMapping(value = "/users")
    public ListResult<User> findAllUser() {
        // 결과데이터가 여러건인경우 getListResult를 이용해서 결과를 출력한다.
        return responseService.getListResult(userJpaRepo.findAll());
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header")
    })
    @ApiOperation(value = "내 정보 조회", notes = "jwt으로 내 정보를 조회한다")
    @GetMapping(value = "/user")
    public SingleResult<UserParamDTO> findUserById() {
        // SecurityContext에서 인증받은 회원의 정보를 얻어온다.
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        authentication.getPrincipal();
        String id = authentication.getName();
        // 결과데이터가 단일건인경우 getSingleResult를 이용해서 결과를 출력한다.
        UserParamDTO userParamDTO = new UserParamDTO(userJpaRepo.findByMsrl(Long.parseLong(id)).orElseThrow(CUserNotFoundException::new));
        return responseService.getSingleResult(userParamDTO);
    }

    @ApiOperation(value = "회원 단건 조회", notes = "회원번호(msrl)로 회원을 조회한다")
    @GetMapping(value = "/user/{msrl}")
    public SingleResult<UserParamDTO> findUserByParhVariableId(@ApiParam(value = "회원 번호", required = true) @PathVariable Long msrl) {
        // SecurityContext에서 인증받은 회원의 정보를 얻어온다.
        // 결과데이터가 단일건인경우 getSingleResult를 이용해서 결과를 출력한다.
        UserParamDTO userParamDTO = new UserParamDTO(userJpaRepo.findByMsrl(msrl).orElseThrow(CUserNotFoundException::new));
        return responseService.getSingleResult(userParamDTO);
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header")
    })
    @ApiOperation(value = "회원 수정", notes = "회원정보를 수정한다")
    @PutMapping(value = "/user")
    public SingleResult<User> modify(
            @ApiParam(value = "회원번호", required = true) @RequestParam int msrl,
            @ApiParam(value = "회원이름", required = true) @RequestParam String name) {
        User user = User.builder()
                .msrl(msrl)
                .name(name)
                .build();
        return responseService.getSingleResult(userJpaRepo.save(user));
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header")
    })
    @ApiOperation(value = "회원 인삿말, email, name 수정", notes = "msrl를 통해 회원 정보 업데이트")
    @PutMapping(value = "/user/{updateTargetName}")
    public SingleResult<User> modify(
            @ApiParam(value = "타겟 컬럼 이름", required = true) @PathVariable String updateTargetName,
            @ApiParam(value = "타겟 컬럼 정보", required = true) @RequestBody UserParamDTO userDto
            ) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        long msrl = Long.parseLong(authentication.getName());
        User user = userJpaRepo.findByMsrl(msrl).orElseThrow(CUserNotFoundException::new);

        if(updateTargetName.equals("greeting")){
            user.setGreeting(userDto.getGreeting());
        }else if(updateTargetName.equals("email")){
            user.setEmail(userDto.getEmail());
        }else if(updateTargetName.equals("name")){
            user.setName(userDto.getName());
        }

        return responseService.getSingleResult(userJpaRepo.save(user));
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header")
    })
    @ApiOperation(value = "회원 삭제", notes = "userId로 회원정보를 삭제한다")
    @DeleteMapping(value = "/user/{msrl}")
    public CommonResult delete(
            @ApiParam(value = "회원번호", required = true) @PathVariable long msrl) {
        try {
            userJpaRepo.deleteById(msrl);
        }catch (RuntimeException e){
            return responseService.getFailResult(2000, "유저 삭제중 문제 발생");
        }
        // 성공 결과 정보만 필요한경우 getSuccessResult()를 이용하여 결과를 출력한다.
        return responseService.getSuccessResult();
    }

    @ApiOperation(value = "회원 개발스택 Json 조회", notes = "msrl로 유저 개발 스택 Json을 조회한다")
    @ResponseBody
    @GetMapping(value = "/techs/{msrl}")
    public SingleResult<User> getUserTechs(
            @ApiParam(value = "회원번호", required = true) @PathVariable long msrl) {
        return responseService.getSingleResult(userJpaRepo.findByMsrl(msrl).orElseThrow(CUserNotFoundException::new));
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header")
    })
    @ApiOperation(value = "회원 개발스택 추가, 수정", notes = "msrl로 유저 개발 스택 리스트를 추가, 수정한다")
    @PostMapping(value = "/techs")
    public SingleResult<User> createUserTechs(
            @ApiParam(value = "회원번호", required = true) @RequestBody User tech) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        long msrl = Long.parseLong(authentication.getName());
        User user = userJpaRepo.findByMsrl(msrl).orElseThrow(CUserNotFoundException::new);
        user.setTechs(tech.getTechs());
        return responseService.getSingleResult(userJpaRepo.save(user));
    }

}