//pagina de procedimientos
export default class Contactos {
    //constructor de informacion
    constructor(Contacto) {
        //variable array para contener nuestras variables antes de guardar en localStorage
        //comando toUpperCase para colocar nombre en mayusculas
        this._Nombre= Contacto.Nombre.toUpperCase();
        this._Correo = Contacto.Correo;
        this._Numero = Contacto.Numero;
        //se hace para prevenir que se mande la fecha 
        this._Cumple = new Date(Contacto.Cumple);
        this._Descripcion = Contacto.Descripcion;
        //se crea this._meses para que los meses aparezcan ala hora de imprimir
        this._Meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
        ];
    }
    //funcion para tener informacion en 2 digitos para su uso en meses y dias
    _OptenerNumeroEn2Digitos(numero){
        if(numero < 10)
        {
        return "0"+ numero;
        }
        return numero;
    }
    // se optiene la fecha en formato de objeto
    _OptenerCumpleEnFormatoDato(){ 
        let Fecha = this._Cumple.getFullYear() + "-" + this._OptenerNumeroEn2Digitos(this._Cumple.getMonth()+1) + "-" + this._OptenerNumeroEn2Digitos(this._Cumple.getDate()+1);
        return Fecha;
    }
    //se optiene la fecha en formato de string
    _OptenerCumpleEnFormatoDatoCadena() {
        let FechaCadena = (this._Cumple.getDate()) + "/" + this._Meses[this._Cumple.getMonth()] + "/" + this._Cumple.getFullYear();
        return FechaCadena;
    }
    //se optiene la edad 
    _OptenerEdad() {
      let unDia = 24 * 60 * 60 * 1000;
      let unAño = unDia * 365;
        let diferencia = new Date() - this._Cumple;
        let Edad = Math.trunc(diferencia / unAño);
        return Edad;
    }
    //funcion para comprobar que el contacto no este registrado
    _RevisionContacto(Contactos ,Nombre)
    {
    let Buscador = -1;
    Contactos.forEach((Contacto, index) => {
        if (Contacto.Nombre === Nombre)
        {
            Buscador = index;
            return;
        }
    })
    return Buscador;
    }
    //seccion para poder invocar la informacion desde Agenda
    get Nombre() 
    {
        return this._Nombre;
    }
    get Correo() 
    {
        return this._Correo;
    }
    get Numero() 
    {
        return this._Numero;
    }
    get Cumple() 
    {
        return this._Cumple;
    }
    get Descripcion() 
    {
        return this._Descripcion;
    }
    //funcion para volver a colocar botones
    _AgregarEditarEliminarFilaEnTabla(row)
    {
        //se agrega boton Editar
        let btnEditar = document.createElement("input");
        //tipo de imput se selecciona button de boton
        btnEditar.type = "button";
        //se le da un nombre con el que saldra en este caso editar
        btnEditar.value = "Editar";
        //se seleciona gracias a bootstrap su estilo
        btnEditar.className = "btn btn-success";

        //se agrega boton Eliminar
        let btnEliminar = document.createElement("input");
        //tipo de imput se selecciona button de boton
        btnEliminar.type = "button";
        //se le da un nombre con el que saldra en este caso eliminar
        btnEliminar.value = "Eliminar";
        //se seleciona gracias a bootstrap su estilo
        btnEliminar.className = "btn btn-danger";
        
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
        //dato se usa la funcion la cual nos da el valor de fecha en tipo dato a ver de string
        iCumple.value = this._OptenerCumpleEnFormatoDato(); 
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
        let nuevo = this._RevisionContacto(Contacto.Nombre);
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
        this._AgregarEditarEliminarFilaEnTabla(row);
    
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
            this._AgregarEditarEliminarFilaEnTabla(row);
        })
    }
}