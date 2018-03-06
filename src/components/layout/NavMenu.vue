<template>
  <div id="blogDropdown" class="navbar-dropdown">
    <div class="container is-fluid">
      <div class="columns">
        <div class="column">
          <h1 class="title is-6 is-mega-menu-title">Main Page</h1>
          <a class="navbar-item" href="#">
            <div class="navbar-content">
              <p class="has-text-info">Dashboard</p>
              <small>Admin general purpose page</small>
            </div>
          </a>
        </div>
        <div class="column">
          <h1 class="title is-6 is-mega-menu-title">Scan / Onboarding</h1>
          <a class="navbar-item" href="#">
            <div class="navbar-content">
              <p class="has-text-info">Scan Requests</p>
              <small>Scan IP ranges for hosts</small>
            </div>
          </a>
          <a class="navbar-item" href="#">
            <div class="navbar-content">
              <p class="has-text-info">Credential Lists</p>
              <small>Credentials used for scan requests</small>
            </div>
          </a>
          <a class="navbar-item" href="#">
            <div class="navbar-content">
              <p class="has-text-info">Onboard Requests</p>
              <small>Onboard hosts into backend system</small>
            </div>
          </a>
        </div>
        <div class="column">
          <h1 class="title is-6 is-mega-menu-title">Zones and Racks</h1>
          <a class="navbar-item" href="#">
            <div class="navbar-content">
              <p class="has-text-info">Zones List</p>
              <small>A list of datacenter zones</small>
            </div>
          </a>
          <a class="navbar-item" href="#">
            <div class="navbar-content">
              <p class="has-text-info">Rack List</p>
              <small>List of defined zone racks</small>
            </div>
          </a>
          <a class="navbar-item" href="#">
            <div class="navbar-content">
              <p class="has-text-info">Enclosure List</p>
              <small>List of defined enclosures for hosts</small>
            </div>
          </a>
        </div>
        <div class="column">
          <h1 class="title is-6 is-mega-menu-title">Hosts</h1>
          <a class="navbar-item" href="#">
            <div class="navbar-content">
              <p class="has-text-info">Hosts List</p>
              <small>A list of scanned hosts</small>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>


<style lang="scss" scoped>
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
