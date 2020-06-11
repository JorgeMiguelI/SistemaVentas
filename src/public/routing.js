//import Cliente from "./Clases/Cliente";

var app= angular.module('app', ['ngRoute']);
app.config(function ($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: 'pages/Home.html',
        controller: 'homecontroller'

    })
    .when('/Ventas', {
        templateUrl: 'pages/Ventas.html',
        controller: 'ventasController'
    })
    .when('/AltaProducto', {
        templateUrl: 'pages/altaProducto.html',
        controller: 'altascontroller'
    })
    .when('/ConsultaProducto', {
        templateUrl: 'pages/ConsultarRefaccion.html',
        controller: 'consultaRefax'
    })
    .when('/bajasProds', {
        templateUrl: 'pages/bajasProductos.html',
        controller: 'bajasProds'
    })
    .when('/actualizaProds', {
        templateUrl: 'pages/actualizaProducto.html',
        controller: 'actualizaController'
    })
    .when('/verEmpleados',{
        templateUrl: 'pages/verEmpleados.html',
        controller: 'verEmpleadosController'
    })
    .when('/registraEmpleados',{
        templateUrl: 'pages/registrarEmpleado.html',
        controller: 'registroEmpleadosController'
    })
    .when('/updateEmpleado',{
        templateUrl: 'pages/modificarEmpleado.html',
        controller: 'updateEmpleadoController'
    })
    .when('/eliminaEmpleados', {
        templateUrl: 'pages/eliminarEmpleado.html',
        controller: 'eliminaEmpleadoController'
    })
    .when('/HacerPedidoFabrica',{
        templateUrl: 'pages/hacerPedidoFabrica.html',
        controller: "makePedidoFabricaController"
    })
    .when('/misPedidos',{
        templateUrl: 'pages/misPedidos.html',
        controller: 'misPedidosController'
    })
    .when('/pedidosTaller',{
        templateUrl: 'pages/verPedidosTalleres.html',
        controller: 'pedidosTallerController'
    })
    .when('/surtirPedido',{
        templateUrl: 'pages/surtirPedidoTaller.html',
        controller: 'surtirController'
    })
    .otherwise({
        // when all else fails
        templateUrl: 'Pages/routeNotFound.html',
        controller: 'notFoundController'
        });
});
//import Cliente from "./Clases/Cliente";
app.controller('surtirController', function($scope, $http){

})
app.controller('pedidosTallerController', function($scope, $http){
    $scope.RefaccionesSurtir= [];
    $scope.cantSurtir;
    $scope.TotalCompra=0;
    $scope.totalPagar=0;
    document.getElementById('Surtidos').style.display="none";
    document.getElementById('Detalles').style.display="none";
    $scope.getNoSurtidos= function(){
        $http.post('/PedidosTaller/NoSurtidos')
        .then(
            function(response){
                document.getElementById('Detalles').style.display="none";
                document.getElementById('NoSurtidos').style.display="flex";
                document.getElementById('Surtidos').style.display="none";
                $scope.PedidosNo= response.data.info;
            },
            function(response){
                alert("Mal");
            }
        )
    }

    $scope.getSurtidos= function(){
        $http.post('/PedidosTaller/Surtidos')
        .then(
            function(response){
                document.getElementById('Detalles').style.display="none";
                document.getElementById('NoSurtidos').style.display="none";
                document.getElementById('Surtidos').style.display="flex";
                $scope.Pedidos= response.data.info;
            },
            function(response){
                alert("Mal");
            }
        )
    }

    $scope.VerPedido= function(idPedido){
        $scope.IDpedido=idPedido;
        var data= {
            PedidoId: idPedido
        };
        $http.post('/detallesPedidoTaller', data)
        .then(
            function(response){
                document.getElementById('Detalles').style.display="flex";
                document.getElementById('NoSurtidos').style.display="none";
                document.getElementById('Surtidos').style.display="none";
                $scope.DatosPedido= response.data.info;
                //$scope.IDpedido= $scope.DatosPedido.id_pedido;
                $scope.cantSurtir= $scope.DatosPedido.length;
                for(var i=0;i<response.data.info.length;i++){
                    var data={
                        idRefaccion: response.data.info[i].id_refaccion
                    };
                    $http.post('/Refacciones/idRefaccion', data)
                    .then(
                        function(response){
                          $scope.nombres= response.data.info;
                          ///alert($scope.nombres.nombre)  
                        },
                        function(response){
                            alert("Error al traer la refaccion")
                        }
                    );
                }
                
            },
            function(response){
                alert("Mal");
            }
        );
    }

    $scope.verRefaccion= function(idRefax){
        var data={
            idRefaccion: idRefax
        }
        $http.post('/Refacciones/idRefaccion', data)
        .then(
            function(response){
                $scope.Refax= response.data.info;
                $scope.nombre= $scope.Refax.nombre;
                ///alert($scope.Refax.nombre);

            }, function(response){
                alert("No se pudo traer la refaccion");
            }
        );
    }
    $scope.SurtirRefaccion= function(idRefaccion, cantidad){
        $scope.RefaccionesSurtir.push({idRefax: idRefaccion, cantidad: cantidad});
        document.getElementById(idRefaccion).style.backgroundColor="tomato";
        var data={
            idRefaccion: idRefaccion
        }
        $http.post('/Refacciones/idRefaccion', data)
        .then(
            function(response){
                $scope.totalPagar +=cantidad * response.data.info.precio_venta;
                //alert($scope.totalPagar);
                
            },
            function(response){
                alert("Mal")
            }
        )
        
        //alert($scope.RefaccionesSurtir[0].cant);
        //alert("Refaccion surtida");
    }
    $scope.Facturar= function(idPedi){
        if($scope.RefaccionesSurtir.length == $scope.cantSurtir){
            var fecha= new Date();
            const año= fecha.getFullYear();
            var mes = fecha.getMonth()+1
            var dia= fecha.getDay()
            var hora= fecha.getHours()
            var min= fecha.getMinutes()
            var seg= fecha.getSeconds()
            var fechaFactura= año+"-"+mes+"-"+dia+" "+hora+":"+min+":"+seg;
            const idEmpleado= sessionStorage.getItem(1);
            var data ={
                fecha_surtido: fechaFactura,
                costo_surtido: $scope.totalPagar,
                id_pedido: $scope.IDpedido,
                id_empleado: idEmpleado
            };
            var cont=0;
            $http.post('/GuardaFactura', data)
            .then(
                function(response){
                    alert("Factura Guardada");
                    var datos ={
                        id_pedido: $scope.IDpedido
                    };
                    $http.post('/ActualizaStatusSurtido', datos)
                    .then(
                        function(response){
                            for(var i=0;i<$scope.RefaccionesSurtir.length;i++){
                                var data ={
                                    id_refaccion: $scope.RefaccionesSurtir[i].idRefax,
                                    cantidad: $scope.RefaccionesSurtir[i].cantidad
                                }
                                $http.post('/ActualizarExistencia', data)
                                .then(
                                    function(response){
                                        cont++;
                                        if(cont == $scope.RefaccionesSurtir.length){
                                            location.reload();
                                        }
                                    },
                                    function(response){
                                        alert("No se actualizo la refaccion");
                                    }
                                )
                            }
                        },
                        function(response){
                            
                        }
                    )
                    
                    //location.reload();
                },
                function(response){
                    alert("Error al guardar la factura")
                }
            )

            
        }else{
            alert("Aun no has terminado de surtir el pedido");
        }
    }

    $scope.verFactura= function(idPedido, rfcCliente){
        ///alert(rfcCliente);
        $scope.idPedidoFacturado= idPedido;
        var data={
            rfc_cliente: rfcCliente
        };
        $http.post('/Clientes/Id', data)
        .then(
            function(response){
                $scope.Cliente= response.data.info;
                var data={
                    id_pedido: idPedido
                };
                $http.post('/Factura/Id', data)
                .then(
                    function(response){
                        $scope.Factura= response.data.info;
                        var data={
                            id_Ped: idPedido 
                        };
                        $http.post('/DatosPedido/Id', data)
                        .then(
                            function(response){
                                $scope.TotalCompra=0;
                                $scope.detallePedido= response.data.info;
                                for(var i=0;i<$scope.detallePedido.length;i++){
                                    $scope.TotalCompra+= $scope.detallePedido[i].precio_venta * $scope.detallePedido[i].cantidad;
                                }
                            },
                            function(response){
                                alert("No se pudo tarer la info del pedido");
                            }
                        )
                    },
                    function(response){
                        alert("No se pudo traer la factura");
                    }
                )
            },
            function(response){
                alert("No se pudo Traer al Cliente");
            }
        )
    }



});
app.controller('misPedidosController', function($scope, $http){
    document.getElementById('Surtidos').style.display="none";
    document.getElementById('Detalles').style.display="none";
   
    $scope.getNoSurtidos= function(){
        $http.post('/Pedidos/NoSurtidos')
        .then(
            function(response){
                document.getElementById('Detalles').style.display="none";
                document.getElementById('NoSurtidos').style.display="flex";
                document.getElementById('Surtidos').style.display="none";
                $scope.PedidosNo= response.data.info;
            },
            function(response){
                alert("Mal");
            }
        )
    }
    $scope.getSurtidos= function(){
        $http.post('/Pedidos/Surtidos')
        .then(
            function(response){
                document.getElementById('Detalles').style.display="none";
                document.getElementById('NoSurtidos').style.display="none";
                document.getElementById('Surtidos').style.display="flex";
                $scope.Pedidos= response.data.info;
            },
            function(response){
                alert("Mal");
            }
        )
    }
    $scope.VerPedido= function(idPedido){
        var data= {
            PedidoId: idPedido
        };
        $http.post('/detallesPedido', data)
        .then(
            function(response){
                document.getElementById('Detalles').style.display="flex";
                document.getElementById('NoSurtidos').style.display="none";
                document.getElementById('Surtidos').style.display="none";
                $scope.DatosPedido= response.data.info;
                for(var i=0;i<response.data.info.length;i++){
                    var data={
                        idRefaccion: response.data.info[i].id_refaccion
                    };
                    $http.post('/Refacciones/idRefaccion', data)
                    .then(
                        function(response){
                          $scope.nombres= response.data.info;
                          ///alert($scope.nombres.nombre)  
                        },
                        function(response){
                            alert("Error al traer la refaccion")
                        }
                    );
                }
                
            },
            function(response){
                alert("Mal");
            }
        );
    }
    $scope.nombre="Jorge Miguel";
    $scope.verRefaccion= function(idRefax){
        var data={
            idRefaccion: idRefax
        }
        $http.post('/Refacciones/idRefaccion', data)
        .then(
            function(response){
                $scope.Refax= response.data.info;
                $scope.nombre= $scope.Refax.nombre;
                ///alert($scope.Refax.nombre);

            }, function(response){
                alert("No se pudo traer la refaccion");
            }
        );
    }
    
})
app.controller('makePedidoFabricaController', function($scope, $http){
    document.getElementById('refa').style.display="none";
    $scope.Pedido = [];
    $scope.AgregaAPedido= function(cant){
        for(var i=0; i<$scope.Refacciones.length; i++){
            if ($scope.Refacciones[i].id_refaccion == $scope.id){
                let DetalleRefaccion = $scope.Refacciones[i] ;
                DetalleRefaccion = {...DetalleRefaccion, cant: cant};
                $scope.Pedido.push(DetalleRefaccion);
                break;
            }
        }
        //alert(JSON.stringify($scope.Pedido[0])); Me muestra la informacion del Objeto   
    }
    $scope.FinalizaPedido= function(){
        var fecha= new Date()
        var año= fecha.getFullYear();
        var mes= fecha.getMonth()+1;
        if(mes<10){
            mes= "0"+mes;
        }
        var dia= fecha.getDay();
        if(dia<10){
            dia= "0"+dia;
        }
        var hora= fecha.getHours();
        var min= fecha.getMinutes();
        var seg= fecha.getSeconds();
        const fechaPedido= año+"-"+mes+"-"+dia + " "+hora+":"+min+":"+seg;
        ///alert(fechaPedido);
        var data = {
            fecha: fechaPedido,
            id_empleado: sessionStorage.getItem(1),
            estatus_pago: "NO",
            status_envio: "NO"
        };
        var cont=0;
        $http.post('/RegistroPedido', data)
        .then(
            function(response){
                //alert("SE ah registrado el pedido");
                const idPedido= response.data.idPedido;
                for(var i=0; i<$scope.Pedido.length;i++){
                    var detallePedido= new detalle_Pedido(idPedido, $scope.Pedido[i].id_refaccion, $scope.Pedido[i].cant);
                    $http.post('/RegistroPedido/Detalles', detallePedido)
                    .then(
                        function(response){
                            cont=cont+1;
                            if(cont==$scope.Pedido.length){
                                alert("Todo Salio Bine");
                                location.reload();
                            }
                        },
                        function(response){
                            alert("No se registro el detalle del pedido");
                        }
                    )
                }
            },
            function(response){
                alert("No se registro el pedido");
            }
        );
    }
    $scope.asigna=function(idRefaccion){
        $scope.id= idRefaccion;
    }
    $http.post('/Refacciones')
    .then(
        function(response){
            $scope.Refacciones= response.data.info;
            //alert($scope.Refacciones[0].nombre);
        },
        function(response){
            alert("Salio Mal");
        }
    )
    $scope.getRefaccion= function(){
        var data={
            idRefaccion: $scope.refaccion
        };
        $http.post('/Refacciones/idRefaccion', data)
        .then(
            function(response){
                document.getElementById('listaRefacciones').style.display="none";
                document.getElementById('refa').style.display="flex";
                $scope.ReFax= response.data.info;
            },
            function(response){
                alert("Mal");
            }
        );
    }
    $scope.verTodas= function(){
        document.getElementById('listaRefacciones').style.display="flex";
        document.getElementById('refa').style.display="none";
    }
})
app.controller('eliminaEmpleadoController', function($scope, $http){
    $scope.empleado="";
    $http.post('/Empleados')
    .then(
        function(response){
            $scope.Empleados= response.data.info;
        },
        function(response){
            alert("Mal");
        }
    )
    $scope.getEmpleado= function(){
        //alert("Hola");
        var data={
            idEmpleado: $scope.empleado
        };
        $http.post('/Empleados/id', data)
        .then(
            function(response){
                $scope.Emp= response.data.info;
                //document.getElementById('DatosEmpleado').style.display= "flex";
            },
            function(response){
                alert("No se pudo consultar al empleado");
            }
        )
    }
    $scope.eliminarEmpleado=function(){
        var data= {
            idEmpleado: $scope.empleado
        };
        $http.post('/Empleados/Eliminarid', data)
        .then(
            function(response){
                alert("Se ha eliminado el Empleado");
                location.reload();
                //document.getElementById('DatosEmpleado').style.display= "flex";
            },
            function(response){
                alert("No se pudo consultar al empleado");
            }
        )
    }
})
app.controller('updateEmpleadoController', function($scope, $http){
    $scope.empleado="";
    $http.post('/Empleados')
    .then(
        function(response){
            $scope.Empleados= response.data.info;
        },
        function(response){
            alert("Mal");
        }
    )
    $scope.getEmpleado= function(){
        //alert("Hola");
        var data={
            idEmpleado: $scope.empleado
        };
        $http.post('/Empleados/id', data)
        .then(
            function(response){
                $scope.Emp= response.data.info;
                //document.getElementById('DatosEmpleado').style.display= "flex";
            },
            function(response){
                alert("No se pudo consultar al empleado");
            }
        )
    }
});
app.controller('registroEmpleadosController', function($scope, $http){
    $scope.RegistraEmpleado= function(){
        var date= new Date($scope.fecha);
        var mesFecha= date.getMonth()+1;
        if(mesFecha <10){
            mesFecha= "0"+mesFecha.toString();
        }
        var diaFecha= date.getDay();
        if(diaFecha <10){
            diaFecha= "0"+diaFecha.toString();
        }
        var añoFecha = date.getFullYear()
        var FechaNacimiento= (diaFecha+ mesFecha+ añoFecha).toString();
        //alert(FechaNacimiento);
        var empleado= new Empleado($scope.nombre, $scope.estado, $scope.ciudad, $scope.domicilio, $scope.tel, $scope.email, FechaNacimiento, $scope.cp);
        $http.post('/Registro/Empleados', empleado)
        .then(
            function(response){
                alert("Se ha registrado Correctamente el Empleado");
                location.reload();
            },
            function(response){
                alert("Error al registrar el empleado");
            }
        );
    }
    
})
app.controller('verEmpleadosController', function($scope, $http){
    document.getElementById('DatosEmpleado').style.display= "none";
    $scope.empleado="";
    $http.post('/Empleados')
    .then(
        function(response){
            $scope.Empleados= response.data.info;
        },
        function(response){
            alert("Mal");
        }
    )
    $scope.MostrarEmpleado= function(){
        var data={
            idEmpleado: $scope.empleado
        };
        $http.post('/Empleados/id', data)
        .then(
            function(response){
                $scope.Emp= response.data.info;
                document.getElementById('DatosEmpleado').style.display= "flex";
            },
            function(response){
                alert("No se pudo consultar al empleado");
            }
        )
    }
});
app.controller('actualizaController', function($scope, $http){
    $http.post('/RefaccionesTodas')
    .then(
        function(response){
            $scope.Refacciones= response.data.info;
            //alert($scope.Refacciones[0].nombre);
        },
        function(response){
            alert("Salio Mal");
        }
    );
    $scope.Ver= function(){
        alert($scope.im);
    }
    $scope.getRefaccion= function(){
        var data={
            idRefaccion: $scope.refaccion
        };
        $http.post('/Refacciones/idRefaccion', data)
        .then(
            function(response){
                $scope.ReFax= response.data.info;
                //alert($scope.Refax.status);
            },
            function(response){
                alert("Mal");
            }
        );
    }
});
app.controller('bajasProds', function($scope, $http){
    document.getElementById('refa').style.display="none";
    $http.post('/Refacciones')
    .then(
        function(response){
            $scope.Refacciones= response.data.info;
            //alert($scope.Refacciones[0].nombre);
        },
        function(response){
            alert("Salio Mal");
        }
    )
    $scope.getRefaccion= function(){
        var data={
            idRefaccion: $scope.refaccion
        };
        $http.post('/Refacciones/idRefaccion', data)
        .then(
            function(response){
                document.getElementById('refa').style.display="flex";
                $scope.ReFax= response.data.info;
            },
            function(response){
                alert("Mal");
            }
        );
    }
    $scope.DarBaja= function(){
        var data= {
            idRefaccion: $scope.refaccion
        };
        $http.post('/Refacciones/Bajas', data)
        .then(
            function(response){
                alert("Se ha dado de Baja la pieza");
                document.getElementById('refa').style.display="none";
                $scope.refaccion= "";
            },
            function(response){
                alert("No se pudo dar de baja la pieza");
            }
        ) ;
    }
});

