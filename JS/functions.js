const header = document.querySelector("header");
const IconoMenu = header.firstElementChild;
const submenu = document.querySelector(".submenu");
const IconoQuitar = submenu.querySelector(".remover_submenu");

const IconoCarrito = document.querySelector(".carrito-header");
const cart = document.querySelector(".cart");

// Badge del carrito
const badge = document.getElementById("cart-badge");

function actualizarBadge() {
  const cantidad = carritoLista.children.length;

  if (cantidad > 0) {
    badge.textContent = cantidad;
    badge.style.display = "block";
  } else {
    badge.style.display = "none";
  }
}

// Mostrar/Ocultar carrito
IconoCarrito.addEventListener("click", () => {
  cart.classList.toggle("show");
});

// Mostrar submenu
IconoMenu.addEventListener("click", () => {
  submenu.classList.toggle("show");
});

// Cerrar submenu
IconoQuitar.addEventListener("click", () => {
  submenu.classList.remove("show");
});

// Borrar elementos existentes del carrito (los del HTML)
const iconRemove = document.querySelectorAll(".remove");
iconRemove.forEach(elem => {
  elem.addEventListener("click", () => {
    const elemParent = elem.parentElement;
    elemParent.remove();
    actualizarBadge();
  });
});

// Agregar productos al carrito
const iconosCarrito = document.querySelectorAll(".iconoCarrito2");
const carritoLista = document.getElementById("carrito-lista");

iconosCarrito.forEach((icono) => {
  icono.addEventListener("click", (event) => {
    const producto = event.target.closest(".products__article");
    const nombre = producto.querySelector("h3").textContent;
    const precio = producto.querySelector("p").textContent.split(" ")[0];
    const imagen = producto.querySelector("img").src;

    const itemCarrito = document.createElement("li");
    itemCarrito.classList.add("item-carrito");

    itemCarrito.innerHTML = `
      <img src="${imagen}" alt="${nombre}" width="50">
      <span>${nombre}</span> - <strong>${precio}</strong>
      <i class="remove">
        <img src="img/icono_remover.png" alt="Eliminar" class="delete-icon" width="16">
      </i>
    `;

    carritoLista.appendChild(itemCarrito);

    actualizarBadge();
  });
});

// Eliminar producto del carrito (delegación)
carritoLista.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-icon")) {
    const item = event.target.closest(".item-carrito");
    item.remove();
    actualizarBadge();
  }
});