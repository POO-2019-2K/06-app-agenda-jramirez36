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
    //funcion para agregar botones
    this._AgregarEditarEliminarFilaEnTabla(row, Contacto); 
    //se guarda la informacion que se acaba de imprimir para hacer un espejo con contacto.js y no se reinicie el array
    let objContactos = {
        Nombre: Contacto.Nombre,
        Correo: Contacto.Correo,
        Numero: Contacto.Numero,
        Cumple: Contacto.Cumple,
        Descripcion: Contacto.Descripcion
                        };
       //se sube la informacion en nuestra variable contactos la cual esta haciendo espejo con la pagina Contacto.js
    this._Contactos.push(objContactos);
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
    //se guarda la informacion en un localStorage con el nombre Almacen para terminar el espejo con Contacto.js
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
        this._editarFila(row, Contacto);
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
            this._Eliminar(row, Contacto);
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
    _editarFila(row, Contacto)
    {
        //se crean nuevos cuadros con su nombre
        let iNombre = document.createElement("input");
        //se selecciona el tipo de informacion el cual podra contener
        iNombre.type = "text";
        //se selecciona la informacion que contendra
        iNombre.value = Contacto.Nombre;
        //se da un espacio en blanco en la celda en la cual se colocara elcuadro de texto para que quede limpia 
        //dato se inicia en 0 la posicion de la celda por que en programacion se inicia contando desde el 0
        row.cells[0].innerHTML = "";
        //se agrega el cuadro creado en dicha posicion 
        row.cells[0].appendChild(iNombre);

        //se crean nuevos cuadros con su nombre
        let iCorreo = document.createElement("input");
        //se selecciona el tipo de informacion el cual podra contener
        iCorreo.type = "email";
        //se selecciona la informacion que contendra
        iCorreo.value = Contacto.Correo;
        //se da un espacio en blanco en la celda en la cual se colocara el cuadro de texto para que quede limpia 
        row.cells[1].innerHTML = "";
        //se agrega el cuadro creado en dicha posicion 
        row.cells[1].appendChild(iCorreo);

        //se crean nuevos cuadros con su nombre
        let iNumero = document.createElement("input");
        //se selecciona el tipo de informacion el cual podra contener
        iNumero.type = "number";
        //se selecciona la informacion que contendra
        iNumero.value = Contacto.Numero; 
        //se da un espacio en blanco en la celda en la cual se colocara el cuadro de texto para que quede limpia 
        row.cells[2].innerHTML = "";
        //se agrega el cuadro creado en dicha posicion 
        row.cells[2].appendChild(iNumero);
    
        //se crean nuevos cuadros con su nombre
        let iCumple = document.createElement("input");
        //se selecciona el tipo de informacion el cual podra contener
        iCumple.type = "date";
        //se selecciona la informacion que contendra
        //dato se usa la funcion la cual nos da el valor de fecha en tipo dato aver de string
        iCumple.value = Contacto._OptenerCumpleEnFormatoDato(); 
        //se da un espacio en blanco en la celda en la cual se colocara el cuadro de texto tipo fecha para que quede limpia 
        row.cells[3].innerHTML = "";
        //se agrega el cuadro creado en dicha posicion 
        row.cells[3].appendChild(iCumple);
    
        //dato no se modifica edad ya que esta se deberia modificar al cambiar la fecha de nacimiento
        //se crean nuevos cuadros con su nombre
        let iDescripcion = document.createElement("input");
        //se selecciona el tipo de informacion el cual podra contener
        iDescripcion.type = "text";
        //se selecciona la informacion que contendra
        iDescripcion.value = Contacto.Descripcion; 
        //se da un espacio en blanco en la celda en la cual se colocara el cuadro de texto para que quede limpia 
        row.cells[5].innerHTML = "";
        //se agrega el cuadro creado en dicha posicion 
        row.cells[5].appendChild(iDescripcion);
    
        //se crea el boton de Guardado
        let btnGuardado = document.createElement("input");
        //se selecciona el typo de boton que sera 
        btnGuardado.type = "button";
        //se coloca el nombre que tendra
        btnGuardado.value = "Grabar";
        //se seleciona gracias a bootstrap su estilo
        btnGuardado.className = "btn btn-success";
        //se da un espacio en blanco en la celda en la cual se colocara el boton para que quede limpia 
        row.cells[6].innerHTML = "";
        //se coloca en la posicion el boton creado
        row.cells[6].appendChild(btnGuardado);
        //se crea un evento tipo click
        btnGuardado.addEventListener("click", () => {   
            //se crea un objeto el cual guardara toda nuestra informacion 
        let nuevoContacto = 
        {
            //dato se pone el value para que se almacene solo el valor y no el objeto de cada cuadro 
            Nombre: iNombre.value,
            Correo: iCorreo.value,
            Numero: iNumero.value,
            Cumple: iCumple.value,
            Descripcion: iDescripcion.value,
        };
        //se manda la informacion necesaria para trabajar ala funcion salvar edicion
            this._salvarEdicion(row, Contacto, nuevoContacto);
        })

        //se crea el boton de cancelar
        let btnCancelar = document.createElement("input");
        //se selecciona el typo de boton que sera 
        btnCancelar.type = "button";
        //se coloca el nombre que tendra
        btnCancelar.value = "Cancelar";
        //se seleciona gracias a bootstrap su estilo
        btnCancelar.className = "btn btn-danger";
        //se da un espacio en blanco en la celda en la cual se colocara el boton para que quede limpia 
        row.cells[7].innerHTML = "";
        //se coloca en la posicion el boton creado
        row.cells[7].appendChild(btnCancelar);
        //se crea un evento tipo click
        btnCancelar.addEventListener("click", () => {
            //al ejecutarse el evento se ejecutara la funcion cancelar edicion y se mandara la informacion necesaria
            this._cancelarEdicion(row, Contacto);
        })
    }
    //funcion salvar edicion nos permite guardar lo editado
    _salvarEdicion(row, Contacto, nuevoContacto)
    {
        //primero se usa la funcion revisionContacto para ver si el nombre colocado no tendra problemas
        let nuevo = Contacto._RevisionContacto(Contacto.Nombre);
        //se confirma y se guarda la nueva informacion
        this._Contactos[nuevo] = nuevoContacto;
        //se almacena en el localstorage
        localStorage.setItem("Almacen", JSON.stringify(this._Contactos));
        //se usa la funcion cancelaredicion para que imprima todo de nuevo
        this._cancelarEdicion(row, new Contactos(nuevoContacto));
    }
    //funcion encargada de cancelar la edicion y de volver a imprimir todo
    _cancelarEdicion(row, Contacto)
    {
        //se limpia las posiciones y despues se colocan los datos actualizados
        row.cells[0].innerHTML = "";
        row.cells[0].innerHTML = Contacto.Nombre;
        row.cells[1].innerHTML = "";
        row.cells[1].innerHTML = Contacto.Correo;
        row.cells[2].innerHTML = "";
        row.cells[2].innerHTML = Contacto.Numero;
        row.cells[3].innerHTML = "";
        row.cells[3].innerHTML = Contacto._OptenerCumpleEnFormatoDatoCadena();
        row.cells[4].innerHTML = "";
        row.cells[4].innerHTML = Contacto._OptenerEdad();
        row.cells[5].innerHTML = "";
        row.cells[5].innerHTML = Contacto.Descripcion;
        //se llama la funcion que agrega los botones de editar y eliminar para evitar tener que escribirlos
        this._AgregarEditarEliminarFilaEnTabla(row, Contacto);
    
    }
    //funcion de eliminar por completo una fila
    _Eliminar(row, Contacto)
    {
        //se crean dos botones para confirmar
        let btnConfirmar = document.createElement("input");
        //se selecciona el typo de boton que sera 
        btnConfirmar.type = "button";
        //se coloca el nombre que tendra
        btnConfirmar.value = "Confirmar";
        //se seleciona gracias a bootstrap su estilo
        btnConfirmar.className = "btn btn-danger";
        //se da un espacio en blanco en la celda en la cual se colocara el boton para que quede limpia 
        row.cells[6].innerHTML = "";
        //se coloca en la posicion el boton creado
        row.cells[6].appendChild(btnConfirmar);
        //se crea un evento tipo click
        btnConfirmar.addEventListener("click", () => {   
            //se crea un objeto el cual guardara toda nuestra informacion 
            this._Contactos.splice(Contacto, 1);
            row.innerHTML = "";
            localStorage.setItem("Almacen", JSON.stringify(this._Contactos));
            Swal.fire({
                type: "error" ,
                title: "Eliminado",
                text: "El usuario ya ha sido eliminado"
                })
                return;
        }) 

        //se crea el boton de cancelar al igual que al editar en caso de que el usuario se arrepienta
        let btnCancelar = document.createElement("input");
        //se selecciona el typo de boton que sera 
        btnCancelar.type = "button";
        //se coloca el nombre que tendra
        btnCancelar.value = "Cancelar";
        //se seleciona gracias a bootstrap su estilo
        btnCancelar.className = "btn btn-success";
        //se da un espacio en blanco en la celda en la cual se colocara el boton para que quede limpia 
        row.cells[7].innerHTML = "";
        //se coloca en la posicion el boton creado
        row.cells[7].appendChild(btnCancelar);
        //se crea un evento tipo click
        btnCancelar.addEventListener("click", () => {
            //al ejecutarse el evento se ejecutara la funcion que imprimira solo los botones necesarios
            this._AgregarEditarEliminarFilaEnTabla(row, Contacto);
        })
    }
}