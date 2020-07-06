package com.ssafy.api.service.user;

import com.google.gson.Gson;
import com.ssafy.api.advice.exception.CCommunicationException;
import com.ssafy.api.model.social.GithubProfile;
import com.ssafy.api.model.social.GoogleProfile;
import com.ssafy.api.model.social.RetGithubAuth;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GithubService {
    private final RestTemplate restTemplate;
    private final Environment env;
    private final Gson gson;

    @Value("${spring.social.github.client_id}")
    private String githubClientId;
    @Value("${spring.social.github.clientSecret}")
    private String githubClientSecret;
    @Value("${spring.url.base}")
    private String baseUrl;
    @Value("${spring.social.github.redirect}")
    private String githubRedirect;


    public RetGithubAuth getGithubTokenInfo(String code) {
        // Set header : Content-type: application/x-www-form-urlencoded
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setAccept(new ArrayList<MediaType>(Arrays.asList(MediaType.APPLICATION_JSON)));
        // Set parameter
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", code);
        params.add("client_id", githubClientId);
        params.add("client_secret", githubClientSecret);
        params.add("redirect_uri", baseUrl + githubRedirect);
        params.add("state", "poka");
        // Set http entity
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(env.getProperty("spring.social.github.url.token"), request, String.class);
        if (response.getStatusCode() == HttpStatus.OK) {
            return gson.fromJson(response.getBody(), RetGithubAuth.class);
        }

        return null;
    }

    public GithubProfile getGithubProfile(String accessToken) {
        // Set header : Content-type: application/x-www-form-urlencoded
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.set("Authorization", "token " + accessToken);

        // Set http entity
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(null, headers);
        try {
            // Request profile
            ResponseEntity<String> response = restTemplate.exchange(env.getProperty("spring.social.github.url.profile"),HttpMethod.GET,request,String.class);
            if (response.getStatusCode() == HttpStatus.OK)
                return gson.fromJson(response.getBody(), GithubProfile.class);
        } catch (Exception e) {
            throw new CCommunicationException();
        }
        throw new CCommunicationException();
    }
}
