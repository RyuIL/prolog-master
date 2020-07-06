package com.ssafy.api.service.user;

import com.google.gson.Gson;
import com.ssafy.api.advice.exception.CCommunicationException;
import com.ssafy.api.model.social.GoogleProfile;
import com.ssafy.api.model.social.KakaoProfile;
import com.ssafy.api.model.social.RetGoogleAuth;
import com.ssafy.api.model.social.RetKakaoAuth;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.http.*;
import org.springframework.security.config.oauth2.client.CommonOAuth2Provider;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import springfox.documentation.builders.OAuthBuilder;

import java.util.Map;

@RequiredArgsConstructor
@Service
public class GoogleService {

    private final RestTemplate restTemplate;
    private final Environment env;
    private final Gson gson;

    @Value("${spring.social.google.client_id}")
    private String googleClientId;
    @Value("${spring.social.google.clientSecret}")
    private String googleClientSecret;
    @Value("${spring.url.base}")
    private String baseUrl;
    @Value("${spring.social.google.redirect}")
    private String googleRedirect;

    public GoogleProfile getGoogleProfile(String accessToken) {
        // Set header : Content-type: application/x-www-form-urlencoded
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.set("Authorization", "Bearer " + accessToken);

        // Set http entity
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(null, headers);
        try {
            // Request profile
            ResponseEntity<String> response = restTemplate.exchange(env.getProperty("spring.social.google.url.userAuthorizationUri"),HttpMethod.GET,request,String.class);
            if (response.getStatusCode() == HttpStatus.OK)
                return gson.fromJson(response.getBody(), GoogleProfile.class);
        } catch (Exception e) {
            throw new CCommunicationException();
        }
        throw new CCommunicationException();
    }

    public RetGoogleAuth getGoogleTokenInfo(String code) {
        // Set header : Content-type: application/x-www-form-urlencoded
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        // Set parameter
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", code);
        params.add("client_id", googleClientId);
        params.add("client_secret", googleClientSecret);
        params.add("redirect_uri", baseUrl + googleRedirect);
        params.add("grant_type", "authorization_code");
        // Set http entity
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(env.getProperty("spring.social.google.url.token"), request, String.class);
        if (response.getStatusCode() == HttpStatus.OK) {
            return gson.fromJson(response.getBody(), RetGoogleAuth.class);
        }

        return null;
    }

}