app.controller('consultaRefax', function($scope, $http){
    document.getElementById('Refac').style.display= "none";
    $http.post('/Refacciones')
    .then(
        function(response){
            $scope.Refax= response.data.info;
        },
        function(response){
            alert("Algo Salio Mal")
        }
    );
    $scope.RefaccionesCat= function(){
        document.getElementById('Refac').style.display= "none";
        if ($scope.cat == undefined){
            alert("No has seleccionado una categoria")
        }else{
            var data= {
                categoria: $scope.cat
            };
            $http.post('/refacciones/categoria', data)
            .then(
                function(response){
                   document.getElementById('Refacciones').style.display= "flex";
                    //alert('Todo bien');
                    $scope.ProdsCategoria= response.data.info;
                },
                function(response){
                    alert("Todo mal");
                }
            );
        }
    }
    $scope.getRefaccion= function(){
        var data={
            idRefaccion: $scope.refaccion
        };
        $http.post('/Refacciones/idRefaccion', data)
        .then(
            function(response){
                document.getElementById('Refacciones').style.display="none"
                document.getElementById('Refac').style.display= "flex";
                $scope.ReFax= response.data.info;
            },
            function(response){
                alert("Mal");
            }
        );
    }
});

app.controller('homecontroller', function($scope, $http){
    $scope.usuario= sessionStorage.getItem(2);
   if (sessionStorage.getItem(3) == "true"){ //si se logueo el administrador
        document.getElementById('home').style.display="none";
        document.getElementById('ventas').style.display="none";
        document.getElementById('pedidosFabrica').style.display="none";
        document.getElementById('surtir').style.display="none";
        document.getElementById('administrar').style.display="block";
        document.getElementById('empleados').style.display="block";
        document.getElementById('estadisticas').style.display="block";
        document.getElementById('admin').style.display="block";
        document.getElementById('empleado').style.display="none";
        //document.getElementById('logout').style.display="block";
   }else if(sessionStorage.getItem(4) == "true"){
        document.getElementById('home').style.display="none";
        document.getElementById('ventas').style.display="block";
        document.getElementById('pedidosFabrica').style.display="block";
        document.getElementById('surtir').style.display="block";
        document.getElementById('administrar').style.display="none";
        document.getElementById('empleados').style.display="none";
        document.getElementById('estadisticas').style.display="none";
        document.getElementById('admin').style.display="none";
        document.getElementById('empleado').style.display="block";
        //document.getElementById('logout').style.display="block";
   }else{
        document.getElementById('home').style.display="block";
        document.getElementById('ventas').style.display="none";
        document.getElementById('administrar').style.display="none";
        document.getElementById('pedidosFabrica').style.display="none";
        document.getElementById('surtir').style.display="none";
        document.getElementById('empleados').style.display="none";
        document.getElementById('estadisticas').style.display="none";
        document.getElementById('admin').style.display="none";
        document.getElementById('empleado').style.display="none";
        //document.getElementById('logout').style.display="none";
   }
    $scope.empleado=sessionStorage.getItem(4);

    $scope.Logout= function(){
        sessionStorage.clear();
        window.location.href="#/!";
    }

    $scope.Login= function(){
        var data= {
            correo: $scope.CorreoLogin,
            pass: $scope.PassLogin
        };
        $http.post('/Usuario', data)
        .then(
            function(response){
                if(response.data.info == "mal"){
                    alert("Usuario o Contraseña Incorrectos");
                    $scope.CorreoLogin= "";
                    $scope.PassLogin= "";
                }else{
                    sessionStorage.setItem(1, response.data.info.id_empleado);
                    sessionStorage.setItem(2, response.data.info.nombre);
                    if(sessionStorage.getItem(2) == "admin"){
                        $scope.administrador= true;
                        sessionStorage.setItem(3, "true");
                        sessionStorage.setItem(4, false);
                        $scope.empleado= false;
                        //location.reload();
                        window.location.href= "#!AltaProducto";
                        location.reload();
                    }else{
                        $scope.empleado= true;
                        $scope.administrador= false;
                        sessionStorage.setItem(3, false); //administrador
                        sessionStorage.setItem(4, "true");    //empleado
                        window.location.href= "#!Ventas";
                        location.reload();
                        
                    }
                    
                }
                
            },
            function(response){
                alert("Login Incorrecto");
            }
        );
    }
});

