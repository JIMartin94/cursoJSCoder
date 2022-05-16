
let arrayProductos = [];
let arrayCarrito = [];

class Producto{
    
    constructor(id,nombre,cantidad,foto,precio){
        this.id = id;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.foto = foto,
        this.precio = precio;
    }
}

// INGRESO LOS PRODUCTOS QUE ESTAN A LA VENTA
const mouseLogi = new Producto(1,"Logitech M170/4940 Mouse Optico - Inalambrico Negro",1,"assets/img/mouse.jpg",750);
const microfonoAsus = new Producto(2,"MICROFONO HYPERX QUADCAST S PC/PS4",1,"assets/img/microfono.jpg",5000);
const auriculares = new Producto(3,"Auriculares gamer para PC PS4 ANDROID 7.1 USB EXTRA BASS",1,"assets/img/auriculares.jpg",3000);
const monitor = new Producto(4,"Monitor 24MK430H-B-B de 60,4 cm (23,8 pulgadas) 1920 x 1080",1,"assets/img/monitor.jpg",20000);
const routerGaming = new Producto(5,"Router gaming ASUS Wifi 6",1,"assets/img/router_gaming.jpg",2000);
const gabinete = new Producto(6,"Gabinete gamer raidmax X616TBF",1,"assets/img/gabinete.jpg",5000);
const tabletSamsung = new Producto(7,"Tablet Samsung Galaxy Tab S7",1,"assets/img/tablet_Samsung.jpg",35000);
const notebookAsus = new Producto(8,"Notebook ASUS I3-1005GI 4GB 1TB 15.6 1920X1080 X509JA-EJ062T",1,"assets/img/notebook_asus.jpg",150000);

arrayProductos.push(mouseLogi,microfonoAsus,auriculares,monitor,routerGaming,gabinete,tabletSamsung,notebookAsus);

// FUNCION PARA MOSTRAR TODOS LOS PRODUCTOS
const mostrarProductos = (arrayProductos) =>{

    let div_productos = document.getElementById("productos");
    div_productos.innerHTML = " ";

    for(item of arrayProductos){


    let div_col = document.createElement("div");
    div_col.className = "col-lg-3";

    let div_item = document.createElement("div");
    div_item.className = "productos_item";


    let img = document.createElement("img");
    img.className = "productos_item_imagen";
    img.alt = "producto";
    img.src = item.foto;

    let div_info = document.createElement("div");

    let a = document.createElement("a");
    a.className = "productos_item_texto";
    a.href = "#";
    a.innerHTML = item.nombre;

    let div_precio = document.createElement("div");

    let precio = document.createElement("p");
    precio.innerHTML = "$ " + item.precio;

    let boton_agregar = document.createElement("button");
    boton_agregar.type = "button";
    boton_agregar.className = "btn btn-primary agregar";
    boton_agregar.innerHTML = "Agregar al carrito";
    boton_agregar.id = item.id;

    div_precio.append(precio,boton_agregar);
    div_info.append(a,div_precio);
    div_item.append(img,div_info);
    div_col.append(div_item);
    div_productos.append(div_col);
    }
}

mostrarProductos(arrayProductos);

const encontrarPalabra = (palabra,frase) =>{

    let palabras = frase.split(' ');
    return palabras.indexOf(palabra) != -1;
}

let buscarp = document.getElementById("inputBuscardor");

buscarp.addEventListener("input", () =>{
    let arrayP = [];
    for(let prod of arrayProductos){
        if(encontrarPalabra((buscarp.value).toUpperCase(),(prod.nombre).toUpperCase())){
            console.log("encontro");
             arrayP.push(prod);
             mostrarProductos(arrayP);
             return 0;
        }else{
            mostrarProductos(arrayProductos);
        }
    }

    
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
let carrito_cant = document.getElementById("carrito_cant");

row_productos.addEventListener("click", e => {
    let id = clickearId(e);

    if(buscarProd(id,arrayCarrito)){
        Swal.fire({
            title: "Info",
            text: "El producto ya esta en el carrito!",
            icon: "info",
            timer: 3000
        })
    }else{
        arrayCarrito.push(buscarProd(id,arrayProductos));
        Toastify({
            text: "Agregado al carrito", 
            className: "info",
            duration: 3000,  
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
          }).showToast();
          carrito_cant.innerHTML =  arrayCarrito.length;
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


/* <div class="col-lg-3">
    <div class="productos_item">
        <img src="assets/img/mouse.jpg" alt="producto2" class ="productos_item_imagen">
        <div>
            <a href="#" class ="productos_item_texto">Logitech M170/4940 Mouse Optico - Inalambrico Negro</a>    
            <p>$ 153.00</p>
            <button type="button" class="btn btn-primary">Agregar al carrito</button>
        </div>
    </div>
</div> */