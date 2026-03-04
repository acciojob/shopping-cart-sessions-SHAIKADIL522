
Copy

// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Helper: get cart from sessionStorage
function getCart() {
  const data = sessionStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
}

// Helper: save cart to sessionStorage
function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Render product list
function renderProducts() {
  productList.innerHTML = "";
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} 
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });

  // Attach click listeners to all "Add to Cart" buttons
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      addToCart(parseInt(this.getAttribute("data-id")));
    });
  });
}

// Render cart list from sessionStorage
function renderCart() {
  cartList.innerHTML = "";
  const cart = getCart();
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const cart = getCart();
  cart.push({ id: product.id, name: product.name, price: product.price });
  saveCart(cart);
  renderCart();
}

// Clear cart
function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

// Clear Cart button listener
clearCartBtn.addEventListener("click", clearCart);

// Initial render on page load
renderProducts();
renderCart();
