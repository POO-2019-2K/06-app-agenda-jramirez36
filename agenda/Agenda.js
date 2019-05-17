//se importa la informacion de contactos para poder ser utilizada
import Contactos from "./Contacto.js";
//comando export para poder exportar la clase
export default class Agenda {
    //constructor donde se resiven las tablas en las que se imprimira
    constructor(tablaAgenda, tablaNumeroContactos) {
    this._tablaAgenda = tablaAgenda;
    this._tablaNumeroContactos = tablaNumeroContactos;
    //el iniciador sirve para revisar el localStorage
    this._iniciadorDeTablas();
}

    _iniciadorDeTablas() 
    {
        //comando para limpiar el localStorage
    //localStorage.removeItem("Almacen")
    // se guarda la informacion en un formato let para poder ser comparado y utulizado
    let listaDeContactos = JSON.parse(localStorage.getItem("Almacen"));
    //se usa el if para de estar vacio el localStorage no se llegue a imprimir nada
    if (listaDeContactos === null) {
    return;
    }
    //se usa un forEach para poder revisar todos los datos guardados en el localStorage
    listaDeContactos.forEach((Contacto, index) => {
        Contacto.Cumple = new Date(Contacto.Cumple);
        //de encontrarse informacion se manda a llamar la funcion _AgregarAtabla con la informacion de Contactos
        this._AgregarATabla(new Contactos(Contacto));
    })
    }
    //Se resiven valores de contacto
    _AgregarATabla(Contacto) 
    {
        //se comienza a insertar informacion en tablaAgenda
    let row = this._tablaAgenda.insertRow(-1);
    let celdaNombre = row.insertCell(0);
    let celdaCorreo = row.insertCell(1);
    let celdaNumero = row.insertCell(2);
    let celdaCumple = row.insertCell(3);
    let celdaEdad = row.insertCell(4);
    let celdaDescripcion = row.insertCell(5);
    row.insertCell(6);
    row.insertCell(7);
    //se imprime la informacion
    celdaNombre.innerHTML = Contacto.Nombre;
    celdaCorreo.innerHTML = Contacto.Correo;
    celdaNumero .innerHTML = Contacto.Numero;
    celdaCumple.innerHTML = Contacto._OptenerCumpleEnFormatoDatoCadena();
    celdaEdad.innerHTML = Contacto._OptenerEdad();
    celdaDescripcion.innerHTML = Contacto.Descripcion;
    }
    //funcion para comprobar que el contacto no esta agregado
    _AgregarContacto(Contacto) 
    {
    let Encontrado = Contacto._RevisionContacto(Contacto.Nombre);
    //en caso de encontrado ser mayor o igual a 0 esto quiere decir que si esta registrado
    if(Encontrado >= 0)
    {
        //mensaje de error estilo bootstrap
        Swal.fire({
        type: "error" ,
        title: "Error",
        text: "El usuario ya existe"
        })
        return;
    }
    //en caso de pasar la prueba se imprime en _AgregarAtabla
    this._AgregarATabla(Contacto);
    Contacto._GuardarEnHistorial(Contacto);
    }
}