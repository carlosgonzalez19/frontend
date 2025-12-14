<template>
  <section>
    <h2>Listado de juegos</h2>

    <form @submit.prevent="add">
      <input v-model="form.title" placeholder="Título" required />
      <input v-model="form.genre" placeholder="Género" />
      <input v-model.number="form.rating" type="number" step="0.1" min="0" max="10" placeholder="Nota" />
      <button>Añadir</button>
    </form>

    <ul v-if="games.length">
      <li v-for="g in games" :key="g.id" @click="select(g)" style="cursor:pointer">
        <strong>{{ g.title }}</strong> — {{ g.genre }} ({{ g.rating }})
      </li>
    </ul>
    <p v-else>Cargando…</p>

    <div v-if="selected" style="margin-top:1rem; padding:0.5rem; border:1px solid #ddd;">
      <h3>Detalle</h3>
      <p><b>ID:</b> {{ selected.id }}</p>
      <p><b>Título:</b> {{ selected.title }}</p>
      <p><b>Género:</b> {{ selected.genre }}</p>
      <p><b>Nota:</b> {{ selected.rating }}</p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchGames, fetchGame, createGame } from '../services/api'

const games = ref([])
const selected = ref(null)
const form = ref({ title: '', genre: '', rating: 0 })

async function load() {
  games.value = await fetchGames()
}

async function select(g) {
  selected.value = await fetchGame(g.id)
}

async function add() {
  const created = await createGame(form.value)
  games.value.push(created)
  form.value = { title: '', genre: '', rating: 0 }
}

onMounted(load)
</script>

<style>
form { display:flex; gap:.5rem; margin-bottom: .75rem; }
input { padding:.4rem; }
button { padding:.4rem .7rem; }
</style>
