class Venta{
    constructor(fecha, monto, id_empleado, rfc_cliente){
        this.fecha= fecha;
        this.monto= monto;
        this.id_empleado= id_empleado;
        this.rfc_cliente=rfc_cliente;
    }
    fecha(){
        return this.fecha;
    }
    monto(){
        return this.monto;
    }
    id_empleado(){
        return this.id_empleado;
    }
    rfc_cliente(){
        return this.rfc_cliente;
    }

}