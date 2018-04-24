# post-services
post-services are APIs that allow to store, delete and retrieve data.
# API GraphQL

// Get post by user id
```GraphQL
{
  posts(idUser: 2){
    post
    idUser
  }
}
```
// Get post by id
```GraphQL
{
  posts(id: 2){
    post
    idUser
  }
}
```
// Get all post
```GraphQL
{
  posts{
    id
    post
    idUser
  }
}
```
// insert post
```GraphQL
mutation addPost{
  addPost(post: "your post", idUser: 8){
    id
  }
}
```
// delete post by id
```GraphQL
mutation delPostById{
  delPostById(id:3){
    id
  }
}
```
// delete post by User id
```GraphQL
mutation delPostByUserId{
  delPostByUserId(idUser:3){
    id
  }
}
```
# Contributing
Georges TOKAM 
ECAM 2017-2018
