        
let k=localStorage.length;

const borrar = document.querySelector("#borrar");
borrar.addEventListener("click",(e)=>{
    localStorage.clear();
    window.location.reload();
});



function buscaPrecio (producto){
    let precioObtenido = productos_n[id=producto].precio;
    return precioObtenido;
}
function buscaProducto (producto){
   let productoObtenido = productos_n[id=producto].titulo;
    return productoObtenido;
}

function leerStorage(){
 
        let acava = document.querySelector("#listadoCompra");
     
       
        let s=0;
        let data_ver = "<h3>Mi Compra</h3>";
       while(s<k+1){
            let pro = ""+"datos"+s+"";
            let key = localStorage.key(s); 
            let guardado = localStorage.getItem(key);
            
            if(guardado !== null){
              
            data_ver = data_ver + buscaProducto(JSON.parse(guardado).producto) + " | " + buscaPrecio(JSON.parse(guardado).producto)+ " | Cantidad: "+JSON.parse(guardado).cantidad+ " <button id='b"+s+"' class='btn btn-danger' onclick='quitaItem("+s+")'>quitar</button><br>";
          }
            s++;
        }
        acava.innerHTML=(data_ver);

    
}

function quitaItem(k){
    let borraItem = "datos"+k;    
           localStorage.removeItem(borraItem);
            window.location.reload();
   
        
}



let productos_n = [];
fetch("./document.json")
  .then((res) => res.json())
  .then((data) => {
    cargarProductos(data);
  });

  const cargarProductos = (data) => {
    productos_n = data;
    const contenedor = document.getElementById("contenidos");
    productos_n.forEach((producto, indice) => {
      
      
      let card = document.createElement("div");
      
      card.classList.add("product__card");
      card.innerHTML = card.innerHTML + `<div class="col"><div class="card"  style="width: 18rem;">
          <h5 class="card-title">${producto.titulo}</h5>
          <img src=${producto.imagen} class="card-img-top" alt="...">
          <div class="card-body">
            <p class="card-text">
              ${producto.descripcion}
            </p>
            <h5 class="card__price">Precio: <span>${producto.precio}</span></h5>
            <p><label>Cantidad: </label><input type="number" id="numpro${indice}"></p>
            <a href="#" class="btn btn-info botcompra" id="btnpro${indice}">Añadir al Carrito</a>
          </div></div></div>`;
         
          card.innerHTML = card.innerHTML+`</div>`;
        

           
      contenedor.appendChild(card);
    
    

    });

  };

  setTimeout(function(){
    let tampro = productos_n.length;
    let ij = 0;
        while (ij < tampro){
            let nombot = ""+"#btnpro"+ij+"";
            let nomcant = ""+"#numpro"+ij+"";
            let pp = document.querySelector(nombot);
                pp.addEventListener("click",(e)=>{
                    let ji = nombot.substring(7);
                    if(cargavalor(nomcant)==""){
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Debe poner una cantidad!'
                          })
                    } else {
                        let producto = ji;
                        let cantidad = cargavalor(nomcant);
                        let miCompra = { "producto": producto, "cantidad": cantidad};
                        localStorage.setItem("datos"+k, JSON.stringify(miCompra));
                        k++;
                       
                        leerStorage();
                        Swal.fire("Se egrego el producto al carrito")
                    }
                });
    ij++;
    }
    }, 1000);

    setTimeout(function(){
        leerStorage();
        }, 1500);



    function cargavalor(valor){
        let pcant = document.querySelector(valor).value;
        return pcant;
    }