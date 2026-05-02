// DOM
const listaProductos = document.querySelector("#lista-productos");
const productos = document.querySelectorAll(".producto");
const zonaControles = document.querySelector("#zona-controles");
const mensajeVacio = document.querySelector("#mensaje-vacio");

let mostrarSoloFavoritos = false;

console.log("Productos encontrados en el DOM:", productos);


// Creación dinámica del filtro de categorías
const grupoCategoria = document.createElement("div");
grupoCategoria.classList.add("grupo-control");

const labelCategoria = document.createElement("label");
labelCategoria.textContent = "Filtrar por categoría:";
labelCategoria.setAttribute("for", "filtro-categoria");

const filtroCategoria = document.createElement("select");
filtroCategoria.id = "filtro-categoria";

const opcionesCategoria = [
    { valor: "todos", texto: "Todos" },
    { valor: "moviles", texto: "Móviles" },
    { valor: "tablets", texto: "Tablets" },
    { valor: "ordenadores", texto: "Ordenadores" }
];

opcionesCategoria.forEach(opcion => {
    const option = document.createElement("option");
    option.value = opcion.valor;
    option.textContent = opcion.texto;
    filtroCategoria.appendChild(option);
});

grupoCategoria.appendChild(labelCategoria);
grupoCategoria.appendChild(filtroCategoria);


// Creación  del buscador 
const grupoBusqueda = document.createElement("div");
grupoBusqueda.classList.add("grupo-control");

const labelBusqueda = document.createElement("label");
labelBusqueda.textContent = "Buscar producto:";
labelBusqueda.setAttribute("for", "buscador-productos");

const buscadorProductos = document.createElement("input");
buscadorProductos.type = "text";
buscadorProductos.id = "buscador-productos";
buscadorProductos.placeholder = "Escribe el nombre del producto...";

grupoBusqueda.appendChild(labelBusqueda);
grupoBusqueda.appendChild(buscadorProductos);


// Creación  contador 
const contadorFavoritos = document.createElement("div");
contadorFavoritos.classList.add("contador-favoritos");
contadorFavoritos.innerHTML = "⭐ Favoritos: <span id='numero-favoritos'>0</span>";


// Creación  botón Favoritos
const botonMostrarFavoritos = document.createElement("button");
botonMostrarFavoritos.classList.add("btn-mostrar-favoritos");
botonMostrarFavoritos.textContent = "Mostrar Favoritos";


// Se añaden todos al DOM
zonaControles.appendChild(grupoCategoria);
zonaControles.appendChild(grupoBusqueda);
zonaControles.appendChild(contadorFavoritos);
zonaControles.appendChild(botonMostrarFavoritos);




// Función para actualizar el contador de favoritos
function actualizarContadorFavoritos() {
    const productosFavoritos = document.querySelectorAll(".producto.favorito");
    const numeroFavoritos = document.querySelector("#numero-favoritos");

    numeroFavoritos.textContent = productosFavoritos.length;
}


// Función general para aplicar todos los filtros
function aplicarFiltros() {
    const categoriaSeleccionada = filtroCategoria.value;
    const textoBusqueda = buscadorProductos.value.toLowerCase().trim();

    let productosVisibles = 0;

    productos.forEach(producto => {
        const categoriaProducto = producto.dataset.categoria;
        const nombreProducto = producto.querySelector("h2").textContent.toLowerCase();
        const descripcionProducto = producto.querySelector("p").textContent.toLowerCase();
        const esFavorito = producto.classList.contains("favorito");

        const coincideCategoria =
            categoriaSeleccionada === "todos" || categoriaSeleccionada === categoriaProducto;

        const coincideBusqueda =
            nombreProducto.includes(textoBusqueda) || descripcionProducto.includes(textoBusqueda);

        const coincideFavorito =
            !mostrarSoloFavoritos || esFavorito;

        if (coincideCategoria && coincideBusqueda && coincideFavorito) {
            producto.classList.remove("oculto");
            productosVisibles++;
        } else {
            producto.classList.add("oculto");
        }
    });

    if (productosVisibles === 0) {
        mensajeVacio.classList.remove("oculto");
    } else {
        mensajeVacio.classList.add("oculto");
    }
}


// Evento click para añadir o eliminar favoritos
productos.forEach(producto => {
    const botonFavorito = producto.querySelector(".btn-favorito");
    const iconoFavorito = producto.querySelector(".icono-favorito");

    botonFavorito.addEventListener("click", () => {
        producto.classList.toggle("favorito");

        if (producto.classList.contains("favorito")) {
            iconoFavorito.textContent = "★";
            botonFavorito.textContent = "Eliminar de Favoritos";
        } else {
            iconoFavorito.textContent = "♡";
            botonFavorito.textContent = "Añadir a Favoritos";
        }

        actualizarContadorFavoritos();
        aplicarFiltros();
    });
});


// Evento change para filtrar por categoría
filtroCategoria.addEventListener("change", () => {
    aplicarFiltros();
});


// Evento input para búsqueda en tiempo real
buscadorProductos.addEventListener("input", () => {
    aplicarFiltros();
});


// Evento click para mostrar solo productos favoritos
botonMostrarFavoritos.addEventListener("click", () => {
    mostrarSoloFavoritos = !mostrarSoloFavoritos;

    if (mostrarSoloFavoritos) {
        botonMostrarFavoritos.textContent = "Mostrar Todos";
    } else {
        botonMostrarFavoritos.textContent = "Mostrar Favoritos";
    }

    aplicarFiltros();
});



// Estado inicial de la página
actualizarContadorFavoritos();
aplicarFiltros();