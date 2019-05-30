import Contactos from "./Contacto.js";
import Agenda  from "./Agenda.js";
class Main {
constructor() 
{
    //TAgenda es tablas de agenda
    let TAgenda = new Agenda( document.querySelector("#Agenda"), document.querySelector("#NumeroContactos"));
    document.querySelector("#Agregar").addEventListener("click", () => {
    let form = document.querySelector("#form");
    if (form.checkValidity() === true) 
    {
        let Nombre = document.querySelector("#nombre").value;
        let Correo = document.querySelector("#correo").value;
        let Numero = document.querySelector("#numero").value;
        let CumpleInicial = document.querySelector("#cumple").value;
        CumpleInicial = CumpleInicial.split("-");
        let Cumple = new Date(CumpleInicial[0], CumpleInicial[1] - 1, CumpleInicial[2]);
        let Descripcion = document.querySelector("#descripcion").value;
        let objContactos = {
        Nombre: Nombre,
        Correo: Correo,
        Numero: Numero,
        Cumple: Cumple,
        Descripcion: Descripcion
        };
        let Contacto = new Contactos(objContactos);
        TAgenda._AContacto(Contacto , TAgenda);
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
            TAgenda._Ordenar(Tipo);
        });
} 
}
new Main();
