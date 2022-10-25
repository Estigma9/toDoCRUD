
const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#lista');
const elemento = document.querySelector('#elemento');
const input = document.querySelector('#input');
const botonEnter = document.querySelector('#boton-enter');
const check = 'fa-check-circle';
const uncheck = 'fa-circle';
const lineThrougt = 'line-through';

let id = 0;



//Creación de fecha actualizada
const FECHA = new Date();
fecha.innerHTML = FECHA.toLocaleDateString('es', {
    weekday: 'long', 
    month: 'short',
    day: 'numeric'
});


//Función Agregar Tarea

function agregarTarea(tarea, id, realizado, eliminado) {

    if(eliminado){return} // Si existe eliminado es true si no es false

    const REALIZADO = realizado ? check : uncheck; //Si realizado true check, false uncheck

    const LINE = realizado ? lineThrougt : '';

    const elemento = `
                        <li id="elemento">
                            <i  class="far ${REALIZADO} co" 
                            data="realizado"
                            id="${id}"
                            >
                            </i>
                            <p class="text ${LINE}">${tarea}</p>
                            <i  class="fas fa-trash de"
                                data="eliminado"
                                id="${id}"
                            >
                            </i>
                        </li>
                    `
    lista.insertAdjacentHTML("beforeend", elemento);

};


//Función Tarea Realizada

function tareaRealizada(element){
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector('.text').classList.toggle(lineThrougt);

}

//Función Tarea Eliminada

function tareaEliminada(element){
    // console.log(element.parentNode);
    // console.log(element.parentNode.parentNode);
    element.parentNode.parentNode.removeChild(element.parentNode);

}



//Crear eventos para el enter en el input y el click en el boton

botonEnter.addEventListener('click', ()=> {
    const tarea = input.value;
    
    if (tarea){
        agregarTarea(tarea, id, false, false);


        input.value = '';
        id++;
    }


});


document.addEventListener('keyup', function(event) {
    if(event.key == 'Enter'){
        const tarea = input.value;
    
        if (tarea){
            agregarTarea(tarea, id, false, false);


            input.value = '';
            id++;
        }

    }

});


// Evento para cambiar estado de la tarea y eliminar tarea

lista.addEventListener('click', function(event){
    const element = event.target;
    const elementData = element.attributes.data.value;
    console.log(elementData);

    if(elementData == 'realizado'){
        tareaRealizada(element);
    }
    else if(elementData == 'eliminado'){
        tareaEliminada(element);
        console.log("eliminado");
    }

    // console.log(element);
    // console.log(element.attributes);
    // console.log(element.attributes.data);
    // console.log(element.attributes.data.value);
    
});

