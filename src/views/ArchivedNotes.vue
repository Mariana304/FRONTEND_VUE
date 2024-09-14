<template>
    <div class="row">
        <div class="col-lg-9 offset-lg-2 mt-3">
            <div class="table-responsive">
                <table class="table table-xl table-striped align-middle table-hover table-custom ">
                    <thead>
                        <tr>
                            <th style="color: blueviolet;">#</th>
                            <th>TITLE</th>
                            <th>DESCRIPTION</th>
                            <th>CREATED AT</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider" id="contenido">
                        <tr v-for="(note, i) in notes" :key="note.id">
                            <td style="color: blueviolet;">{{ i + 1 }}</td>
                            <td>{{ note.title }}</td>
                            <td>{{ note.description }}</td>
                            <td>{{ note.created_at }}</td>
                            <td>
                                <button class="btn btn-unarchive btn-custom" v-on:click="unarchiveNote(note.id)">
                                    <i class="fa-solid fa-undo"></i> Desarchivar
                                </button>

                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped>
.btn-custom {
    border-radius: 10px;
    padding: 8px 12px;
    font-size: 15px;
}
.btn-unarchive {
    background-color: #9dce7d;
    color: #ffffff;
    font-weight: 400;
}

.btn-unarchive:hover {
    background-color: #92be74;
}
</style>

<script>
import axios from 'axios';
import { show_alerta } from '@/functions';

export default {
    data() {
        return {
            notes: []
        }
    },

    mounted() {
        this.getArchivedNotes();
    },

    methods: {
        getArchivedNotes() {
            axios.get('http://127.0.0.1:8000/api/notes/archived')
                .then(response => {
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
            const date = new Date(timestamp);
            return date.toLocaleString();
        },

        unarchiveNote(id) {
            axios.put(`http://127.0.0.1:8000/api/notes/${id}/unarchive`)
                .then(response => {
                    show_alerta(response.data.message, 'success');
                    this.getArchivedNotes(); // Actualiza la lista de notas archivadas
                })
                .catch(error => {
                    console.error(error);
                    show_alerta('Error al desarchivar la nota', 'error');
                });
        }
    }
}
</script>
