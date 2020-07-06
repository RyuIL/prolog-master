package com.ssafy.api.model.social;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GoogleProfile implements SocialProfile{
    private String id;
    private String email;
    private Boolean verified_email;
    private String name;
    private String given_name;
    private String family_name;
    private String picture;
    private String locale;
    private String refreshToken;
}
