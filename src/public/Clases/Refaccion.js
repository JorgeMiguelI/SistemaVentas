class Refaccion{
    constructor(id_refaccion, nombre, Descripcion, Precio_compra, precio_venta, existencia, imagen, categoria){
        this.id_refaccion= id_refaccion;
        this.nombre= nombre;
        this.Descripcion= Descripcion;
        this.Precio_compra= Precio_compra;
        this.precio_venta= precio_venta;
        this.existencia= existencia;
        this.imagen= imagen;
        this.categoria= categoria;
    }
    id_refaccion(){
        return this.id_refaccion;
    }
    nombre(){
        return this.nombre;
    }
    Descripcion(){
        return this.Descripcion;
    }
    Precio_compra(){
        return this.Precio_compra;
    }
    precio_venta(){
        return this.precio_venta;
    }
    existencia(){
        return this.existencia;
    }
    imagen(){
        return this.imagen;
    }
    categoria(){
        return this.categoria;
    }
}