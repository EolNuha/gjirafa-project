<template>
  <div class="profile-header">
    <div class="white-profile-pic"></div>
    <div>
      <h4>{{ user.name }}</h4>
      <h4 class="text-secondary">@{{ user.username }}</h4>
    </div>
  </div>
  <div class="card tab-card">
    <div class="card-header tab-card-header d-flex justify-content-center">
      <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
        <li class="nav-item">
          <a
            class="nav-link active"
            id="profili-tab"
            data-toggle="tab"
            href="#profili"
            role="tab"
            aria-controls="Profili"
            aria-selected="true"
            >Profili</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="postimet-tab"
            data-toggle="tab"
            href="#postimet"
            role="tab"
            aria-controls="Postimet"
            aria-selected="false"
            >Postimet</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="galeria-tab"
            data-toggle="tab"
            href="#galeria"
            role="tab"
            aria-controls="Galeria"
            aria-selected="false"
            >Galeria</a
          >
        </li>
      </ul>
    </div>

    <div class="tab-content container" id="myTabContent">
      <div
        class="tab-pane fade show active p-3"
        id="profili"
        role="tabpanel"
        aria-labelledby="profili-tab"
      >
        <div class="bg-white rounded p-5 mt-5 d-flex justify-content-center">
          <table>
            <tbody>
              <tr>
                <td class="table-key">Email:</td>
                <td>{{ user.email }}</td>
              </tr>
              <tr>
                <td class="table-key">Address:</td>
                <td>
                  <table>
                    <tbody>
                      <tr>
                        <td class="table-key">Street:</td>
                        <td>{{ user.address.street }}</td>
                      </tr>
                      <tr>
                        <td class="table-key">Suite:</td>
                        <td>{{ user.address.suite }}</td>
                      </tr>
                      <tr>
                        <td class="table-key">City:</td>
                        <td>{{ user.address.city }}</td>
                      </tr>
                      <tr>
                        <td class="table-key">Zipcode:</td>
                        <td>{{ user.address.zipcode }}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td class="table-key">Phone:</td>
                <td>{{ user.phone }}</td>
              </tr>
              <tr>
                <td class="table-key">Website:</td>
                <td>{{ user.website }}</td>
              </tr>
              <tr>
                <td class="table-key">Company:</td>
                <td>{{ user.company.name }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div
        class="tab-pane fade p-3"
        id="postimet"
        role="tabpanel"
        aria-labelledby="postimet-tab"
      >
        <div
          v-for="post in posts"
          v-bind:key="post.id"
          class="bg-white rounded my-5"
        >
          <div class="d-flex justify-content-between align-items-center p-5">
            <div class="d-flex align-items-center">
              <div class="profile-pic"></div>
              <div class="ml-3">
                <p class="font-weight-bold m-0 text-dark">
                  {{ user.name }}
                </p>
                <span class="text-secondary">@{{ user.username }}</span>
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
            <hr />
            <p class="text-center text-secondary font-weight-bold my-3">
              {{ post.commentsLength }} komente
            </p>
          </div>
        </div>
        <div class="text-center mb-5" v-if="totalPosts > pageSize">
          <button class="more-posts-btn" @click="getPosts(pageSize + 3)">
            {{ btnText }}
          </button>
        </div>
      </div>
      <div
        class="tab-pane fade p-3"
        id="galeria"
        role="tabpanel"
        aria-labelledby="galeria-tab"
      >
        <h5 class="card-title">This is where the Galery would be!</h5>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserView",
  props: {
    userId: Number,
  },
  data() {
    return {
      user: {},
      posts: [],
      pageSize: 1,
      totalPosts: 0,
      btnText: "Duke i ngarkuar...",
    };
  },
  created() {
    this.getUser();
    this.getPosts(this.pageSize);
    this.getTotalPosts();
  },
  methods: {
    getUser() {
      axios
        .get("https://jsonplaceholder.typicode.com/users", {
          params: {
            id: this.userId,
          },
        })
        .then((res) => {
          this.user = res.data[0];
        });
    },
    getPosts(pageSize) {
      this.btnText = "Duke i ngarkuar...";
      axios
        .get("https://jsonplaceholder.typicode.com/posts", {
          params: {
            userId: this.userId,
            _start: 0,
            _limit: pageSize,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.posts = res.data;
          this.pageSize = pageSize;
          this.getCommentsLength();
          this.btnText = "Shiko me shumë postime";
        });
    },
    getCommentsLength() {
      this.posts.forEach((post, index) => {
        axios
          .get("https://jsonplaceholder.typicode.com/comments", {
            params: { postId: post.id },
          })
          .then((res) => {
            this.posts[index]["commentsLength"] = res.data.length;
          });
      });
    },
    getTotalPosts() {
      axios
        .get("https://jsonplaceholder.typicode.com/posts", {
          params: {
            userId: this.userId,
          },
        })
        .then((res) => {
          this.totalPosts = res.data.length;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/setup/variables.scss";

.profile-header {
  background-color: $morePostsBtn;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
}

.white-profile-pic {
  width: 100px;
  height: 100px;
  line-height: 100px;
  border-radius: 50%;
  background-color: $white;
  color: $white;
  margin: 2.5rem 0;
  box-shadow: 0px 1px 10px rgb(0 0 0 / 10%);
}

.card {
  background-color: transparent !important;
  border: none !important;
}

.card-header {
  background-color: $morePostsBtn !important;
}

.nav-link {
  background-color: transparent !important;
  color: $darkgray !important;
  font-size: 1.5rem !important;
  margin: 0 20px;
  text-align: center;
}

.nav-link:hover {
  border: none !important;
  border-bottom: 3px solid $darkgray !important;
}

.nav-link.active {
  border: none !important;
  border-bottom: 3px solid $orange !important;
  color: $orange !important;
}

.table-key {
  color: $darkgray;
  opacity: 0.6;
}

th,
td {
  padding: 0.5rem 2.2rem;
  font-weight: 900;
}

@media (max-width: 768px) {
  th,
  td {
    padding: 0.5rem 1.2rem;
    font-weight: 900;
  }
}
</style>
