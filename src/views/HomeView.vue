<template>
  <div class="container">
    <div
      class="bg-white rounded px-5 my-5 d-flex align-items-center justify-content-between"
    >
      <div class="profile-pic mr-3"></div>
      <div class="position-relative" style="width: 90% !important">
        <input type="text" placeholder="Posto fotografi apo artikull" />
        <i class="fa fa-picture-o"></i>
      </div>
    </div>
    <div
      v-for="(post, index) in posts"
      v-bind:key="post.id"
      class="bg-white rounded my-5"
    >
      <div class="d-flex justify-content-between align-items-center p-5">
        <div class="d-flex align-items-center">
          <div class="profile-pic"></div>
          <div class="ml-3">
            <router-link
              :to="{ name: 'user', params: { userId: post.user.id } }"
            >
              <p class="font-weight-bold m-0 text-dark">
                {{ post.user.name }}
              </p>
              <span class="text-secondary">@{{ post.user.username }}</span>
            </router-link>
          </div>
        </div>
        <div class="dropleft">
          <i
            class="fa fa-ellipsis-v"
            role="button"
            id="dropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          ></i>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <router-link
              :to="{ name: 'post', params: { postId: post.id } }"
              class="dropdown-item font-weight-bold"
              >Vizitoni postimin</router-link
            >
            <hr />
            <a class="dropdown-item font-weight-bold" href="#"
              >Shpërndaje postimin</a
            >
          </div>
        </div>
      </div>
      <hr />
      <div class="py-2 px-5">
        <router-link
          :to="{ name: 'post', params: { postId: post.id } }"
          class="post-link"
        >
          <h5>{{ post.title }}</h5>
          <p class="text-secondary">{{ post.body }}</p>
        </router-link>
        <input type="text" placeholder="Komento në këtë postim" />
        <p class="text-center text-secondary font-weight-bold mb-3">
          {{ post.comments.length }} komente
        </p>
        <hr />
        <div
          v-for="(comment, index) in post.comments"
          v-bind:key="comment.id"
          class="comment"
        >
          <div v-if="index < post.commentsSize">
            <div class="d-flex justify-content-between">
              <h5>{{ comment.email }}</h5>
              <i class="fa fa-ellipsis-v text-secondary"></i>
            </div>
            <p class="text-secondary pr-2">{{ comment.body }}</p>
          </div>
        </div>
        <div class="text-center">
          <button
            class="more-comments-btn"
            @click="readMoreComments(index)"
            v-if="post.comments.length > post.commentsSize"
          >
            Shiko më shumë komente
          </button>
        </div>
      </div>
    </div>
    <div class="text-center mb-5" v-if="totalPosts > pageSize">
      <button class="more-posts-btn" @click="getPosts(pageSize + 3)">
        {{ btnText }}
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HomeView",
  data() {
    return {
      posts: [],
      totalPosts: 0,
      pageSize: 3,
      btnText: "Shiko me shumë postime",
    };
  },
  created() {
    this.getPosts(this.pageSize);
    this.getTotalPosts();
  },
  methods: {
    getPosts(pageSize) {
      this.btnText = "Duke i ngarkuar...";
      axios
        .get("https://jsonplaceholder.typicode.com/posts", {
          params: {
            _start: 0,
            _limit: pageSize,
          },
        })
        .then((res) => {
          this.posts = res.data;
          this.pageSize = pageSize;
          this.getCommentsAndUsers();
          this.addCommentSize();
          this.btnText = "Shiko me shumë postime";
        });
    },
    getCommentsAndUsers() {
      this.posts.forEach((post, index) => {
        axios
          .get("https://jsonplaceholder.typicode.com/comments", {
            params: { postId: post.id },
          })
          .then((res) => {
            this.posts[index]["comments"] = res.data;
          });
        axios
          .get("https://jsonplaceholder.typicode.com/users", {
            params: { id: post.userId },
          })
          .then((res) => {
            this.posts[index]["user"] = res.data[0];
          });
      });
    },
    addCommentSize() {
      this.posts = this.posts.map((obj) => ({ ...obj, commentsSize: 2 }));
    },
    getTotalPosts() {
      axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
        this.totalPosts = res.data.length;
      });
    },
    readMoreComments(postIndex) {
      var currCommentsSize = this.posts[postIndex]["commentsSize"];
      this.posts[postIndex]["commentsSize"] = currCommentsSize + 2;
    },
  },
};
</script>

<style lang="scss">
@import "/src/styles/views/home.scss";
</style>
