<template>
  <div class="post">
    <div>
      <div>{{ post.id }} likes = {{ $store.state.likes }}</div>
      <div><strong>Название:</strong> {{ post.title }}</div>
      <div><strong>Описание:</strong> <span v-html="hilitedTextBody"></span></div>
    </div>
    <div class="post__btns">
      <my-button @click="$router.push(`/posts/${post.id}`)"> Открыть </my-button>
      <my-button @click="$emit('remove', post)"> Удалить </my-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
    searchText: {
      type: String,
      default: "",
    },
  },
  computed: {
    hilitedTextBody() {
      if (this.searchText)
        return this.post.body.replaceAll(
          this.searchText,
          "<span style='color: red; font-size: 110%; font-weight: bold; text-decoration: underline;'>" +
            this.searchText +
            "</span>"
        );
      else return this.post.body;
      // return this.post.body.replace(this.searchText, "XZZZZ");
    },
  },
};
</script>

<style scoped>
.post {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
}
.post__btns {
  display: flex;
}
</style>