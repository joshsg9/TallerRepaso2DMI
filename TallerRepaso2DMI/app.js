// =======================
// DOM
// =======================

// Obtiene el elemento del HTML con id "catalogo"
// Aquí se van a insertar todas las tarjetas de productos
const catalogo = document.getElementById("catalogo");


// =======================
// CARGAR JSON (FETCH)
// =======================

function cargarProductos() {

    // fetch hace una petición para traer el archivo productos.json
    fetch("productos.json")

        // Convierte la respuesta en formato JSON (objeto JS)
        .then(response => response.json())

        // Recibe los datos ya convertidos
        .then(data => {

            // Llama a la función que renderiza los productos en pantalla
            renderizarProductos(data);

        })

        // Captura errores si el JSON no carga
        .catch(error => {
            console.log("Error cargando JSON:", error);
        });

}


// =======================
// FUNCIÓN PRINCIPAL
// =======================

function renderizarProductos(productos) {

    // Recorre cada producto del JSON
    productos.forEach(producto => {

        // Crea una tarjeta para cada producto
        const card = crearCard(producto);

        // Agrega la tarjeta al contenedor principal
        catalogo.appendChild(card);

    });

}


// =======================
// CREAR TARJETA
// =======================

function crearCard(producto) {

    // Crea un div que será la tarjeta
    const card = document.createElement("div");
    card.classList.add("card");

    // Crea la imagen del producto
    const img = document.createElement("img");
    img.src = producto.imagen;

    // Crea el nombre del producto
    const nombre = document.createElement("h2");
    nombre.textContent = producto.nombre;

    // Crea la descripción
    const descripcion = document.createElement("p");
    descripcion.textContent = producto.descripcion;

    // Crea el precio
    const precio = document.createElement("p");
    precio.textContent = "$" + producto.precio.toFixed(2);
    precio.classList.add("precio");

    // =======================
    // BOTÓN CARRITO
    // =======================

    const btnCarrito = document.createElement("button");
    btnCarrito.textContent = "Agregar al carrito";

    // Evento cuando el usuario hace clic
    btnCarrito.addEventListener("click", function () {

        // Cambia el texto del botón
        btnCarrito.textContent = "Agregado :D";

        // Desactiva el botón
        btnCarrito.disabled = true;
    });


    // =======================
    // BOTÓN RESEÑAS
    // =======================

    const btnReseñas = document.createElement("button");
    btnReseñas.textContent = "Ver reseñas";

    // Crea el contenedor de reseñas
    const contenedorReseñas = crearReseñas(producto.reseñas);

    // Evento para mostrar/ocultar reseñas
    btnReseñas.addEventListener("click", function () {

        // Si están ocultas
        if (contenedorReseñas.style.display === "none") {

            // Se muestran
            contenedorReseñas.style.display = "block";
            btnReseñas.textContent = "Ocultar reseñas";

        } else {

            // Se ocultan
            contenedorReseñas.style.display = "none";
            btnReseñas.textContent = "Ver reseñas";
        }

    });

    // =======================
    // ARMAR TARJETA
    // =======================

    // Agrega todos los elementos a la tarjeta
    card.appendChild(img);
    card.appendChild(nombre);
    card.appendChild(descripcion);
    card.appendChild(precio);
    card.appendChild(btnCarrito);
    card.appendChild(btnReseñas);
    card.appendChild(contenedorReseñas);

    // Devuelve la tarjeta ya construida
    return card;
}


// =======================
// CREAR RESEÑAS
// =======================

function crearReseñas(reseñas) {

    // Contenedor de reseñas
    const contenedor = document.createElement("div");
    contenedor.classList.add("reseñas");

    // Inicialmente oculto
    contenedor.style.display = "none";

    // Si no hay reseñas
    if (reseñas.length === 0) {

        const sinReseñas = document.createElement("p");
        sinReseñas.textContent = "No hay reseñas";

        contenedor.appendChild(sinReseñas);

        return contenedor;
    }

    // Recorre cada reseña
    reseñas.forEach(r => {

        const reseña = document.createElement("p");

        // Muestra usuario, fecha y comentario
        reseña.textContent = r.usuario + " (" + r.fecha + "): " + r.texto;

        contenedor.appendChild(reseña);
    });

    return contenedor;
}


// =======================
// EJECUCIÓN
// =======================

// Inicia todo el proceso cargando los productos
cargarProductos();