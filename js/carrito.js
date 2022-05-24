// RECIBO PRODUCTOS PARA EL CARRITO
arrayProductosCarrito = JSON.parse(localStorage.getItem("productosCarrito"));

const div_carritoCompras = document.getElementById("carritoCompras");

// FUNCION PARA MOSTRAR CARRITO
const mostrarCarrito = (arrayProductosCarrito) =>{

    div_carritoCompras.innerHTML= " ";

    let totalCompra = 0;

    // CREO EL HTML CON LOS PRODUCTOS DEL CARRITO
    for(item of arrayProductosCarrito){

        let div_card = document.createElement("div");
        div_card.innerHTML = '<div id="general "class="card card-body col-lg-12">'+
                                '<div class="media align-items-center align-items-lg-start text-lg-left flex-column flex-lg-row">'+
                                    '<div class="mr-2 mb-3 mb-lg-0">'+
                                        '<img src="../'+ item.imagen +'" width="150" height="100">'+
                                    '</div>'+
                                    '<div class="media-body">'+    
                                        '<h6 class="media-title font-weight-semibold">'+
                                            '<a href="#">'+item.nombre+'</a>'+
                                            '<a onclick="eliminarProd('+item.id+')" id="eliminar'+item.id+'" class="fa-solid fa-circle-xmark eliminar"></a>'+
                                        '</h6>'+
                                        '<label class="mr-2">Cantidad</label>'+
                                        '<select class="cantidad" id="'+ item.id +'">'+
                                            '<option>'+ item.cantidad +'</option>'+
                                            '<option value="1">1</option>'+
                                            '<option value="2">2</option>'+
                                            '<option value="3">3</option>'+
                                            '<option value="4">4</option>'+
                                            '<option value="5">5</option>'+
                                        '</select>'+
                                        '<div class="mt-3 mt-lg-0 ml-lg-3 text-right pr-5 ">'+
                                            '<h3 id="precio'+ item.id+'" class="mb-0 font-weight-semibold">$ '+ (item.precio * item.cantidad) +'</h3>'+
                                        '<div>'+
                                            '<i class="fa fa-star"></i>'+
                                            '<i class="fa fa-star"></i>'+
                                            '<i class="fa fa-star"></i>'+
                                            '<i class="fa fa-star"></i>'+
                                            '<i class="fa fa-star"></i>'+
                                        '</div>'+
                                        '<div class="text-muted">1985 reviews</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>';
        
        div_carritoCompras.append(div_card);

        totalCompra += (item.precio * item.cantidad);

    }

    //GUARDO EL PRECIO FINAL
    let precioFinal = document.getElementById("precioFinal");
    precioFinal.innerHTML = "$ "+ totalCompra;
}


mostrarCarrito(arrayProductosCarrito);

const eliminarProd = (id) =>{

    let indice = arrayProductosCarrito.findIndex((elemento)=>{
        return elemento.id == id;
    });

    arrayProductosCarrito.splice(indice,1);

    if(arrayProductosCarrito.length == 0){
        Swal.fire({
            title: "El carrito esta vacio!",
            icon: "error",
            timer: 3000  
        }).then( () =>{
            localStorage.clear();
            window.location.href = '../index.html';
            });    
    }else{
        localStorage.setItem("productosCarrito", JSON.stringify(arrayProductosCarrito));
        mostrarCarrito(arrayProductosCarrito);
    } 
}

// FUNCION PARA CAMBIAR LA CANTIDAD DE PRODUCTOS
const cambiarCantProd = (id,lista,cantidad) =>{
        lista.find((elemento)=>{
        if(elemento.id == id){
            elemento.cantidad = cantidad;
        }
    });
}

// OBTENGO BOTON
const clickearCant = e => {
    if(e.target.classList.contains("cantidad")){
        return e.target;
   }
}

//ELIJO LA CANTIDAD DE CADA PRODUCTO
div_carritoCompras.addEventListener("input", e => {
    let producto = clickearCant(e);
    cambiarCantProd(producto.id,arrayProductosCarrito,producto.value);
    localStorage.setItem("productosCarrito", JSON.stringify(arrayProductosCarrito));
    mostrarCarrito(arrayProductosCarrito);
});

// FINALIZAR LA COMPRA
let botonFinalizar = document.getElementById("botonFinalizar");
botonFinalizar.addEventListener("click", () => {

    Swal.fire({
        title: "Finalizado",
        text: "La compra a sido realizada con exito!",
        icon: "success",
        confirmButtonText: "Terminar",

    }).then( () =>{
        localStorage.clear();
        window.location.href = '../index.html';
     });
    
});