app.controller('ventasController', function($scope, $http){
    //location.reload();
    $scope.administrador= sessionStorage.getItem(3);
    $scope.empleado= sessionStorage.getItem(4);
$http.post('/Refacciones', null)
.then(
    function(response){
        $scope.Refacciones=response.data.info;
    },
    function(response){
        alert("Mal");
    }
);

$http.get('/Clientes', null)
.then(
    function(response){
        $scope.Clientes=response.data.info;
    },
    function(response){
        alert("mal");
    }
);



$scope.finalizarVentaCliente= function(){
    let cliente= new Cliente($scope.RFC_cliente, $scope.nombre, $scope.ciudad, $scope.domicilio, $scope.telefono, $scope.email);
    $http.post('/clientes/registro', cliente)
    .then(
        function(response){
            alert("Se ah registrado el Cliente");
            let venta= new Venta($scope.fecha.getFullYear()+ "-" + ($scope.fecha.getMonth()+1 ) + "-"+ $scope.fecha.getDate(), $scope.total, sessionStorage.getItem(1), $scope.RFC_cliente);
            $http.post('/RegistroVenta', venta)
            .then(
                function(response){
                    $scope.idVenta= response.data.info;
                    for(var i =0;i<$scope.data.length;i++){
                        let detalleVenta= new DetalleVenta($scope.idVenta, $scope.data[i].id, $scope.data[i].cantidad)
                        
                        $http.post('/RegistroVenta/Productos', detalleVenta)
                        .then(
                            function(response){
                                var data ={
                                    id_refaccion: $scope.data[i].id,
                                    cantidad: $scope.data[i].cantidad
                                }
                               $http.post('/ActualizarExistencia', data)
                               .then(
                                   function(response){
                                        alert("Se ha actualizado la refaccion");
                                   }
                               ),
                               function(response){
                                   alert("Error al actualizar la existencia de la refaccion");
                               }
                            },
                            function(response){
                                alert("Error al guardar los detalles de la venta");
                            }
                        );
                    }
                },
                function(response){
                    alert('No se pudo registrar la venta');
                }
            );
        },
        function(response){
            alert('no se pudo registrar el cliente');
        }
    );
    
    
}

$scope.GuardarVenta= function(){
    sessionStorage.setItem(1, 1); ///Simulando el id del trabajador
    let venta= new Venta($scope.fecha.getFullYear()+ "-" + ($scope.fecha.getMonth()+1 ) + "-"+ $scope.fecha.getDate(), $scope.total, sessionStorage.getItem(1), $scope.RFC_cliente);
    $http.post('/RegistroVenta', venta)
    .then(
        function(response){
            $scope.idVenta= response.data.info;
            for(var i =0;i<$scope.data.length;i++){
                let detalleVenta= new DetalleVenta($scope.idVenta, $scope.data[i].id, $scope.data[i].cantidad)
                $http.post('/RegistroVenta/Productos', detalleVenta)
                .then(
                    function(response){
                        //alert("Regsitro Completo");
                        var data ={
                            id_refaccion: detalleVenta.id_refaccion,
                            cantidad: detalleVenta.total_articulos
                        };
                        $http.post('/ActualizarExistencia', data)
                        .then(
                            function(response){
                                //alert("Actualizacion Completo");
                            },
                            function(response){
                                alert("Error al Actualizar los detalles de la venta");
                            }
                        );
                    },
                    function(response){
                        alert("Error al guardar los detalles de la venta");
                    }
                );
            }
        },
        function(response){
            alert('No se pudo registrar la venta');
        }
    );
}

$scope.AgregarLista= function(idRefaccion){
    var band= false;
    for(var i=0;i<$scope.Refacciones.length;i++){
        if(idRefaccion == $scope.Refacciones[i].id_refaccion){ //Me srive para sacar la refaccion a agregar
            for(var j=0;j<$scope.data.length;j++){  //recorro la lista de productos agregados para comprar
                if($scope.data[j].id == idRefaccion){ // Verifico si el producto y se encuentra
                    $scope.data[j].cantidad = $scope.data[j].cantidad+1; //si ya se encuentra le aumento en 1 la cantidad
                    $scope.data[j].total = $scope.data[j].cantidad * $scope.data[j].precio;
                    //$scope.total+= $scope.data[i].precio;
                    $scope.total=0;
                for (var k=0;k<$scope.data.length;k++){
                    $scope.total += $scope.data[k].total;
                }


                  $scope.total= parseFloat(dosDecimales($scope.total));
                    band=true //bandera para saber si ya se encontro
                    break;
                }
            }
            if(band == false){ // si no se encontro en la lista entonces lo agregamos
                $scope.data.push({id:idRefaccion, nombre:$scope.Refacciones[i].nombre , cantidad:1, precio:$scope.Refacciones[i].precio_venta, total:$scope.Refacciones[i].precio_venta});
                $scope.total+= $scope.Refacciones[i].precio_venta;
                //$scope.total= parseFloat(dosDecimales($scope.total));
                break;
            }
        } 
        
    }
}

$scope.Search= function(){
    var data={
        categoria: $scope.categoria
    }
    $http.post('/Refacciones/categoria', data)
.then(
    function(response){
        $scope.Refacciones=response.data.info;
    },
    function(response){
        alert("Algo salio Mal");
    }
);
}

    $scope.total=0;
    $scope.fecha= new Date();
    $scope.meses=["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
   $scope.data= [];

    $scope.Guarda=function(){
        $http.post('/upload', null)
        .then(
            function(response){
                alert("Bien");
            },
            function(response){
                alert("mal");
            }
        );
    }

    $scope.Muestra=function(){
        $http.get('/piezas', null)
        .then(
            function(response){
                alert(response.data.info[0].nombre);
            },
            function(response){
                alert("mal");
            }
        );
    }


    $scope.AumentaCant= function(IdProd){
        for(var i=0;i<$scope.data.length;i++){
            if($scope.data[i].id == IdProd){
                $scope.data[i].cantidad+=1;
                $scope.data[i].total= $scope.data[i].precio * $scope.data[i].cantidad;
                $scope.total=0;
                for (var j=0;j<$scope.data.length;j++){
                    $scope.total += $scope.data[j].total;
                }
                //$scope.total+= $scope.data[i].precio;
                $scope.total= parseFloat(dosDecimales($scope.total));
                
                break;
            }
        }
    }

    $scope.DisminuyeCant= function(IdProd){
        for(var i=0;i<$scope.data.length;i++){
            if($scope.data[i].id == IdProd && $scope.data[i].cantidad >=1){
                $scope.data[i].cantidad-=1;
                $scope.data[i].total= $scope.data[i].precio* $scope.data[i].cantidad;
                //$scope.total-= $scope.data[i].precio;
                $scope.total=0;
                for (var j=0;j<$scope.data.length;j++){
                    $scope.total += $scope.data[j].total;
                }
                $scope.total= parseFloat(dosDecimales($scope.total));
                if($scope.data[i].cantidad ==0){
                    $scope.data.splice(i, 1);
                }
                break;
            }
        }
    }

});

function dosDecimales(n) {
    let t=n.toString();
    let regex=/(\d*.\d{0,2})/;
    return t.match(regex)[0];
  }