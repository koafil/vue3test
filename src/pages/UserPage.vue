<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input v-model="searchQuery" placeholder="Поиск..." />
    <div class="app__btns">
      <my-button @click="showDialog"> Создать пост </my-button>
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>
    <post-list
      :posts="sortedAndSearchedPosts"
      :searchText="searchQuery"
      @remove="removePost"
      v-if="!isPostsLoading"
    />
    <div v-else>Идет загрузка...</div>
    <div ref="observer" class="observer"></div>
  </div>
</template>

<script>
import PostList from "@/components/PostList";
import PostForm from "@/components/PostForm";

export default {
  components: {
    PostList,
    PostForm,
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostsLoading: true,
      selectedSort: "",
      searchQuery: "",
      page: 1,
      limit: 7,
      totalPages: 0,
      sortOptions: [
        { value: "title", name: "По названию" },
        { value: "body", name: "По содержимому" },
        { value: "id", name: "По идентификатору" },
      ],
    };
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id != post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    fetchPosts() {
      setTimeout(() => {
        this.isPostsLoading = true;
        // fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
        let url = new URL("https://jsonplaceholder.typicode.com/posts");
        url.searchParams.set("_page", this.page);
        url.searchParams.set("_limit", this.limit);
        fetch(url)
          .then((response) => {
            this.totalPages = Math.ceil(
              response.headers.get("x-total-count") / this.limit
            );
            return response.json();
          })
          .then((json) => (this.posts = json))
          .catch(() => alert("Error"))
          .finally(() => (this.isPostsLoading = false));
      }, 100);
    },
    loadMorePosts() {
      setTimeout(() => {
        this.page++;
        // fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
        let url = new URL("https://jsonplaceholder.typicode.com/posts");
        url.searchParams.set("_page", this.page);
        url.searchParams.set("_limit", this.limit);
        fetch(url)
          .then((response) => {
            this.totalPages = Math.ceil(
              response.headers.get("x-total-count") / this.limit
            );
            return response.json();
          })
          .then((json) => {
            this.posts = [...this.posts,...json];
          })
          .catch(() => alert("Error"))
          .finally();
      }, 100);
    },
  },
  mounted() {
    this.fetchPosts();
    console.log(this.$refs.observer);
    
    const options = {
      rootMargin: '0px',
      threshold: 1.0
    }
    const callback = (entries, observer) => {
      if(entries[0].isIntersecting && this.page < this.totalPages)
        this.loadMorePosts();
        // console.log("Show!");
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer);
  },
  computed: {
    sortedPosts() {
      if (this.selectedSort === "id")
        return [...this.posts].sort((post1, post2) => post1.id > post2.id);
      else
        return [...this.posts].sort((post1, post2) =>
          post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
        );
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((post) =>
        post.body.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  watch: {
   
  },
};
</script>

<style>
.app__btns {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}
.page__wrapper {
  display: flex;
  margin-top: 15px;
}
.page {
  border: 1px solid black;
  padding: 10px;
}
.current-page {
  border: 2px solid teal;
  background-color: bisque;
}
.observer {
  height: 30px;
  background: green;
}
</style>
