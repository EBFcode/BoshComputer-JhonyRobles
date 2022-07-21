// Aqui VAMUS!

const carritoDOM = document.querySelector(".carrito")
const productosDestacados = document.querySelector(".destacados")
const productoConDOM = document.querySelector(".productos__center")
const carritoCentro = document.querySelector(".carrito__center")
const abrirCarrito = document.querySelector(".carrito__icon")
const cerrarCarrito = document.querySelector(".close__carrito")
const overlay = document.querySelector(".carrito__overlay")
const carritoTotal = document.querySelector(".carrito__total")
const limpiarCarritoBtn = document.querySelector(".clear__carrito")
const productosTotales =document.querySelector(".item__total")
const detalles = document.getElementById('detalles')


let buttonDOM = [];
let carrito = [];

class UI {

	detalleDelProducto(id){
		const filtroDato = productos.filter(item => item.id == id)
		let result = ""
		filtroDato.forEach(producto => {
			result += `
			<article class="detalle-grid">
				<img src=${producto.image} alt="${producto.title}" class="img-fluid">
				<div class="detalles-content">
					<h3>${producto.title}</h3>
					<div class="rating">
						<span>
							<i class="bx bxs-star"></i>
						</span>
						<span>
							<i class="bx bxs-star"></i>
						</span>
						<span>
							<i class="bx bxs-star"></i>
						</span>
						<span>
							<i class="bx bxs-star"></i>
						</span>
						<span>
							<i class="bx bx-star"></i>
						</span>
					</div>
						<p class="price"><b>Precio: </b> $${producto.price}</p>
						<p class="description">
							<b>Descripcion: </b> <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta quae ad ex sint expedita perspiciatis odit eligendi! Et quia ex aperiam dolorum sunt omnis maiores. Repudiandae delectus iste exercitationem vel?</span>
						</p>
						<p class="description">
							<span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque voluptates consequuntur in assumenda odit hic, aut cupiditate dolorem aspernatur! Quibusdam iusto magnam vero maxime quisquam voluptatibus minima aliquam molestias, iure ratione commodi, reiciendis quasi.</span>
						</p>
						<hr>
						<div class="bottom">
							<div class="btn__group">
								<button class="btn addToCart" data-id=${producto.id}>Añadir carrito</button>
							</div>
						</div>
				</div>
			</article>
			`
		});
		detalles.innerHTML = result;
	}

	// Productos Destacados
	// categoriaDestacado(categoria){
	// 	let result = ""
	// 	const filtroDestacados = productos.filter(item => item.id == id)
	// 	productos.map((categoria) =>{
	// 		result += `
	// 		<div class="categoriaDestscado">
	// 		<div class="image__container">
	// 		<img src=${producto.image} alt="">
	// 	</div>
	// 		<div class="producto__footer">
	// 			<h1>${producto.title}</h1>
	// 			<div class="rating">
	// 			<span>
	// 				<i class="bx bxs-star"></i>
	// 			</span>
	// 			<span>
	// 				<i class="bx bxs-star"></i>
	// 			</span>
	// 			<span>
	// 				<i class="bx bxs-star"></i>
	// 			</span>
	// 			<span>
	// 				<i class="bx bxs-star"></i>
	// 			</span>
	// 			<span>
	// 				<i class="bx bx-star"></i>
	// 			</span>
	// 			</div>
	// 			<div class="price">$${producto.price}</div>
	// 		</div>
	// 		<div class="bottom">
	// 			<div class="btn__group">
	// 			<button class="btn addToCart" data-id=${producto.id}>Añadir carrito</button>
	// 			<a href="producto-detalles.html?id=${producto.id}" class="btn view">Vista</a>
	// 			</div>
	// 		</div>
    //     </div>
	// 			`
	// 	});
	// 	productosDestacados.innerHTML = result
	// }

	renderProductos(productos){
		let result = ""
		productos.forEach((producto) =>{
			result += `
			<div class="producto">
			<div class="image__container">
			<img src=${producto.image} alt="">
		</div>
			<div class="producto__footer">
				<h1>${producto.title}</h1>
				<div class="rating">
				<span>
					<i class="bx bxs-star"></i>
				</span>
				<span>
					<i class="bx bxs-star"></i>
				</span>
				<span>
					<i class="bx bxs-star"></i>
				</span>
				<span>
					<i class="bx bxs-star"></i>
				</span>
				<span>
					<i class="bx bx-star"></i>
				</span>
				</div>
				<div class="price">$${producto.price}</div>
			</div>
			<div class="bottom">
				<div class="btn__group">
				<button class="btn addToCart" data-id=${producto.id}>Añadir carrito</button>
				<a href="producto-detalles.html?id=${producto.id}" class="btn view">Vista</a>
				</div>
			</div>
        </div>
				`
		});
		productoConDOM.innerHTML = result
	}

	obtenerBotones(){
		const buttons = [...document.querySelectorAll(".addToCart")];
		buttonDOM = buttons;
		buttons.forEach((button)=> {
			const id = button.dataset.id;
			const inCart = carrito.find(item => item.id === parseInt(id, 10));

			if(inCart){
				button.innerHTML = "En el carrito";
				button.disabled = true;
			}
			button.addEventListener("click", e =>{
				e.preventDefault();
				e.target.innerHTML = "En el carrito";
				e.target.disabled = true;
				

				
				const carritoItem = {...Storage.getProductos(id), cantidad: 1}

				
				carrito = [...carrito, carritoItem]

				
				Storage.saveCart(carrito)

				
				this.setItemValues(carrito)
				this.agregarAlCarritoProductos(carritoItem)
				
			})
		})
	}

