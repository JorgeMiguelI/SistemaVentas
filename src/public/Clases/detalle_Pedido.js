class detalle_Pedido{
    constructor(id_pedido, id_refaccion, cantidad_surtir){
        this.id_pedido= id_pedido;
        this.id_refaccion= id_refaccion;
        this.cantidad_surtir= cantidad_surtir;
    }
    id_pedido(){
        return this.id_pedido;
    }
    id_refaccion(){
        return this.id_refaccion;
    }
    cantidad_surtir(){
        return this.cantidad_surtir;
    }
}