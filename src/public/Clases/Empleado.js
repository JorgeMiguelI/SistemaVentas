class Empleado{
    constructor(nombre, estado, ciudad, domicilio, telefono, email, fecha_nacimiento, cp){
        this.nombre=nombre;
        this.estado=estado;
        this.ciudad=ciudad;
        this.domicilio=domicilio;
        this.telefono=telefono;
        this.email=email;
        this.fecha_nacimiento=fecha_nacimiento;
        this.cp=cp;
    }
    nombre(){
        return this.nombre;
    }
    estado(){
        return this.estado;
    }
    ciudad(){
        return this.ciudad;
    }
    domicilio(){
        return this.domicilio;
    }
    telefono(){
        return this.telefono;
    }
    email(){
        return this.email;
    }
    fecha_nacimiento(){
        return this.fecha_nacimiento;
    }
    cp(){
        return this.cp;
    }
}