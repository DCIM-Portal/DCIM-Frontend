<template>
  <div class="columns">
    <slot name="menu-content"/>
  </div>
</template>

<script>
export default {

}
</script>


<style lang="scss" scoped>
// Mega-menu style customizations
.hero {
  .is-mega-menu-title {
    margin-bottom: 0;
    padding: .375rem 1rem;
    color: #363636;
  }
  a:not(.button):not(.dropdown-item):not(.tag) {
    color: black;
  }
}
.has-text-info {
  color: #456c86 !important;
}
.hero.is-info a.navbar-item:hover {
  background-color: #f5f5f5;
}

// IE fix for columns in mobile view
@media only screen and (max-width: 1024px) {
  _:-ms-fullscreen, :root .columns:not(.is-desktop) {
    display: block !important;
  }
}

// General screen fixes
@media screen and (max-width: 1024px) {
  .hero {
    .is-mega-menu-title {
      color: rgba(255, 255, 255, 0.9);
    }
    a:not(.button):not(.dropdown-item):not(.tag) {
      color: #b9b9b9;
    }
  }
  .has-text-info {
    color: #91c8ec !important;
  }
  .hero.is-info a.navbar-item:hover {
    background-color: #f5f5f521;
  }
}
</style>
