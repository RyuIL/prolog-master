import { observable, action, reaction } from "mobx";
import jwtDecode from "jwt-decode";
import agent from "../agent";

export default class AuthStore {
  @observable inProgress = false;
  @observable errors = undefined;
  @observable appName = "Prolog";
  @observable token = window.sessionStorage.getItem("jwt");
  @observable user_info = undefined;
  @observable nuser_detail = {
    email: "이메일을 입력해주세요.",
    name: "",
    intro: "소개를 입력해주세요.",
    picture: ""
  };
  @observable user_detail = {
    provider: undefined,
    email: "이메일을 입력해주세요.",
    name: "",
    profileimg: undefined,
    intro: "소개를 입력해주세요.",
    role: "",
    picture: ""
  };

  @observable name = "";
  @observable email = "";
  @observable intro = "";

  constructor(root) {
    this.root = root;
    if (this.token) {
      this.user_info = jwtDecode(this.token).userInfo;
    }

    reaction(
      () => this.name,
      name => {
        if (name) {
          this.name = name;
        }
      }
    );

    reaction(
      () => this.email,
      email => {
        if (email) {
          this.email = email;
        }
      }
    );

    reaction(
      () => this.intro,
      intro => {
        if (intro) {
          this.intro = intro;
        }
      }
    );

    reaction(
      () => this.token,
      token => {
        if (token) {
          window.sessionStorage.setItem("jwt", token);
        } else {
          window.sessionStorage.removeItem("jwt");
        }
      }
    );
  }

  //sns accessToken 타입들이 어떻게 들어올까?
  @observable values = {
    accessToken: undefined,
    refreshToken: undefined,
    provider: undefined,
    email: "이메일을 입력해주세요.",
    id: undefined,
    name: "",
    profileimg: undefined,
    intro: "소개를 입력해주세요.",
    sub: "",
    role: "",
    picture: ""
  };
  @action setProfileimg(profileimg) {
    this.values.profileimg = profileimg;
  }
  @action setId(id) {
    this.values.id = id;
  }
  @action setName(name) {
    this.values.name = name;
    this.name = name;
  }

  @action updateName(name) {
    agent.Auth.name_update(name)
      .then(res => {})
      .catch(err => {});
  }

  @action updateEmail(email) {
    agent.Auth.email_update(email)
      .then(res => {})
      .catch(err => {});
  }

  @action updateIntro(intro) {
    agent.Auth.intro_update(intro)
      .then(res => {})
      .catch(err => {});
  }

  @action setAccessToken(token) {
    this.values.accessToken = token;
  }
  @action setRefreshToken(token) {
    this.values.refreshToken = token;
  }
  @action setEmail(email) {
    this.values.email = email;
    this.email = email;
  }
  @action setIntro(intro) {
    this.values.intro = intro;
    this.intro = intro;
  }
  @action setSub(sub) {
    this.values.sub = sub;
  }
  @action setRole(role) {
    this.values.role = role;
  }

  @action setProvider(provider) {
    this.values.provider = provider;
  }

  @action reset() {
    this.values.accessToken = undefined;
    this.values.refreshToken = undefined;
  }

  @action setToken(token) {
    this.token = token;
    this.user_info = jwtDecode(token).userInfo;
    agent.Auth.getUserInfo(token).then(res => {
      this.user_detail = res.data.data;
    });
  }

  @action login() {
    this.inProgress = true;
    this.errors = undefined;
    return agent.Auth.login(
      this.values.accessToken,
      this.values.refreshToken,
      this.values.provider
    )
      .then(res => {
        this.setToken(res.data.data);
      })

      .catch(
        action(err => {
          this.errors =
            err.response && err.response.body && err.response.body.errors;
          throw err;
        })
      )
      .then(
        action(() => {
          this.inProgress = false;
        })
      );
  }
  @action register() {
    this.inProgress = true;
    this.errors = undefined;
    return agent.Auth.register(
      this.values.accessToken,
      this.values.refreshToken
    )
      .then(({ user }) => this.setToken(user.token))
      .then(() => this.root.userStore.pullUser()) //login 성공한 유저정보를 불러온다.
      .catch(
        action(err => {
          this.errors =
            err.response && err.response.body && err.response.body.errors;
          throw err;
        })
      )
      .then(
        action(() => {
          this.inProgress = false;
        })
      );
  }
  @action
  getUserDetail(jwt) {
    agent.Auth.getUserInfo(jwt);
  }

  @action
  async getOtherDetail(msrl) {
    this.nuser_detail = await agent.Auth.getOtherInfo(msrl);

    return;
  }

  @action logout() {
    window.sessionStorage.removeItem("jwt");
    window.location.reload();
  }

  @action getName() {
    return this.name;
  }

  @action authenticatedUserId() {
    if (this.token) {
      const currentId = jwtDecode(this.token).sub;
      return currentId;
    }
  }
}
