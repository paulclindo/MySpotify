<template>
  <div id="app">
    <section class="home">
      <h1>My Spotify Music</h1>
      <select class="select-css" name id v-model="selectedCountry">
        <option :value="country.value" v-for="country in countries" :key>{{country.name}}</option>
      </select>
      <error v-show="error"></error>
      <spinner v-show="loading"></spinner>
      <div class="Artist">
        <artist v-for="artist in artists" :key="artist.mbid" :artist="artist"></artist>
      </div>
    </section>
  </div>
</template>
<script>
import getArtists from "./api";
import Artist from "./components/Artist";
import Spinner from "./components/Spinner";
import Error from "./components/Error";

export default {
  name: "app",
  components: {
    Artist,
    Spinner,
    Error
  },

  data() {
    return {
      loading: true,
      error: false,
      artists: [],
      countries: [
        {
          name: "Argentina",
          value: "argentina"
        },
        {
          name: "Colombia",
          value: "colombia"
        },
        {
          name: "Peru",
          value: "peru"
        }
      ],
      selectedCountry: "argentina"
    };
  },
  methods: {
    renderArtist() {
      this.loading = true;
      this.error = false;
      this.artists = [];

      getArtists(this.selectedCountry)
        .then(artists => {
          this.loading = false;
          this.artists = artists;
        })
        .catch(() => {
          this.loading = false;
          this.error = true;
        });
    }
  },
  mounted: function() {
    this.renderArtist();
  },
  watch: {
    selectedCountry() {
      this.renderArtist();
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Karla:400,700&display=swap");
$color-white: #fff;
$color-black: #b3b3b3;
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background: #5f2c82;
  background: -webkit-linear-gradient(to right, #49a09d, #5f2c82);
  background: linear-gradient(to right, #49a09d, #5f2c82);
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.home {
  font-family: "Karla", sans-serif;
  padding: 2em 0;
  color: $color-white;
}

h1 {
  font-weight: normal;
  font-size: 2em;
  text-transform: uppercase;
  color: $color-black;
}

.Artist {
  display: grid;
  margin: auto;
  max-width: 1200px;
  grid-template-columns: repeat(auto-fit, minmax(240px, auto));
  grid-gap: 0.8em;
  grid-row-gap: 2em;
  a {
    color: $color-white;
    text-decoration: none;
    font-weight: 700;
    font-size: 0.8em;
    margin: 0;
  }
  &__title {
    transition: 0.8s;
    &:hover {
      transform: scale(1.1);
    }
  }

  &__image {
    display: block;
    margin: auto;
    transition: 1s;
    &:hover {
      transform: rotateZ(90deg);
    }
  }
  &__number {
    margin: 0.2em auto;
  }
}
.select-css {
  display: block;
  font-size: 16px;
  font-family: sans-serif;
  font-weight: 700;
  color: #444;
  line-height: 1.3;
  padding: 0.6em 1.4em 0.5em 0.8em;
  width: 200px;
  max-width: 200px;
  box-sizing: border-box;
  margin: 0;
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
  border-radius: 0.5em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
    linear-gradient(to bottom, #ffffff 0%, #e5e5e5 100%);
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
  margin: auto;
}
.select-css::-ms-expand {
  display: none;
}
.select-css:hover {
  border-color: #888;
}
.select-css:focus {
  border-color: #aaa;
  box-shadow: 0 0 1px 1px $color-black;
  box-shadow: 0 0 0 3px -moz-mac-focusring;
  color: #222;
  outline: none;
}
.select-css option {
  font-weight: normal;
}
</style>
