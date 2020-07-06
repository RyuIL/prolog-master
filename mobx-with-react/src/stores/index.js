import PostStore from './postStore';
import EditorStore from './editorStore';
import AuthStore from './authStore';
import UserStore from './userStore';
import CommentStore from './commentStore';
import PortfolioStore from './portfolioStore';

class RootStore {
  constructor() {
    this.authStore = new AuthStore(this);
    this.userStore = new UserStore(this);
    this.postStore = new PostStore(this);
    this.editorStore = new EditorStore(this);
    this.commentStore = new CommentStore(this);
    this.portfolioStore = new PortfolioStore(this);
  }
}

export default RootStore;