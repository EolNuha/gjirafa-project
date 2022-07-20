<template>
  <div class="container">
    <div
      class="bg-white rounded px-5 my-5 d-flex align-items-center justify-content-between"
    >
      <div class="profile-pic mr-3"></div>
      <div
        class="position-relative"
        style="width: 90% !important; cursor: pointer"
      >
        <div data-toggle="modal" data-target="#postModal" class="input">
          Posto fotografi apo artikull
        </div>
        <i class="fa fa-picture-o"></i>
      </div>
    </div>
    <div
      v-for="(post, index) in posts"
      v-bind:key="post"
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
          v-bind:key="comment"
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
    <div class="text-center mb-5" v-show="totalPosts > pageSize">
      <button class="more-posts-btn" @click="getPosts(pageSize + 3)">
        {{ loadPostsText }}
      </button>
    </div>
    <!-- Modal -->
    <div
      class="modal fade bd-example-modal-lg"
      id="postModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="postModalLable"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="postModalLable">Posto artikull</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="createPost()">
            <div class="modal-body">
              <input
                type="text"
                placeholder="Titulli i artikullit"
                v-model="postTitle"
              />
              <textarea
                placeholder="Përmbajtja e artikullit"
                cols="50"
                rows="5"
                class="my-2"
                v-model="postBody"
              ></textarea>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Mbyll
              </button>
              <button type="submit" class="btn btn-orange" ref="postBtn">
                Posto
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import toastr from "toastr";

export default {
  name: "HomeView",
  data() {
    return {
      posts: [],
      totalPosts: 0,
      pageSize: 3,
      postTitle: "",
      postBody: "",
      loadPostsText: "Shiko më shumë postime",
    };
  },
  created() {
    this.getPosts(this.pageSize);
    this.getTotalPosts();
  },
  methods: {
    getPosts(pageSize) {
      this.loadPostsText = "Duke i ngarkuar...";
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
          this.loadPostsText = "Shiko më shumë postime";
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
    createPost() {
      this.$refs.postBtn.innerText = "Duke postuar...";
      axios
        .post(
          "https://jsonplaceholder.typicode.com/posts",
          {
            title: this.postTitle,
            body: this.postBody,
            userId: 1,
          },
          {
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        )
        .then((res) => {
          console.log(res);
          this.postTitle = "";
          this.postBody = "";
          this.$refs.postBtn.innerText = "Posto";
          toastr.success("Artikulli eshte postuar me sukses.", "Sukses!");
        })
        .catch((err) => {
          console.log(err);
          toastr.error("Ka ndodhur nje error, shiko consolen.", "Error!");
        });
    },
  },
};
</script>

<style lang="scss">
@import "/src/styles/views/home.scss";
</style>
