const arrayProductos = [];
let arrayCarrito = [];

const obtenerProductos = async () =>{

    const responseProductos = await fetch("jsons/productos.json");

    const productos = await responseProductos.json();

    for(let producto of productos){
        arrayProductos.push(producto);
    }
    mostrarProductos(arrayProductos);
}

// FUNCION PARA MOSTRAR TODOS LOS PRODUCTOS
const mostrarProductos = (arrayProductos) =>{

    let div_productos = document.getElementById("productos");
    div_productos.innerHTML = " ";

    for(item of arrayProductos){
        let div_col = document.createElement("div");
        div_col.className = "col-lg-3";
        div_col.innerHTML = '<div class="productos_item">'+
                                '<img src="' + item.imagen +'" alt="producto" class ="productos_item_imagen">'+
                                '<div>'+
                                    '<a href="#" class ="productos_item_texto">'+ item.nombre+'</a>'+
                                    '<div>'+
                                        '<p> $'+ item.precio +'</p>'+
                                        '<button type="button" class="btn btn-primary agregar" id="'+ item.id +'" >Agregar al carrito</button>'+
                                    '</div>'+
                                '</div>'+
                            '</div>';
        div_productos.append(div_col);
    }

    if(localStorage.length > 0){
        arrayCarrito = JSON.parse(localStorage.getItem("productosCarrito"));
        carrito_cant.innerHTML = arrayCarrito.length

        let cantidad = 0;
          for(let item of arrayCarrito){
              cantidad +=  parseInt(item.cantidad);
          }
          carrito_cant.innerHTML =  cantidad;
    }
}



obtenerProductos();


const encontrarPalabra = (palabra,frase) =>{

    let palabras = frase.split(' ');
    return palabras.indexOf(palabra) != -1;
}

let buscarp = document.getElementById("inputBuscardor");

buscarp.addEventListener("input", () =>{
    let arrayP = [];
    for(let prod of arrayProductos){
        if(encontrarPalabra((buscarp.value).toUpperCase(),(prod.nombre).toUpperCase())){
             arrayP.push(prod);
        }
    }
    return arrayP.length == 0 ? mostrarProductos(arrayProductos) : mostrarProductos(arrayP);
});

//OBTENGO EL ID DE CADA BOTON
const clickearId = e => {
    if(e.target.classList.contains("agregar")){
        return e.target.id;
   }
}


//BUSCO EL ELEMENTO DE UNA ARRAY POR EL ID
const buscarProd = (id,lista) =>{
    return lista.find((elemento)=>{
        if(elemento.id == id){
            return elemento;
        }
    });
}

//GUARDO CADA PRODUCTO EN EL ARRAY
let row_productos = document.querySelector(".row_productos");
const carrito_cant = document.getElementById("carrito_cant");

row_productos.addEventListener("click", e => {
    let id = clickearId(e);

    if(buscarProd(id,arrayCarrito)){
        Swal.fire({
            title: "Info",
            text: "El producto ya esta en el carrito!",
            icon: "info",
            timer: 3000
        })
    }else if(id != null){
        arrayCarrito.push(buscarProd(id,arrayProductos));
        Toastify({
            text: "Agregado al carrito",
            className: "info",
            duration: 3000,
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
        }).showToast();
        let cantidad = 0;
        for(let item of arrayCarrito){
            cantidad +=  parseInt(item.cantidad);
        }
        carrito_cant.innerHTML =  cantidad;
    }

});

//CLICKEO EL CARRITO Y GUARDO EL ARRAY DE PRODUCTOS
let carrito = document.getElementById("carrito");
carrito.addEventListener("click", () => {

    if(arrayCarrito.length == 0){
        Swal.fire({
            title: "Error",
            text: "El carrito se encuentra vacio!",
            icon: "error",
            timer: 3000
        })
    }else{
        carrito.href="view/carrito.html";
        localStorage.setItem("productosCarrito", JSON.stringify(arrayCarrito));
    }

});
