<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Notes</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/" class="nav-link active" aria-current="page" href="#">Show</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/create" class="nav-link" href="#">Create</router-link>

        </li>
      </ul>
    </div>
  </div>
</nav>
<div class="container-fluid mt-3">
  <router-view/>
</div>

</template>

