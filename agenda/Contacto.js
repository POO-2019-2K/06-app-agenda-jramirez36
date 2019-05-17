//pagina de procedimientos
export default class Contactos {
    //constructor de informacion
    constructor(Contacto) {
        //variable array para contener nuestras variables antes de guardar en localStorage
        this._Contactos = [];
        //comando toUpperCase para colocar nombre en mayusculas
        this._Nombre= Contacto.Nombre.toUpperCase();
        this._Correo = Contacto.Correo;
        this._Numero = Contacto.Numero;
        this._Cumple = Contacto.Cumple;
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
        //se guarda la informacion en el localStorage
        this._GuardarEnHistorial(Contacto);
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
    _RevisionContacto(Nombre)
    {
    let Buscador = -1;
    this._Contactos.forEach((Contacto, index) => {
        if (Contacto.Nombre === Nombre)
        {
            Buscador = index;
            return;
        }
    })
    return Buscador;
    }
    //funcion para guardar informacion en el localStorage
    _GuardarEnHistorial(Contacto)
    {
        //paquete de informacion para el localStorage
        let objContactos = {
            Nombre: Contacto.Nombre,
            Correo: Contacto.Correo,
            Numero: Contacto.Numero,
            Cumple: Contacto.Cumple,
            Descripcion: Contacto.Descripcion
    };
    //se sube la informacion en nuestra variable contactos 
    this._Contactos.push(objContactos);
    //se guarda la informacion en un localStorage con el nombre Almacen
    localStorage.setItem("Almacen", JSON.stringify(this._Contactos));
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
    get Descripcion() 
    {
        return this._Descripcion;
    }
}