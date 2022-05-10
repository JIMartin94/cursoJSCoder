
// RECIBO PRODUCTOS PARA EL CARRITO
arrayProductosCarrito = JSON.parse(localStorage.getItem("productosCarrito"));

let div_carritoCompras = document.getElementById("carritoCompras");

let div_borrar = document.createElement("div");
div_borrar.id = ("borrar");

div_carritoCompras.append(div_borrar);


// FUNCION PARA MOSTRAR CARRITO
const mostrarCarrito = () =>{

    prod = document.getElementById("borrar");
    prod.remove();

    let div_borrar = document.createElement("div");
    div_borrar.id = ("borrar");

    let totalCompra = 0;

    // CREO EL HTML CON LOS PRODUCTOS DEL CARRITO
    for(item of arrayProductosCarrito){
        
        let div_card = document.createElement("div");
        div_card.className = "card card-body col-lg-12";
        div_card.id = "general";
        
        let div_gen = document.createElement("div");
        div_gen.className = "media align-items-center align-items-lg-start text-lg-left flex-column flex-lg-row";
        
        let div_img = document.createElement("div");
        div_img.className = "mr-2 mb-3 mb-lg-0";
        
        let img = document.createElement("img");
        img.src = "../"+item.foto;
        img.width = "150";
        img.height = "100";
        
        let div_media_body = document.createElement("div");
        div_media_body.className = "media-body";
        
        let h6 = document.createElement("h6");
        h6.className = "media-title font-weight-semibold";
        
        let a = document.createElement("a");
        a.href = "#";
        a.innerHTML = item.nombre;
        
        let label = document.createElement("label");
        label.innerHTML = "Cantidad";
        label.className = "mr-2"
        
        let select = document.createElement("select");
        select.id = item.id;
        select.className = "cantidad";

        let op = document.createElement("option");
        op.innerHTML = item.cantidad;
        op.value = "1";
        
        let op1 = document.createElement("option");
        op1.innerHTML = "1";
        op1.value = "1";
        
        let op2 = document.createElement("option");
        op2.innerHTML = "2";
        op2.value = "2";
        
        let op3= document.createElement("option");
        op3.innerHTML = "3";
        op3.value = "3";
        
        let op4 = document.createElement("option");
        op4.innerHTML = "4";
        op4.value = "4";
        
        let op5 = document.createElement("option");
        op5.innerHTML = "5";
        op5.value = "5";
        
        let div_precio = document.createElement("div");
        div_precio.className = "mt-3 mt-lg-0 ml-lg-3 text-right pr-5 ";
        
        let h3 = document.createElement("h3");
        h3.id = "precio" + item.id;
        h3.className = "mb-0 font-weight-semibold";
        h3.innerHTML = "$" + (item.precio * item.cantidad);
        
        let div_estrella = document.createElement("div");
        
        let i1 = document.createElement("i");
        i1.className = "fa fa-star";
        
        let i2 = document.createElement("i");
        i2.className = "fa fa-star";
        
        let i3 = document.createElement("i");
        i3.className = "fa fa-star";
        
        let i4 = document.createElement("i");
        i4.className = "fa fa-star";
        
        let i5 = document.createElement("i");
        i5.className = "fa fa-star";
        
        div_img.append(img);
        h6.append(a);
        select.append(op,op1,op2,op3,op4,op5);
        div_estrella.append(i1,i2,i3,i4,i5);
        div_precio.append(h3,div_estrella);
        div_media_body.append(h6,label,select,div_precio);
        div_gen.append(div_img,div_media_body);
        div_card.append(div_gen);
        div_borrar.append(div_card);
        div_carritoCompras.append(div_borrar);
        
        totalCompra += (item.precio * item.cantidad);
        
    }

    //GUARDO EL PRECIO FINAL
    let precioFinal = document.getElementById("precioFinal");
    precioFinal.innerHTML = "$ "+ totalCompra;
}


mostrarCarrito();

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


let precio = document.getElementById("precio");
let select = document.getElementById("cantidad");
let carritoCompras = document.getElementById("carritoCompras");


//ELIJO LA CANTIDAD DE CADA PRODUCTO
carritoCompras.addEventListener("input", e => {
    let producto = clickearCant(e);
    cambiarCantProd(producto.id,arrayProductosCarrito,producto.value);
    mostrarCarrito();
});


let botonFinalizar = document.getElementById("botonFinalizar");

botonFinalizar.addEventListener("click", () => {

    alert("Compra realizada con exito!");   
    botonFinalizar.href = "../index.html"      
});


{/*
<div class="card card-body col-lg-12">
                    <div class="media align-items-center align-items-lg-start text-lg-left flex-column flex-lg-row">
                        <div class="mr-2 mb-3 mb-lg-0">                          
                            <img src="../assets/img/auriculares.jpg" width="150" height="150" alt="">                           
                        </div>
            
                        <div class="media-body">
                            <h6 class="media-title font-weight-semibold">
                                <a href="#">Apple iPhone XR (Red, 128 GB)</a>
                            </h6>

                            <label for="">Cantidad</label>
                            <select name="" id="">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
            
                            <div class="mt-3 mt-lg-0 ml-lg-3 text-right pr-5 ">
                                <h3 class="mb-0 font-weight-semibold">$459.99</h3>
            
                                <div>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>   
                                </div>
            
                                <div class="text-muted">1985 reviews</div>
                            </div>
                        </div>
                    </div>
                </div>*/}