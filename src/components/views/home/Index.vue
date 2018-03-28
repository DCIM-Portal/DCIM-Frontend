<template>
  <div class="container">
  <div class="columns">
    <div class="column is-2">
      <section class="section">
        <aside class="menu">
          <p class="menu-label">General</p>
          <ul class="menu-list">
            <li><a href="#">Dashboard</a></li>
            <li><a href="#">Customers</a></li>
          </ul>
          <p class="menu-label">Administration</p>
          <ul class="menu-list">
            <li><a href="#">Team Settings</a></li>
            <li><a class="is-active" href="#">Manage Your Team</a>
              <ul>
                <li><a href="#">Members</a></li>
                <li><a href="#">Plugins</a></li>
                <li><a href="#">Add a member</a></li>
              </ul>
            </li>
            <li><a href="#">Invitations</a></li>
            <li><a href="#">Authentication</a></li>
          </ul>
          <p class="menu-label">Transactions</p>
          <ul class="menu-list">
            <li><a href="#">Payments</a></li>
            <li><a href="#">Transfers</a></li>
            <li><a href="#">Balance</a></li>
          </ul>
        </aside>
      </section>
    </div>
    <div class="column is-10">
      <section class="section">
        <div class="heading">
          <h1 class="title">Section</h1>
          <h2 class="subtitle">A simple container to divide your page into <strong>sections</strong>, like the one you're currently reading</h2>
        </div><br/>
        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <article class="tile is-child box">
              <p class="title">One</p>
              <p class="subtitle">Subtitle</p>
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child box">
              <p class="title">Two</p>
              <p class="subtitle">Subtitle</p>
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child box">
              <p class="title">Three</p>
              <p class="subtitle">Subtitle</p>
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child box">
              <p class="title">Four</p>
              <p class="subtitle">Subtitle</p>
            </article>
          </div>
        </div>
        <div class="tile is-ancestor">
          <div class="tile is-vertical is-9">
            <div class="tile">
              <div class="tile is-parent">
                <article class="tile is-child box">
                  <p class="title">Five</p>
                  <p class="subtitle">Subtitle</p>
                  <div class="content">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper diam at erat pulvinar, at pulvinar felis blandit. Vestibulum volutpat tellus diam, consequat gravida libero rhoncus ut. Morbi maximus, leo sit amet vehicula eleifend, nunc
                      dui porta orci, quis semper odio felis ut quam.
                    </p>
                  </div>
                </article>
              </div>
              <div class="tile is-8 is-vertical">
                <div class="tile">
                  <div class="tile is-parent">
                    <article class="tile is-child box">
                      <p class="title">Six</p>
                      <p class="subtitle">Subtitle</p>
                    </article>
                  </div>
                  <div class="tile is-parent">
                    <article class="tile is-child box">
                      <p class="title">Seven</p>
                      <p class="subtitle">Subtitle</p>
                    </article>
                  </div>
                </div>
                <div class="tile is-parent">
                  <article class="tile is-child box">
                    <p class="title">Eight</p>
                    <p class="subtitle">Subtitle</p>
                  </article>
                </div>
              </div>
            </div>
            <div class="tile">
              <div class="tile is-8 is-parent">
                <article class="tile is-child box">
                  <p class="title">Nine</p>
                  <p class="subtitle">Subtitle</p>
                  <div class="content">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
                  </div>
                </article>
              </div>
              <div class="tile is-parent">
                <article class="tile is-child box">
                  <p class="title">Ten</p>
                  <p class="subtitle">Subtitle</p>
                  <div class="content">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
                  </div>
                </article>
              </div>
            </div>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child box">
              <div class="content">
                <p class="title">Eleven</p>
                <p class="subtitle">Subtitle</p>
                <div class="content">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper diam at erat pulvinar, at pulvinar felis blandit. Vestibulum volutpat tellus diam, consequat gravida libero rhoncus ut. Morbi maximus, leo sit amet vehicula eleifend, nunc
                    dui porta orci, quis semper odio felis ut quam.
                  </p>
                  <p>
                    Integer sollicitudin, tortor a mattis commodo, velit urna rhoncus erat, vitae congue lectus dolor consequat libero. Donec leo ligula, maximus et pellentesque sed, gravida a metus. Cras ullamcorper a nunc ac porta. Aliquam ut aliquet lacus, quis
                    faucibus libero. Quisque non semper leo.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>

  </div>
</div>
</template>

<script>

export default {
  data () {
    return {
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
