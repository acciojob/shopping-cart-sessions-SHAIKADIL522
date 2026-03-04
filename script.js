const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

function getCart() {
  var data = window.sessionStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
}

function saveCart(cart) {
  window.sessionStorage.setItem("cart", JSON.stringify(cart));
}

function renderProducts() {
  productList.innerHTML = "";
  products.forEach(function(product) {
    var li = document.createElement("li");

    // Use a text node so the button remains a proper child element
    var textNode = document.createTextNode(product.name + " - $" + product.price + " ");
    li.appendChild(textNode);

    var btn = document.createElement("button");
    btn.textContent = "Add to Cart";
    btn.setAttribute("data-id", String(product.id));
    btn.addEventListener("click", function() {
      addToCart(product.id);
    });

    li.appendChild(btn);
    productList.appendChild(li);
  });
}

function renderCart() {
  cartList.innerHTML = "";
  var cart = getCart();
  cart.forEach(function(item) {
    var li = document.createElement("li");
    li.textContent = item.name + " - $" + item.price;
    cartList.appendChild(li);
  });
}

function addToCart(productId) {
  var product = null;
  for (var i = 0; i < products.length; i++) {
    if (products[i].id === productId) {
      product = products[i];
      break;
    }
  }
  if (!product) return;

  var cart = getCart();
  cart.push({ id: product.id, name: product.name, price: product.price });
  saveCart(cart);
  renderCart();
}

function clearCart() {
  window.sessionStorage.removeItem("cart");
  renderCart();
}

clearCartBtn.addEventListener("click", clearCart);

renderProducts();
renderCart();