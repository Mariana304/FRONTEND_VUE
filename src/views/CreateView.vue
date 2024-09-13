<template>
    <div class="row mt-3">
        <div class="col-md-6 offset-md-3">

            <div class="card">
                <div class="card-header bg-dark text-white text-center">Crear Nota</div>
                <div class="card-body">
                    <form v-on:submit="saveNote">
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-pencil"></i></span>
                            <input type="text" v-model="title" id="title" class="form-control" maxlength="50" placeholder="Title"
                                required>
                        </div>

                        <div class="input-group mb-3">
                            <textarea name="" v-model="description" class="form-control" id="description" placeholder="Description"
                                maxlength="50"></textarea>
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
import { confirmar, enviarSolicitud, show_alerta } from '@/functions';

export default{
    data(){
        return{
            title:'',description:'',url:'http://127.0.0.1:8000/api/notes'
        }
    }, methods:{
        saveNote(){
            event.preventDefault();
            if(this.title.trim() === ''){
                show_alerta('Escribe el nombre', 'waring', 'nombre')
            }else if(this.description.trim() === ''){
                show_alerta('Escribe la descripción', 'waring', 'description')
            }else{
                var parametros = {title:this.title.trim(),description: this.description.trim()}
                enviarSolicitud('POST',parametros,this.url,'Nota guardada')
            }
        }
    }
}

</script>