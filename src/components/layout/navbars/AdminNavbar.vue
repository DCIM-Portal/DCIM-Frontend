<template>
  <nav class="navbar">
    <div class="navbar-item has-dropdown is-hoverable is-mega">
      <div class="navbar-link">
        <img src="../../assets/img/logo.svg" alt="SDCG Management Portal">
        SDCG Management Portal
      </div>
      <div id="blogDropdown" class="navbar-dropdown">
        <div class="container is-fluid">
          <div class="columns">
            <div class="column">
              <h1 class="title is-6 is-mega-menu-title">Sub Menu Title</h1>
              <a class="navbar-item" href="/2017/08/03/list-of-tags/">
                <div class="navbar-content">
                  <p>
                    <small class="has-text-info">03 Aug 2017</small>
                  </p>
                  <p>New feature: list of tags</p>
                </div>
              </a>
              <a class="navbar-item" href="/2017/08/03/list-of-tags/">
                <div class="navbar-content">
                  <p>
                    <small class="has-text-info">03 Aug 2017</small>
                  </p>
                  <p>New feature: list of tags</p>
                </div>
              </a>
              <a class="navbar-item" href="/2017/08/03/list-of-tags/">
                <div class="navbar-content">
                  <p>
                    <small class="has-text-info">03 Aug 2017</small>
                  </p>
                  <p>New feature: list of tags</p>
                </div>
              </a>
            </div>
            <div class="column">...</div>
            <div class="column">...</div>
            <div class="column">...</div>
          </div>
        </div>
      </div>
    </div>

  </nav>
</template>

<script>
export default {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.navbar-item.is-mega {
  position: static;
  .is-mega-menu-title {
    margin-bottom: 0;
    padding: .375rem 1rem;
  }
}

.navbar-link img {
  margin-right: 0.5rem;
}
</style>
