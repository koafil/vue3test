<template>
  <div class="app">
    <post-form />
    <post-list :posts="posts"/>
    <!-- <post-list /> -->
  </div>
</template>

<script>
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";

export default {
  components: {
    PostList, PostForm
  },
  data() {
    return {
      posts: [
        {id: 1, title: 'JavaScript', body: 'Описание поста 1'},
        {id: 2, title: 'JavaScript 2', body: 'Описание поста 2'},
        {id: 3, title: 'JavaScript 3', body: 'Описание поста 3'},
        {id: 4, title: 'JavaScript 4', body: 'Описание поста 4'},
      ],
      title: '',
      body:''
    }
  },
  methods: {
    createPost() {
      const newPost = {
        id: Date.now(),
        title: this.title,
        body: this.body
      }
      this.posts.push(newPost);
      this.title="";
      this.body="";
    },
    inputTitle(event) {
      this.title = event.target.value;
    },
    inputBody(event) {
      this.body = event.target.value;
    },
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app {
  padding: 20px;
}
</style>
