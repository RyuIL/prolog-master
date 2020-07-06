import agent from "../agent";
import { observable, action, computed } from "mobx";

// imageUrl, Title, category, text, likes, comments, created_at, updated_at , author
export default class PostStore {
  // map으로 관리하는게 더 빠름.
  @observable isLoading = false;
  @observable postRegistry = observable.map();
  @observable predicate = {};

  @computed get length() {
    return this.postItems.length;
  }

  @computed get returnLength() {
    return this.returnItems.length;
  }

  @computed get posts() {
    return this.postRegistry.values();
  }
  @observable nextId = 31;
  @observable returnItems = [];
  @observable postItems = []; // axios로 호출해서 받아오면 된다.
  @observable detailPost = undefined;

  @action setPostItems(postItems) {
    this.postItems = postItems;
    this.getItems(0, 2);
  }

  clear() {
    this.postRegistry.clear();
  }

  @action getPost(id) {
    //TODO
    return this.postRegistry.get(id);
  }

  //이전 정보를 정리해둔다.
  @action setPredicate(predicate) {
    if (JSON.stringfy(predicate) === JSON.stringfy(this.predicate)) return;
    this.clear();
    this.predicate = predicate;
  }

  // 전체 Post 가져오기
  @action loadPosts(userid) {
    this.isLoading = true;
    //TODO
    if (userid === -1) {
      return agent.Posts.all()
        .then(res => {
          this.setPostItems(res.data.list)})
        .catch(err => console.log(err))
        .finally(
          action(() => {
            this.loading = false;
          })
        );
    } else {
      return agent.Posts.byAuthorPublic(userid)
        .then(res => {
          this.setPostItems(res.data.list);
        })
        .catch(err => console.log(err))
        .finally(
          action(() => {
            this.loading = false;
          })
        );
    }
  }

  @action loadPost(id) {
    //TODO
    return agent.Posts.get(id).then(
      action(res => {
        this.detailPost = res.data.data;
        this.postRegistry.set(this.detailPost.postCode, this.detailPost);
        return this.detailPost;
      })
    );
  }

  @action createPost(post) {
    return agent.Posts.create(post);
  }

  @action updatePost(post) {
    return agent.Posts.update(post).then(({ post }) => {
      return post;
    });
  }

  @action searchTitle(searchText) {
    return agent.Posts.search(searchText)
      .then(res => this.setPostItems(res.data.list))

      .catch(err => alert("검색 결과가 없습니다."))
      .finally(
        action(() => {
          this.loading = false;
        })
      );
  }

  @action deletePost(id) {
    return agent.Posts.del(id).then(
      action(err => {
        this.loadPosts(-1);
        throw err;
      })
    );
  }

  constructor(root) {
    this.root = root;
  }

  @action
  sortByViews = () => {
    //this.loadPosts(-1);
    const itemsSortByViews = this.postItems
      .slice()
      .sort((a, b) => b.postView - a.postView);
    this.returnItems = itemsSortByViews;
  };

  @action
  sortByIds = () => {
    //this.loadPosts(-1);
    const itemsSortByIds = this.postItems.slice().sort((a, b) => a.id - b.id);
    this.returnItems = itemsSortByIds;
  };

  @action
  sortByAuthors = () => {
    //this.loadPosts(-1);
    const itemsSortByAuthors = this.postItems
      .slice()
      .sort((a, b) => (a.userName > b.userName ? 1 : -1));
    this.returnItems = itemsSortByAuthors;
  };

  @action
  sortByDates = () => {
    //this.loadPosts(-1);
    const itemsSortByDates = this.postItems
      .slice()
      .sort((a, b) => (a.createDate > b.createDate ? -1 : 1));
    this.returnItems = itemsSortByDates;
  };

  @action
  getItems = (startIndex, count) => {
    this.returnItems = this.postItems;
  };
}
