export default class Contactos {
    constructor(Contacto) {
        this._Nombre= Contacto.Nombre.toUpperCase();
        this._Correo = Contacto.Correo;
        this._Numero = Contacto.Numero;
        this._Cumple = new Date(Contacto.Cumple);
        this._Descripcion = Contacto.Descripcion;
        this._Contactos = [];
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
    _Op2Digitos(numero){
        if(numero < 10)
        {
        return "0"+ numero;
        }
        return numero;
    }
    _OpDato(){ 
        let Fecha = this._Cumple.getFullYear() + "-" + this._Op2Digitos(this._Cumple.getMonth()+1) + "-" + this._Op2Digitos(this._Cumple.getDate()+1);
        return Fecha;
    }
    _OpCadena() {
        let FechaCadena = (this._Cumple.getDate()) + "/" + this._Meses[this._Cumple.getMonth()] + "/" + this._Cumple.getFullYear();
        return FechaCadena;
    }
    _OpEdad() {
      let unDia = 24 * 60 * 60 * 1000;
      let unAño = unDia * 365;
        let diferencia = new Date() - this._Cumple;
        let Edad = Math.trunc(diferencia / unAño);
        return Edad;
    }
    _RContacto(Contactos ,Nombre)
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
    _Boton(row, Contacto)
    {
        let btnEliminar = document.createElement("input");
        btnEliminar.type = "button";
        btnEliminar.value = "Eliminar";
        btnEliminar.className = "btn btn-danger";
        btnEliminar.addEventListener("click", () => {
            Contacto._Eliminar(row, Contacto, this._volver);
        });
        row.cells[6].innerHTML = "";
        row.cells[6].appendChild(btnEliminar);
    }
    _Eliminar(row, Contacto)
    {
        let btnConfirmar = document.createElement("input");
        btnConfirmar.type = "button";
        btnConfirmar.value = "Confirmar";
        btnConfirmar.className = "btn btn-danger";
        row.cells[6].innerHTML = "";
        row.cells[6].appendChild(btnConfirmar);
        btnConfirmar.addEventListener("click", () => {  
            this._Contactos = JSON.parse(localStorage.getItem("Almacen"));
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
        let btnCancelar = document.createElement("input");
        btnCancelar.type = "button";
        btnCancelar.value = "Cancelar";
        btnCancelar.className = "btn btn-success";
        row.cells[7].innerHTML = "";
        row.cells[7].appendChild(btnCancelar);
        btnCancelar.addEventListener("click", () => {
            this._Boton(row, Contacto);
        })
    }
}