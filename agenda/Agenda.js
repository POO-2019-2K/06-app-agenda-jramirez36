import Contactos from "./Contacto.js";
export default class Agenda {
    constructor(tablaAgenda, NumContactos) {
    this._tablaAgenda = tablaAgenda;
    this._NumContactos = NumContactos;
    this._Contactos = [];
    this._numCont = 0;
    this._iTablas();
}
    //iTablas es un iniciador para ver el localstorage
    _iTablas() 
    {
    //localStorage.removeItem("Almacen")
    let lContactos = JSON.parse(localStorage.getItem("Almacen"));
    console.log(lContactos)
    if (lContactos === null) {
    return;
    }
    lContactos.forEach((Contacto, index) => {
        this._ATabla(new Contactos(Contacto));
    })
    }
    //agregar tabla
    _ATabla(Contacto) 
    {
    let row = this._tablaAgenda.insertRow(-1);
    let celdaNombre = row.insertCell(0);
    let celdaCorreo = row.insertCell(1);
    let celdaNumero = row.insertCell(2);
    let celdaCumple = row.insertCell(3);
    let celdaEdad = row.insertCell(4);
    let celdaDescripcion = row.insertCell(5);
    row.insertCell(6);
    row.insertCell(7);
    celdaNombre.innerHTML = Contacto.Nombre;
    celdaCorreo.innerHTML = Contacto.Correo;
    celdaNumero .innerHTML = Contacto.Numero;
    celdaCumple.innerHTML = Contacto._OpCadena();
    celdaEdad.innerHTML = Contacto._OpEdad();
    celdaDescripcion.innerHTML = Contacto.Descripcion;
    let Edad = Contacto._OpEdad();
    this._numCont++;
    this._NumContactos.rows[0].cells[1].innerHTML = this._numCont;
    Contacto._Boton(row, Contacto); 
    let objContactos = {
        Nombre: Contacto.Nombre,
        Correo: Contacto.Correo,
        Numero: Contacto.Numero,
        Cumple: Contacto.Cumple,
        Descripcion: Contacto.Descripcion,
        Edad: Edad
                        };
    this._Contactos.push(objContactos);
    }
    //agregar contacto
    _AContacto(Contacto) 
    {
    let Encontrado = Contacto._RContacto(this._Contactos, Contacto.Nombre);
    if(Encontrado >= 0)
    {
        Swal.fire({
        type: "error" ,
        title: "Error",
        text: "El usuario ya existe"
        })
        return;
    }
    this._ATabla(Contacto);
    localStorage.setItem("Almacen", JSON.stringify(this._Contactos));
    }
    _Ordenar(Tipo)
        {
            var Ordenados = this._Contactos.slice(-this._numCont);
            if (Tipo === 1)
            {
                Ordenados.sort(function(a, b) {
                return a.Nombre.localeCompare(b.Nombre);
                                                                });
            }
        else if (Tipo === 2)
            {
                Ordenados.sort(function(a, b) {
                return a.Edad - b.Edad;
                                                                });
            }
            this._Limpiador();
            localStorage.setItem("Almacen", JSON.stringify(Ordenados));
            this._iTablas();
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