<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <my-button
      @click = "showDialog" 
      style="margin: 15px 0;"
    >
      Создать пост
    </my-button>
    <my-dialog v-model:show="dialogVisible">
      <post-form 
        @create = "createPost"
      />
    </my-dialog>
    <post-list 
      :posts="posts"
      @remove = "removePost"
      v-if = "!isPostsLoading"
    />
    <div v-else>Идет загрузка...</div>
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
      posts: [],
      dialogVisible: false,
      isPostsLoading: true
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts=this.posts.filter(p=>p.id != post.id);
    },
    showDialog()
    {
      this.dialogVisible = true;
    },
    fetchPosts() {
      setTimeout(()=>{
      this.isPostsLoading=true;
      fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
        .then(response => response.json())
        .then(json => this.posts=json)
        .catch(()=>alert("Error"))
        .finally(()=>this.isPostsLoading=false);
      },1000);
    }
  },
  mounted() {
    this.fetchPosts();
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
