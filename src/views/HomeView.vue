<template>
    <div class="row">
        <div class="col-lg-8 offset-lg-2">
            <div class="table-responsive">
                <table class="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>TITLE</th>
                            <th>DESCRIPTION</th>
                            <th>CREATED AT</th> <!-- Cambia 'ACTIONS' por 'CREATED AT' -->
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider" id="contenido">
                        <tr v-for="(note, i) in notes" :key="note.id">
                            <td>{{ i + 1 }}</td>
                            <td>{{ note.title }}</td>
                            <td>{{ note.description }}</td>
                            <td>{{ note.created_at }}</td> <!-- Muestra la fecha formateada -->
                            <td>
                                <router-link :to="{path:'edit/'+note.id}" class="btn btn-warning">
                                    <i class="fa-solid fa-edit"></i>
                                </router-link>&nbsp;
                                <button class="btn btn-danger" v-on:click="deleteNote(note.id, note.title)">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
import { confirmar } from '@/functions';

export default {
    data() {
        return {
            notes: []  // Cambia null a un array vacío
        }
    },

    mounted() {
        this.getNotes();
    },

    methods: {
        getNotes() {
            axios.get('http://127.0.0.1:8000/api/notes')
                .then(response => {
                    // Formatea las fechas de cada nota
                    this.notes = response.data.notes.map(note => ({
                        ...note,
                        created_at: this.formatTimestamp(note.created_at),
                        updated_at: this.formatTimestamp(note.updated_at)
                    }));
                })
                .catch(error => {
                    console.error(error);
                });
        },

        formatTimestamp(timestamp) {
            // Usando toLocaleString para un formato más legible
            const date = new Date(timestamp);
            return date.toLocaleString(); // Puedes personalizar el formato si es necesario
        },

        deleteNote(id, title) {
            confirmar(id, title);
        }
    }


}
</script>
