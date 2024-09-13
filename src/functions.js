import Swal from "sweetalert2";
import axios from "axios";

export function show_alerta(mensaje,icono,foco=''){
    if(foco !== ''){
        document.getElementById(foco).focus();
    }
    Swal.fire({
        title:mensaje,
        icon:icono,
        customClass: {confirmButton:'btn btn-primary', popup:'animated zoomIn'},
        buttonsStyling:false
    });
}

export function confirmar(id, title) {
    var url = 'http://127.0.0.1:8000/api/notes/' + id;

    const swalWhithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success me-3', 
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    });

    swalWhithBootstrapButtons.fire({
        title: '¿Seguro quieres eliminar la nota: ' + title + '?',
        text: 'La nota se eliminará para siempre',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '<i class="fa-solid fa-check">  Sí, eliminar</i>',
        cancelButtonText: '<i class="fa-solid fa-ban">  Cancelar</i>'
    }).then((result) => {
        if (result.isConfirmed) {
            // Llamamos a la función para eliminar la nota
            enviarSolicitud('DELETE', { id: id }, url, 'Nota eliminada');
        } else {
            show_alerta('Operación cancelada', 'info');
        }
    });
}

export function enviarSolicitud(metodo, parametros, url, mensaje) {
    axios({ method: metodo, url: url, data: parametros })
        .then(function (respuesta) {
            // Depura toda la respuesta
            console.log('Respuesta completa:', respuesta.data);

            // Asegúrate de que el servidor devuelva un objeto con `status` y `message`
            const { status, message } = respuesta.data;

            console.log(status);

            if (status === 200) {
                show_alerta(message, 'success');
                // Actualiza la interfaz para eliminar el elemento sin recargar la página
                window.setTimeout(function () {
                    window.location.href = '/';  // Redirigir después de un segundo (puedes eliminar esto si quieres evitar la recarga)
                }, 1000);
            } else {
                show_alerta(message, 'error');
            }
        })
        .catch(function (error) {
            console.error('Error en la solicitud:', error.response);  // Muestra el error completo en consola
            if (error.response) {
                // Si la solicitud se realizó y el servidor respondió con un código de estado fuera del rango 2xx
                show_alerta('Error del servidor: ' + error.response.data.message, 'error');
            } else if (error.request) {
                // La solicitud fue hecha pero no hubo respuesta
                show_alerta('No se recibió respuesta del servidor', 'error');
            } else {
                // Algo sucedió al configurar la solicitud que desencadenó un error
                show_alerta('Error en la solicitud', 'error');
            }
        });
}
