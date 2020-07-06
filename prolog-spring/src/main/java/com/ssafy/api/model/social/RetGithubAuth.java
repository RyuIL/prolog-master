package com.ssafy.api.model.social;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RetGithubAuth {
    private String access_token;
    private String token_type;
    private String scope;
}
