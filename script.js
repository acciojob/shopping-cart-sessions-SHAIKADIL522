// ===== PRODUCTS DATA =====
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// ===== DOM ELEMENTS =====
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// ===== STORAGE HELPERS =====
const getCart = () => {
  const storedCart = sessionStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

const saveCart = (cart) => {
  sessionStorage.setItem("cart", JSON.stringify(cart));
};

// ===== RENDER PRODUCTS =====
const renderProducts = () => {
  productList.innerHTML = "";

  products.forEach(product => {
    const li = document.createElement("li");

    const textNode = document.createTextNode(
      `${product.name} - $${product.price} `
    );

    const button = document.createElement("button");
    button.textContent = "Add to Cart";
    button.dataset.id = product.id;

    li.appendChild(textNode);
    li.appendChild(button);
    productList.appendChild(li);
  });
};

// ===== RENDER CART =====
const renderCart = () => {
  cartList.innerHTML = "";

  const cart = getCart();

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
};

// ===== ADD TO CART =====
const addToCart = (id) => {
  const cart = getCart();

  const product = products.find(p => p.id === id);
  if (!product) return;

  // IMPORTANT: Push new object copy
  cart.push({
    id: product.id,
    name: product.name,
    price: product.price
  });

  saveCart(cart);
  renderCart();
};

// ===== CLEAR CART =====
const clearCart = () => {
  sessionStorage.removeItem("cart");
  renderCart();
};

// ===== EVENT LISTENERS =====
productList.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const id = Number(e.target.dataset.id);
    addToCart(id);
  }
});

clearCartBtn.addEventListener("click", clearCart);

// ===== INITIAL LOAD =====
renderProducts();
renderCart();