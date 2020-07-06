import { observable, action } from "mobx";
import agent from "../agent";
import { launguageDict } from "../components/Portfolio/data";

export default class PortfolioStore {
  constructor(root) {
    this.root = root;
  }

  @observable inProgress = false;
  @observable errors = undefined;

  @observable values = {
    greeting: "",
    skills: [],
    email: "",
    repository: "",
    posts: undefined
  };

  @action setGreeting(greeting) {
    this.values.greeting = greeting;
  }
  @action setSkills(skills) {
    this.values.skills = skills;
  }
  @action setEmail(email) {
    this.values.email = email;
  }
  @action setRepository(repository) {
    this.values.repository = repository;
  }
  @action setPosts(posts) {
    this.values.posts = posts;
  }

  @action getPortfolioData(id) {
    agent.Auth.getStack(id).then(res => {
      const { techs, email, greeting, repository } = res.data.data;
      this.setGreeting(greeting);
      this.setEmail(email);
      this.setRepository(repository);
      if (techs) {
        let skills = techs.split(",");
        const options = [];
        for (let i=0; i< skills.length ; i++) {
            options.push(launguageDict[skills[i]]);
        }
        this.setSkills(options);
      }
    });
  }

  @action saveSkills() {
    let tech = "";
    if (this.values.skills) {
      const skillsString = this.values.skills.map(item => item.value);
      tech = skillsString.join()
    }
    agent.Auth.setStack(tech).then().catch(e=> console.log(e));
  }
}
