package com.ssafy.api.model.social;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GithubProfile implements SocialProfile {
    private String id;
    private String node_id;
    private String avatar_url;
    private String url;
    private String name;
    private String email;
    private String repos_url;


    @Override
    public String getPicture() {
        return this.avatar_url;
    }

    @Override
    public String getRefreshToken() {
        return null;
    }

    @Override
    public void setRefreshToken(String refreshToken) {
        
    }


//            "login": "RyuIL",
//            "id": 21700784,
//            "node_id": "MDQ6VXNlcjIxNzAwNzg0",
//            "avatar_url": "https://avatars1.githubusercontent.com/u/21700784?v=4",
//            "gravatar_id": "",
//            "url": "https://api.github.com/users/RyuIL",
//            "html_url": "https://github.com/RyuIL",
//            "followers_url": "https://api.github.com/users/RyuIL/followers",
//            "following_url": "https://api.github.com/users/RyuIL/following{/other_user}",
//            "gists_url": "https://api.github.com/users/RyuIL/gists{/gist_id}",
//            "starred_url": "https://api.github.com/users/RyuIL/starred{/owner}{/repo}",
//            "subscriptions_url": "https://api.github.com/users/RyuIL/subscriptions",
//            "organizations_url": "https://api.github.com/users/RyuIL/orgs",
//            "repos_url": "https://api.github.com/users/RyuIL/repos",
//            "events_url": "https://api.github.com/users/RyuIL/events{/privacy}",
//            "received_events_url": "https://api.github.com/users/RyuIL/received_events",
//            "type": "User",
//            "site_admin": false,
//            "name": "RyuIlHan",
//            "company": null,
//            "blog": "",
//            "location": null,
//            "email": "bbb8323@gmail.com",
//            "hireable": null,
//            "bio": null,
//            "public_repos": 37,
//            "public_gists": 0,
//            "followers": 3,
//            "following": 0,
//            "created_at": "2016-09-02T05:04:34Z",
//            "updated_at": "2020-02-10T02:49:12Z"
}
