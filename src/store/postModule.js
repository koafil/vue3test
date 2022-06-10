export const postModule = {
  state: () => ({
    posts: [],
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
  }),

  getters: {
    sortedPosts(state) {
      if (state.selectedSort === "id")
        return [...state.posts].sort((post1, post2) => post1.id > post2.id);
      else
        return [...state.posts].sort((post1, post2) =>
          post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
        );
    },
    sortedAndSearchedPosts(state, getters) {
      return getters.sortedPosts.filter((post) =>
        post.body.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
  },
  
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setLoading(state, bool) {
      state.isPostsLoading = bool;
    },
    setPage(state, page) {
      state.page = page;
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort;
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages;
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery;
    },

  },
  
  actions: {
    fetchPosts({state , commit}) {
      setTimeout(() => {
        commit('setLoading',true);
        // fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
        let url = new URL("https://jsonplaceholder.typicode.com/posts");
        url.searchParams.set("_page", state.page);
        url.searchParams.set("_limit", state.limit);
        fetch(url)
          .then((response) => {
            commit('setTotalPages',
              Math.ceil(response.headers.get("x-total-count") / state.limit));
            // this.totalPages = Math.ceil(
            //   response.headers.get("x-total-count") / this.limit
            //);
            return response.json();
          })
          .then((json) => (commit('setPosts', json)))
          // .then((json) => (this.posts = json))
          .catch(() => alert("Error"))
          .finally(() => {commit('setLoading',false);});
      }, 100);
    },
    loadMorePosts({state , commit}) {
      setTimeout(() => {
        commit('setPage',state.page + 1);
        // this.page++;
        let url = new URL("https://jsonplaceholder.typicode.com/posts");
        url.searchParams.set("_page", state.page);
        url.searchParams.set("_limit", state.limit);
        fetch(url)
          .then((response) => {
            commit('setTotalPages', 
              Math.ceil(response.headers.get("x-total-count") / state.limit));
            return response.json();
          })
          .then((json) => {
            commit('setPosts',[...state.posts,...json]);
          })
          .catch(() => alert("Error"))
          .finally();
      }, 100);
    },

  },
  namespaced: true
};