	setItemValues(carrito){
		let tempTotal = 0;
		let itemTotal = 0;
		carrito.map(item => {
			tempTotal += item.price * item.cantidad;
			itemTotal += item.cantidad;
		});
		carritoTotal.innerText = parseFloat(tempTotal.toFixed(2));
		productosTotales.innerText = itemTotal
	}

	agregarAlCarritoProductos({image, price, title, id}){
		const div = document.createElement("div")
		div.classList.add("carrito__item")

		div.innerHTML = `
		<img src=${image} alt=${title}>
		<div>
			<h3>${title}</h3>
			<p class="price">$${price}</p>
		</div>
		<div>
			<span class="increase" data-id=${id}>
				<i class="bx bxs-up-arrow"></i>
			</span>
			<p class="item__cantidad">1</p>
			<span class="decrease" data-id=${id}>
				<i class="bx bxs-down-arrow"></i>
			</span>
		</div>
		<div>
			<span class="remove__item" data-id=${id}>
				<i class="bx bx-trash"></i>
			</span>
		</div>
		`
		carritoCentro.appendChild(div)
	}
	show(){
		carritoDOM.classList.add("show")
		overlay.classList.add("show")
	}
	hide(){
		carritoDOM.classList.remove("show")
		overlay.classList.remove("show")
	}
	setAPP(){
		carrito = Storage.getCart()
		this.setItemValues(carrito)
		this.populate(carrito)
		abrirCarrito.addEventListener("click", this.show)
		cerrarCarrito.addEventListener("click", this.hide)
	}
	populate(carrito){
		carrito.forEach(item => this.agregarAlCarritoProductos(item))
	}
	cartLogic(){
		limpiarCarritoBtn.addEventListener("click", () =>{
			this.clearCarrito()
			this.hide()
		});

		carritoCentro.addEventListener("click", e =>{
			const target = e.target.closest("span")
			const targetElement = target.classList.contains("remove__item");
			console.log(target)
			console.log(targetElement)
			if(!target) return
			if(targetElement){
				const id = parseInt(target.dataset.id);
				this.removeItem(id)
				carritoCentro.removeChild(target.parentElement.parentElement)
			}else if(target.classList.contains("increase")){
				const id = parseInt(target.dataset.id, 10);
				let tempItem = carrito.find(item => item.id === id);
				tempItem.cantidad++;
				Storage.saveCart(carrito)
				this.setItemValues(carrito)
				target.nextElementSibling.innerText = tempItem.cantidad
			}else if(target.classList.contains("decrease")){
				const id = parseInt(target.dataset.id, 10);
				let tempItem = carrito.find(item => item.id === id);
				tempItem.cantidad--;

				if(tempItem.cantidad > 0){
					Storage.saveCart(carrito);
					this.setItemValues(carrito);
					target.previousElementSibling.innerText = tempItem.cantidad;
				}else{
					this.removeItem(id);
					carritoCentro.removeChild(target.parentElement.parentElement)
				}
			}
		});
	}
	clearCarrito(){
		const cartItems = carrito.map(item => item.id)
		cartItems.forEach(id => this.removeItem(id))

		while(carritoCentro.children.length > 0){
			carritoCentro.removeChild(carritoCentro.children[0])
		}
	}
	removeItem(id){
		carrito = carrito.filter(item => item.id !== id);
		this.setItemValues(carrito)
		Storage.saveCart(carrito)
		let button = this.singleButton(id);
		if(button){
			button.disabled = false;
			button.innerText = "Añadir carrito"
		}
	}
	singleButton(id){
		return buttonDOM.find(button => parseInt(button.dataset.id) === id)
	}
}



class Storage {
	static saveProduct(obj){
		localStorage.setItem("productos", JSON.stringify(obj))
	}
	static saveCart(carrito){
		localStorage.setItem("carrito", JSON.stringify(carrito))
	}
	static getProductos(id){
		const producto = JSON.parse(localStorage.getItem("productos"))
		return producto.find(product =>product.id === parseFloat(id, 10))
	}
	static getCart(){
		return localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : [];
	}
}

class Productos {
	async getProductos() {
		try {
				const result = await fetch("productos.json")
				const data = await result.json()
				const productos = data.items
				return productos
			}catch(err){
				console.log(err)
			}
	}
}

let category = "";
let productos  = [];

function categoryValue(){
	const ui = new UI();

	category = document.getElementById("category").value
	if(category.length > 0){
		const producto = productos.filter(regx => regx.category === category)
		ui.renderProductos(producto)
		ui.obtenerBotones();
	}else{
		ui.renderProductos(productos)
		ui.obtenerBotones();
	}
}

const query = new URLSearchParams(window.location.search)
let id = query.get('id')

// :) Hola profe!

document.addEventListener("DOMContentLoaded", async () =>{
	const productosLista = new Productos();
	const ui = new UI();

	ui.setAPP()

	productos = await productosLista.getProductos()
	if(id){
		ui.detalleDelProducto(id)
		Storage.saveProduct(productos)
		ui.obtenerBotones();
		ui.cartLogic();
	}else{
		ui.renderProductos(productos)
		Storage.saveProduct(productos)
		ui.obtenerBotones();
		ui.cartLogic();
	}
})

