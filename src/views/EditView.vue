<template style="background-color: #faf8ff;">
    <div class="row mt-3">
        <div class="col-md-6 offset-md-3">

            <div class="card">
                <div class="card-header bg-dark text-white text-center">Editar Nota</div>
                <div class="card-body">
                    <form v-on:submit="saveNote">
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-pencil"></i></span>
                            <input type="text" v-model="title" id="title" class="form-control" maxlength="50"
                                placeholder="Title" required>
                        </div>

                        <div class="input-group mb-3">
                            <textarea name="" v-model="description" class="form-control" id="description"
                                placeholder="Description" maxlength="50"></textarea>
                        </div>

                        <div class="d-grid col-6 mx-auto">
                            <button class="btn btn-success"> <i class="fa-solid fa-floppy-disk"></i> Guardar</button>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { enviarSolicitud, show_alerta } from '../functions';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default {

    data() {
        return {
            id: 0,
            title: '',
            description: '',
            url: 'http://127.0.0.1:8000/api/notes'
        }
    },

    mounted() {
        const route = useRoute();
        this.id = route.params.id;
        this.url = this.url + '/' + this.id;
        this.getNote();
    },

    methods: {
        getNote() {
            console.log("URL de la petición: ", this.url);
            axios.get(this.url).then(
                response => {
                    console.log("Respuesta completa de la API:", response.data);

                    // Accede al objeto 'note' dentro de la respuesta
                    if (response.data && response.data.note) {
                        const note = response.data.note; // Accede al objeto note
                        this.title = note.title;
                        this.description = note.description;

                        console.log("Nota obtenida: ", note);
                    } else {
                        console.error("No se encontró el objeto 'note' en la respuesta");
                    }
                }
            ).catch(error => {
                console.error("Error al obtener la nota:", error);
            });
        },

        saveNote() {
            event.preventDefault();
            if (this.title.trim() === '') {
                show_alerta('Escribe el nombre', 'waring', 'nombre')
            } else if (this.description.trim() === '') {
                show_alerta('Escribe la descripción', 'waring', 'description')
            } else {
                var parametros = { title: this.title.trim(), description: this.description.trim() }
                enviarSolicitud('PUT', parametros, this.url, 'Nota guardada')
            }
        }
    }
}

</script>