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
                    <tbody class="tbody" id="contenido">
                        <tr class="mt-3" v-for="(note, i) in notes" :key="note.id">
                            <td style="color: blueviolet;">{{ i + 1 }}</td>
                            <td><b>{{ note.title }}</b> </td>
                            <td >{{ note.description }}</td>
                            <td class="text-center">{{ note.created_at }}</td>
                            <td>
                                <router-link :to="{ path: 'edit/' + note.id }" class="btn btn-custom btn-edit">
                                    <i class="fa-regular fa-pen-to-square"></i>
                                </router-link>&nbsp;
                                
                                <button class="btn btn-custom btn-delete"v-on:click="deleteNote(note.id, note.title)">
                                    <i class="fa-regular fa-trash-can"></i>
                                </button>

                                <button class="btn btn-custom btn-archive" v-on:click="archiveNote(note.id)">
                                    <i class="fa-solid fa-archive"></i> 
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
body{
    background-color: #faf8ff;
}
.btn-custom {
    border-radius: 20px;
    padding: 8px 12px;
    font-size: 14px;
}

.btn-edit {
    background-color: none;
    color: #ffbb00;
    font-size: 18px;
}

.btn-edit:hover {
    background-color: #ffe082;
    color: rgb(48, 48, 48);
}

.btn-delete {
    background-color: none;
    font-size: 18px;
    color: #ae1717;
}

.btn-delete:hover {
    background-color: #ff6d6d;
}

.btn-archive {
    background-color: none;
    color: #333;
    font-size: 18px;
}

.btn-archive:hover {
    background-color: #9dce7d;
}

</style>



<script>
import axios from 'axios';
import { confirmar, archiveNote } from '@/functions';

export default {
    data() {
        return {
            notes: []
        }
    },

    mounted() {
        this.getNotes();
    },

    methods: {
        getNotes() {
            axios.get('http://127.0.0.1:8000/api/notes')
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

        deleteNote(id, title) {
            confirmar(id, title);
        },

        archiveNote(id) {
            console.log(`Archiving note with ID: ${id}`);
            archiveNote(id)
                .then(response => {
                    if (response.status === 200) {
                        this.getNotes(); // Recarga la lista de notas
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }
}
</script>
