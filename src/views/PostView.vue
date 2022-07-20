<template>
  <div class="container">
    <div class="d-flex justify-content-center align-items-center">
      <div class="bg-white rounded my-5">
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
              <a class="dropdown-item font-weight-bold" href="#"
                >Shpërndaje postimin</a
              >
            </div>
          </div>
        </div>
        <hr />
        <div class="py-2 px-5">
          <h5>{{ post.title }}</h5>
          <p class="text-secondary">{{ post.body }}</p>
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
              @click="readMoreComments()"
              v-if="post.comments.length > post.commentsSize"
            >
              Shiko më shumë komente
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PostView",
  props: {
    postId: Number,
  },
  data() {
    return {
      post: {},
    };
  },
  created() {
    this.getPost();
  },
  methods: {
    getPost() {
      axios
        .get("https://jsonplaceholder.typicode.com/posts", {
          params: {
            id: this.postId,
          },
        })
        .then((res) => {
          this.post = res.data[0];
          this.getCommentsAndUsers();
        });
    },
    getCommentsAndUsers() {
      axios
        .get("https://jsonplaceholder.typicode.com/comments", {
          params: { postId: this.postId },
        })
        .then((res) => {
          this.post["comments"] = res.data;
          this.post["commentsSize"] = 2;
        });
      axios
        .get("https://jsonplaceholder.typicode.com/users", {
          params: { id: this.post.userId },
        })
        .then((res) => {
          this.post["user"] = res.data[0];
        });
    },
    readMoreComments() {
      var currCommentsSize = this.post["commentsSize"];
      this.post["commentsSize"] = currCommentsSize + 2;
    },
  },
};
</script>

<style lang="scss">
@import "/src/styles/views/home.scss";
</style>
