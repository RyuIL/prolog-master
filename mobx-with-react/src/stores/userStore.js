import { observable, action } from "mobx";
import agent from "../agent";


export default class UserStore{
  constructor(root) {
    this.root = root;
  }

  @observable currentUser;
  @observable loadingUser;
  @observable updatingUser;
  @observable updatingUserErrors;

  @action pullUser(jwt) {
    this.loadingUser = true;
    return agent.Auth.current(jwt)
      .then(
        action(({ user }) => {
          this.currentUser = user;
        })
      )
      .finally( 
        action(() => {
          this.loadingUser = false;
        })
      );
  }

  @action updateUser(newUser) {
    this.updatingUser = true;
    return agent.Auth.save(newUser)
      .then(
        action(({ user }) => {
          this.currentUser = user;
        })
      )
      .finally(
        action(() => {
          this.updatingUser = false;
        })
      );
  }

  @action forgetUser() {
    this.currentUser = undefined;
  }

  @observable userInfo = {
      profileImg:"https://upload.wikimedia.org/wikipedia/commons/7/7e/Circle-icons-profile.svg",
      userId: "KYUNGEUN",
      userName : "경은"
    };
  


}
