//se importa la informacion de contactos para poder ser utilizada
import Contactos from "./Contacto.js";
//comando export para poder exportar la clase
export default class Agenda {
    //constructor donde se resiven las tablas en las que se imprimira
    constructor(tablaAgenda, tablaNumeroContactos) {
    this._tablaAgenda = tablaAgenda;
    this._tablaNumeroContactos = tablaNumeroContactos;
    //variable array para contener nuestras variables antes de guardar en localStorage
    this._Contactos = [];
    this._numCont = 0;
    //el iniciador sirve para revisar el localStorage
    this._iniciadorDeTablas();
}

    _iniciadorDeTablas() 
    {
        //comando para limpiar el localStorage
    //localStorage.removeItem("Almacen")
    // se guarda la informacion en un formato let para poder ser comparado y utulizado
    let listaDeContactos = JSON.parse(localStorage.getItem("Almacen"));
    console.log(listaDeContactos)
    //se usa el if para de estar vacio el localStorage no se llegue a imprimir nada
    if (listaDeContactos === null) {
    return;
    }
    //se usa un forEach para poder revisar todos los datos guardados en el localStorage
    listaDeContactos.forEach((Contacto, index) => {
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
    let Edad = Contacto._OptenerEdad();
    this._numCont++;
    this._tablaNumeroContactos.rows[0].cells[1].innerHTML = this._numCont;
    //funcion para agregar botones
    this._AgregarEditarEliminarFilaEnTabla(row, Contacto); 
    //se guarda la informacion que se acaba de imprimir para hacer un espejo con contacto.js y no se reinicie el array
    let objContactos = {
        Nombre: Contacto.Nombre,
        Correo: Contacto.Correo,
        Numero: Contacto.Numero,
        Cumple: Contacto.Cumple,
        Descripcion: Contacto.Descripcion,
        Edad: Edad
                        };
       //se sube la informacion en nuestra variable contactos la cual esta haciendo espejo con la pagina Contacto.js
    this._Contactos.push(objContactos);
    }
    //funcion para comprobar que el contacto no esta agregado
    _AgregarContacto(Contacto) 
    {
    let Encontrado = Contacto._RevisionContacto(this._Contactos, Contacto.Nombre);
    console.log(Encontrado)
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
    localStorage.setItem("Almacen", JSON.stringify(this._Contactos));
    }

    //parte de funciones de botones
    _AgregarEditarEliminarFilaEnTabla(row, Contacto)
    {
        //se agrega boton Editar
        let btnEditar = document.createElement("input");
        //tipo de imput se selecciona button de boton
        btnEditar.type = "button";
        //se le da un nombre con el que saldra en este caso editar
        btnEditar.value = "Editar";
        //se seleciona gracias a bootstrap su estilo
        btnEditar.className = "btn btn-success";
        //se le asigna una evento al cliquear
        btnEditar.addEventListener("click", () => {
            //la funcion se activara y ejecutara el comando el cual redireciona ala funcion editarFila
            //se manda los datos con los que trabajara la funcion 
        Contacto._editarFila(row, Contacto);
        })
        //se agrega boton Eliminar
        let btnEliminar = document.createElement("input");
        //tipo de imput se selecciona button de boton
        btnEliminar.type = "button";
        //se le da un nombre con el que saldra en este caso eliminar
        btnEliminar.value = "Eliminar";
        //se seleciona gracias a bootstrap su estilo
        btnEliminar.className = "btn btn-danger";
        //se le asigna una evento al cliquear
        btnEliminar.addEventListener("click", () => {
            //la funcion se activara y ejecutara el comando el cual redireciona ala funcion editarFila
            //se manda los datos con los que trabajara la funcion 
            Contacto._Eliminar(row, Contacto);
        })
        //se da un espacio en blanco en la celda en la cual se colocara el boton para que quede limpia 
        row.cells[6].innerHTML = "";
        //se agrega el boton Editar
        row.cells[6].appendChild(btnEditar);
        //se da un espacio en blanco en la celda en la cual se colocara el boton para que quede limpia 
        row.cells[7].innerHTML = "";
        //se agrega el boton Eliminar
        row.cells[7].appendChild(btnEliminar);
    }
    _Ordenar(Tipo)
        {
            var Ordenados = this._Contactos.slice(-this._numCont);
            if (Tipo === 1)
            {
                //comando que permite ordenar
                Ordenados.sort(function(a, b) {
                return a.Nombre.localeCompare(b.Nombre);
                                                                });
            }
        else if (Tipo === 2)
            {
                //comando que permite ordenar
                Ordenados.sort(function(a, b) {
                return a.Edad - b.Edad;
                                                                });
            }
            this._Limpiador();
            localStorage.setItem("Almacen", JSON.stringify(Ordenados));
            this._iniciadorDeTablas();
        }
    _Limpiador()
        {
            var i;
            for (i = this._numCont+1; i > 1; i--)
            {
                this._tablaAgenda.deleteRow(i);
            }
                
            this._numCont = 0;
        }
}