<template>
  <div>
    <button id="butt-lang" @click="set('trad')">
      {{ this.getName("trad").on ? "fr" : "en" }}
    </button>
    <div class="ctn-butt-projet">
      <button
        v-for="(projet, i) in this.$store.state.projets"
        :key="i"
        @click="enableProject(projet.id)"
        class="butt-projet"
        :class="projet.on ? 'projet-on' : 'projet-off'"
      >
        {{ projet.id }}
      </button>
    </div>
    <ul>
      <section
        class="projet"
        v-for="(projet, i) in this.$store.state.projets"
        :key="i"
      >
        <li v-if="projet.on">
          <hr />
          {{ getName("trad").on ? projet.fr.nom : projet.en.nom }}
          <br />
          <div v-html="getName('trad').on ? projet.fr.desc : projet.en.desc ">
          </div>
        </li>
      </section>
    </ul>
    <!-- <ul>
      <hr />
      <li v-for="(page, i) in pages" :key="i">
        {{ page.slug }}
        <br />
        {{ page }}
        <hr />
      </li>
    </ul> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "IndexPage",
  head() {},
  async asyncData({ $content }) {
    const pages = await $content().fetch();
    console.log(pages);
    return {
      pages,
    };
  },
  methods: {
    enableProject: function (project) {
      this.$store.commit("SWITCH", this.getProjectName(project));
    },
    set: function (arg) {
      const res = this.getName(arg);
      if (arg === "darkmode") {
        if (res.on) {
          this.$colorMode.preference = "dark";
        } else {
          this.$colorMode.preference = "light";
        }
      }
      this.$store.commit("SWITCH", res);
    },
  },
  mounted() {
    var MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();
    for (let i = 0; i < this.pages.length; i++) {
      // console.log(this.pages, this.pages[i]);
      this.pages[i].en.desc = md.render(this.pages[i].en.desc || '')
      this.pages[i].fr.desc = md.render(this.pages[i].fr.desc || '')
      this.$store.commit("ADD_PROJET", this.pages[i]);
    }
  },
  computed: {
    ...mapGetters({
      getName: "getName",
      getProjectName: "getProjectName",
    }),
  },
};
</script>
<style >
.ctn-butt-projet {
  width: 100%;
  display: inline-block;
}
button:hover {
  padding: 50px;
}
.butt-projet {
  float: left;
}
button {
  padding: 10px;
  border-radius: 0;
  background-color: #fff;
  border: 1px solid black;
}
.projet-on {
  background-color: yellowgreen;
}
.projet-off {
  text-decoration: line-through;
  background-color: fuchsia;
}
p {
  display: inline-block;
  width: 100%;
  margin: 0;
}
p:not(:first-child){
  text-indent : 20px;
}
#butt-lang {
  position: absolute;
  right: 0;
  top: 0;
}
@media print {
  button {
    display: none;
  }
}
</style>

