<template>
  <nav class="navbar navbar-expand-lg ">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <router-link to="/" class="nav-link active text-white" aria-current="page" href="#">Notes</router-link>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/create" class="nav-link text-white" href="#">Create</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/archived" class="nav-link text-white">Archived Notes</router-link> <!-- Nuevo enlace -->
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container-fluid">
    <router-view />
  </div>

</template>

<style scoped>
.navbar {
  background-color: #715CC4;
}

.nav-item {
  color: white !important
}
</style>
