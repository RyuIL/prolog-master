package com.ssafy.api.model.social;

public interface SocialProfile {
    String getId();
    String getName();
    String getPicture();
    String getRefreshToken();
    void setRefreshToken(String refreshToken);
    String getEmail();

}
