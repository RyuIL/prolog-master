package com.ssafy.api.model.user;

import com.ssafy.api.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserParamDTO {
    private String name;
    private String provider;
    private String picture;
    private String email;
    private String repository;
    private String greeting;

    public UserParamDTO(User user){
        this.name = user.getName();
        this.provider = user.getProvider();
        this.picture = user.getPicture();
        this.email = user.getEmail();
        this.repository = user.getRepository();
        this.greeting = user.getGreeting();
    }
}
