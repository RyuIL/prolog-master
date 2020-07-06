package com.ssafy.api.model.social;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
public class KakaoProfile implements SocialProfile {
    private String id;
    private String refreshToken;
    private Properties properties;
    private Kakao_account kakao_account;

    @Override
    public String getName() {
        return this.properties.getNickname();
    }

    @Override
    public String getPicture() {
        return this.properties.getProfile_image();
    }

    @Override
    public String getEmail() {
        return this.kakao_account.getEmail();
    }

    @Getter
    @Setter
    @ToString
    private static class Properties {
        private String nickname;
        private String thumbnail_image;
        private String profile_image;
    }

    @Getter
    @Setter
    private static class Kakao_account{
        private String email;
    }
}
