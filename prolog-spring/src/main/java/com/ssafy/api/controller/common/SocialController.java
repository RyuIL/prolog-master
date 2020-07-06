package com.ssafy.api.controller.common;

import com.ssafy.api.model.social.RetGithubAuth;
import com.ssafy.api.model.social.RetGoogleAuth;
import com.ssafy.api.model.social.RetKakaoAuth;
import com.ssafy.api.service.user.GithubService;
import com.ssafy.api.service.user.GoogleService;
import com.ssafy.api.service.user.KakaoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@RequiredArgsConstructor
@Controller
@RequestMapping("/social/login")
@Slf4j
public class SocialController {

    private final Environment env;
    private final KakaoService kakaoService;
    private final GoogleService googleService;
    private final GithubService githubService;

    @Value("${spring.url.base}")
    private String baseUrl;

    @Value("${spring.social.kakao.client_id}")
    private String kakaoClientId;

    @Value("${spring.social.kakao.redirect}")
    private String kakaoRedirect;

    /**
     * 카카오 로그인 페이지
     */
    @GetMapping
    public ModelAndView socialLogin(ModelAndView mav) {

        StringBuilder loginUrl = new StringBuilder()
                .append(env.getProperty("spring.social.kakao.url.login"))
                .append("?client_id=").append(kakaoClientId)
                .append("&response_type=code")
                .append("&redirect_uri=").append(baseUrl).append(kakaoRedirect);

        mav.addObject("loginUrl", loginUrl);
        mav.setViewName("social/login");
        return mav;
    }

    /**
     * 카카오 인증 완료 후 리다이렉트 화면
     */
    @GetMapping(value = "/kakao")
    public ModelAndView redirectKakao(ModelAndView mav, @RequestParam String code) {
        RetKakaoAuth authInfo = kakaoService.getKakaoTokenInfo(code);
        mav.addObject("authInfo", authInfo);
        log.info(authInfo.toString());
        mav.setViewName("social/redirectKakao");
        return mav;
    }

    @GetMapping(value = "/google")
    public ModelAndView redirectGoogle(ModelAndView mav, @RequestParam String code) {
        log.trace("this is google controller");
        RetGoogleAuth authInfo = googleService.getGoogleTokenInfo(code);
        mav.addObject("authInfo", authInfo);
        mav.setViewName("social/redirectKakao");

        return mav;
    }

    @GetMapping(value = "/github")
    public ModelAndView redirectGithub(ModelAndView mav, @RequestParam String code){
        RetGithubAuth authInfo = githubService.getGithubTokenInfo(code);
        mav.addObject("authInfo", authInfo);
        mav.setViewName("social/redirectGithub");

        return mav;
    }
}
