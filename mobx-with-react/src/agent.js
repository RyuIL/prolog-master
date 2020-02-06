import axios from "axios";
import commonStore from "./stores/commonStore";
import authStore from "./stores/authStore";

//const API_ROOT = "http://localhost:8080";
const API_ROOT = "";
const VERSION = "/v1"
//const VERSION = ""

const encode = encodeURIComponent;

const handleErrors = err => {
  if (err && err.response && err.response.stauts === 401) {
    console.log("허용되지 않은 접근입니다. ");
    // 어떻게 동작시키지?
  }
  return err;
};    

const responseBody = res => res.body;

//jwt 토큰 세팅
const tokenWithHeader = req => {
  if (commonStore.token) {
    req.set("authorization", `Tok
    en ${commonStore.token}`); 
    //req.set("authorization", `Bearer ${commonStore.token}`); 
  }
};

// http request : get, post, del, put 
const requests = {
  del: url =>
    axios
      .delete(`${API_ROOT}${VERSION}${url}`)
      .then(res => console.log(res))
      .catch(err => console.log(err)),
  get: url =>
    axios
      .get(`${API_ROOT}${VERSION}${url}`)
      .then(res => console.log(res))
      .catch(err => console.log(err)),
  post: (url, body, header) =>
    axios
      .post(`${API_ROOT}${VERSION}${url}`, body, {headers: header})
      .then(res => console.log(res))
      .catch(err => console.log(err)),
  put: (url, body) =>
    axios
      .put(`${API_ROOT}${VERSION}${url}`, body)
      .then(res => console.log(res))
      .catch(err => console.log(err))
};

// 토큰은 다 헤더로 넘기고, 나머지 정보만 body로 넘긴다.
const Auth = {
    //회원 가입, 로그인
    register : (snsAccessToken, provider, name) =>
    requests.post(`/signup/${provider}`, {name :name}, {accessToken: snsAccessToken}),
    login : (snsAccessToken, provider) =>
    requests.post(`/signin/${provider}`,{},{accessToken:snsAccessToken}),
    //requests.get(`/helloworld/string`),
    //회원정보 조회
    current: () =>
    requests.get('/user'),
    update : (snsAccessToken, user) =>
    requests.put('/user', {accessToken : snsAccessToken, user : user}),
}

// page 로드를 어떻게 처리할거냐?
const omitId = post => Object.assing({}, post, {id: undefined})

const Posts = { 
  all : () => 
  requests.get(`/posts`),
  byAuthor : (author, query) => 
  requests.get(`/posts?author=${encode(author)}`),
  
  create: post =>
  requests.post('/posts', {post}),
  update: post => 
  requests.put(`/posts/${post.id}`, { post: omitId(post)}),
  get: id =>
  requests.get(`/posts/${id}`),
  del: id => 
  requests.del(`/posts/${id}`)

}

const Comments = { 
  forPost : postId => 
  console.log('forPost Comment요청'),
  //requests.get(`/posts/${postId}/comments`),
  create: (postId, comment) =>
  //requests.post(`/posts/${postId}/comments`, {comment}),
  console.log('Comment Create요청'),
  // 수정을 구현할거인가?
  // update: (postId, id, comment) => 
  // requests.put(`/posts/${postId}/comments/${id}`, { comment: omitId(comment)}),
  delete: (postId, commentId) => 
  console.log('comment Delete 요청'),
  //requests.del(`/posts/${postId}/comments/${commentId}`)
}



export default {
    Auth,
    Posts,
    Comments
}