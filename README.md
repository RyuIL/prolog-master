# Prolog 
개발자를 위한 블로그 플랫폼
## Backend
### 사용 기술
- Spring boot
- Spring Security
- Mysql
- JPA
- JWT
- SSO

## 기능 구현

### Spring security와 JWT를 활용한 SSO
* OAuth2.0을 활용 Kakao, Google, Github access token을 이용해 해당 소셜에 회원가입 처리 후 JWT 발급, 이후 로그인이 필요한 로직에는 Filter에서 JWT를 검증 후 서비스 이용 가능 합니다.
* [Spring authentication filter chain](https://github.com/RyuIL/prolog-master/blob/master/prolog-spring/src/main/java/com/ssafy/api/config/security/JwtAuthenticationFilter.java)
* [Jwt provider](https://github.com/RyuIL/prolog-master/blob/master/prolog-spring/src/main/java/com/ssafy/api/config/JwtTokenProvider.java)
* [RestTemplate SSO Service](https://github.com/RyuIL/prolog-master/tree/master/prolog-spring/src/main/java/com/ssafy/api/service/user)

### Controller advice exception handler
* @RestControllerAdvice와 Custom Exception을 활용하여 손쉽게 Exception 관리
* [Custom Exception, RestControllerAdvice](https://github.com/RyuIL/prolog-master/blob/master/prolog-spring/src/main/java/com/ssafy/api/advice/ExceptionAdvice.java)

### SwaggerUI 문서화
* Swagger-ui를 적극적으로 활용, Controller에 @ApiOperation, @ApiImplicitParams 활용을 통한 자동 문서화
* [Swagger-ui](https://github.com/RyuIL/prolog-master/blob/master/prolog-spring/src/main/java/com/ssafy/api/config/SwaggerConfiguration.java)

### File Server
* EC2 지정 폴더에 UUID를 통한 file upload
* [File upload Service](https://github.com/RyuIL/prolog-master/blob/master/prolog-spring/src/main/java/com/ssafy/api/service/FileUploadDownloadService.java)

### RestfulAPI
* 명사 Endpoint, Spring Security 시작 endpoint를 다르게 주어 권한별 api 분리 
* [Controller](https://github.com/RyuIL/prolog-master/tree/master/prolog-spring/src/main/java/com/ssafy/api/controller)
