<template>
  <section class="hero is-info is-bold">
    <div class="hero-body">
      <div class="container">
        <h1 class="title is-2 is-uppercase">
          <img class="is-pulled-left" width="45" src="@/assets/img/logo.svg">
          SDCG Labs<br>
          <p class="subtitle is-4 is-capitalized">Datacenter Management Portal</p>
        </h1>
      </div>
    </div>

    <div class="hero-foot">
      <nav class="tabs is-boxed is-small">
        <div class="container">
          <ul>
            <li class="is-active"><a>Home</a></li>
            <li><a>Catalog</a></li>
            <li><a>Documentation</a></li>
            <li><a>Admin</a></li>
          </ul>
        </div>
      </nav>
    </div>

  </section>
</template>

<script>
export default {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hero.is-info.is-bold {
  background-image:
    linear-gradient(140deg, #243b42 50%, #456c86 100%);
}
.hero.is-info .tabs.is-boxed li.is-active a,
.hero.is-info .tabs.is-boxed li.is-active a:hover,
.hero.is-info .tabs.is-toggle li.is-active a,
.hero.is-info .tabs.is-toggle li.is-active a:hover {
  background-color: #f5f5f5;
  border-color: #f5f5f5;
  color: #456c86;
}

</style>
