// Mostrar Carrito
const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartDOM = document.querySelector(".cart");

// Display del Carrito
//dentro de cart-content hay que listar todos los items elegidos
const cartContent = document.querySelector(".cart-content");
const footer = document.querySelector(".cart-footer");
const contenedor = document.querySelector(".contenedor");
const numberItems = document.querySelector(".cart-items");

// templates
const templateCart = document.getElementById("template-cart").content;
const templateFooter = document.getElementById("template-footer").content;

//fragment
const fragment = document.createDocumentFragment();

// cart
let cart = {};

//mostrar carrito
cartBtn.addEventListener("click", () => {
	cartDOM.classList.add("showCart");
	cartOverlay.classList.add("transparentBcg");
});
//cerrar carrito
closeCartBtn.addEventListener("click", () => {
	cartDOM.classList.remove("showCart");
	cartOverlay.classList.remove("transparentBcg");
});

document.addEventListener("DOMContentLoaded", () => {
	cartContent.addEventListener("click", (e) => {
		btnAccion(e);
	});

	contenedor.addEventListener("click", (e) => {
		addToCart(e);
	});

	if (localStorage.getItem("cart")) {
		cart = JSON.parse(localStorage.getItem("cart"));
		listadoCart();
	}
});

const addToCart = (e) => {
	if (e.target.classList.contains("bag-btn")) {
		setCart(e.target.parentElement);
	}
	e.stopPropagation();
};

//Armado del carrito
const setCart = (objeto) => {
	const cartProduct = {
		id: objeto.querySelector(".bag-btn").dataset.id,
		title: objeto.querySelector("h3").textContent,
		price: objeto.querySelector("h4").textContent,
		image: objeto.querySelector("img").src,
		cantidad: 1,
	};

	if (cart.hasOwnProperty(cartProduct.id)) {
		cartProduct.cantidad = cart[cartProduct.id].cantidad + 1;
	}
	cart[cartProduct.id] = { ...cartProduct };
	listadoCart();
};

//Pinto carrito en pantalla
const listadoCart = () => {
	cartContent.innerHTML = "";
	Object.values(cart).forEach((item) => {
		templateCart.querySelector("img").src = item.image;
		templateCart.querySelector("h4").textContent = item.title;
		templateCart.querySelector("h5").textContent =
			"$ " + item.price * item.cantidad;
		templateCart.querySelector(".suma").dataset.id = item.id;
		templateCart.querySelector(".item-amount").textContent = item.cantidad;
		templateCart.querySelector(".resta").dataset.id = item.id;

		const clone = templateCart.cloneNode(true);
		fragment.appendChild(clone);
	});

	cartContent.appendChild(fragment);

	mostarTotales();

	localStorage.setItem("cart", JSON.stringify(cart));
};

// Pinto los totales
const mostarTotales = () => {
	footer.innerHTML = "";

	//si el carrito está vacío
	if (Object.keys(cart).length === 0) {
		footer.innerHTML = `<p>Your cart it's empty.</p>`;
		return;
	}

	//suma total
	const sumaTotal = Object.values(cart).reduce(
		(acc, { cantidad, price }) => acc + cantidad * price,
		0
	);
	templateFooter.querySelector(".cart-total").textContent = sumaTotal;
	const clone = templateFooter.cloneNode(true);
	fragment.appendChild(clone);
	footer.appendChild(fragment);

	// vaciar carrito
	const clearCartBtn = document.querySelector(".clear-cart");
	clearCartBtn.addEventListener("click", () => {
		cart = {};
		listadoCart();
	});

	//cantidad total
	const cantidadTotal = Object.values(cart).reduce(
		(acc, { cantidad }) => acc + cantidad,
		0
	);
	numberItems.textContent = cantidadTotal;
};

// acciones de agregar y restar cantidades
const btnAccion = (e) => {
	if (e.target.classList.contains("suma")) {
		const producto = cart[e.target.dataset.id];
		producto.cantidad++;
		cart[e.target.dataset.id] = { ...producto };
		listadoCart();
	}

	if (e.target.classList.contains("resta")) {
		const producto = cart[e.target.dataset.id];
		producto.cantidad--;
		if (producto.cantidad === 0) {
			delete cart[e.target.dataset.id];
		}
		listadoCart();
	}

	e.stopPropagation();
};
