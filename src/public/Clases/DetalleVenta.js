class DetalleVenta{
    constructor(id_venta, id_refaccion, total_articulos){
        this.id_venta= id_venta;
        this.id_refaccion= id_refaccion;
        this.total_articulos=total_articulos;
    }
    id_venta(){
        return this.id_venta;
    }
    id_refaccion(){
        return this.id_refaccion;
    }
    total_articulos(){
        return this.total_articulos;
    }
}