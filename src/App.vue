<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <my-button
      @click = "fetchPosts" 
      style="margin: 15px 0;"
    >
      Скачать посты
    </my-button>
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
    />
    <!-- <post-list /> -->
  </div>
</template>

<script>
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import axios from "axios";

export default {
  components: {
    PostList, PostForm
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
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
      try {
        setTimeout( async ()=> {
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
          this.posts=response.data;
        }, 1000);
      }catch(e){
          alert("Ошибка");
      }
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
