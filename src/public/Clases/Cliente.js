class Cliente {
    constructor(RFC, nombre, ciudad, domicilio, telefono, email){
        this.rfc_cliente= RFC;
        this.razon_social= nombre;
        this.ciudad= ciudad;
        this.domicilio= domicilio;
        this.telefono= telefono;
        this.email= email;
    }

    RFC(){
        return this.RFC;
    }
    nombre(){
        return this.nombre;
    }
    Ciudad(){
        return this.Ciudad
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
}