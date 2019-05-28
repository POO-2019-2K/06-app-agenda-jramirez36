//nuestra pagina Main que redirige toda la informacion
//importacion de clases para su uso en el contructor
import Contactos from "./Contacto.js";
import Agenda  from "./Agenda.js";
class Main {
constructor() 
{
    //guardado de tabla Agenda y NumeroContactos para su uso en la pagina Agenda.js
    let TablasAgenda = new Agenda( document.querySelector("#Agenda"), document.querySelector("#NumeroContactos"));
    //funcion para el boton Agregar
    document.querySelector("#Agregar").addEventListener("click", () => {
    let form = document.querySelector("#form");
    // validacion para informacion
    if (form.checkValidity() === true) 
    {
        //invocacion de los valores necesarios
        let Nombre = document.querySelector("#nombre").value;
        let Correo = document.querySelector("#correo").value;
        let Numero = document.querySelector("#numero").value;
        // se usa split para la separación de la cadena.
        let CumpleInicial = document.querySelector("#cumple").value;
        CumpleInicial = CumpleInicial.split("-");
        // se rearma la cadena pero en la posicion que se ocupa 
        let Cumple = new Date(CumpleInicial[0], CumpleInicial[1] - 1, CumpleInicial[2]);
        let Descripcion = document.querySelector("#descripcion").value;
        // se crea nuestro paquete de datos
        let objContactos = {
        Nombre: Nombre,
        Correo: Correo,
        Numero: Numero,
        Cumple: Cumple,
        Descripcion: Descripcion
        };
        // se manda el paquete de datos a nuestra pagina contacto para que se hagan las funciones
        let Contacto = new Contactos(objContactos);
        //se manda la informacion que se mandara a contacto a la funcion AgregarContacto dentro de tablasAgenda para agregar contactos
        //aqui se agregan contactos 
        TablasAgenda._AgregarContacto(Contacto);
    }
    else
    {
        Swal.fire({
            type: "error" ,
            title: "falta alguna informacion importante",
            text: "no se a llenado un cuadro de informacion"
            })
    }
    form.classList.add("was-validated");
    });
    
    var select = document.getElementById("Tipo");
    select.addEventListener("change", () => {
    var Tipo = select.value;
        if(Tipo == "Nombre")
        {
            Tipo = 1;
        }
        else if(Tipo == "Edad")
        {
            Tipo = 2;
        }
        else
        {
            Swal.fire({
                type: "error" ,
                title: "No selecciono en que orden se ordenara la lista",
                text: "No selecciono en que orden se ordenara la lista por lo cual no se puede continuar"
                })
        }
        //se invoca la funcion ordenar
            TablasAgenda._Ordenar(Tipo);
        });
} 
}
//se da inicio al Main
new Main();
