const defaultProducts = [
  {
    name: "Wireless Headphones",
    price: "2499",
    image: "images/product1.jpg"
  },
  {
    name: "Bluetooth Speaker",
    price: "1299",
    image: "images/product2.jpg"
  },
  {
    name: "Smart Watch",
    price: "3999",
    image: "images/product3.jpg"
  },
  {
    name: "Gaming Mouse",
    price: "999",
    image: "images/product4.jpg"
  },
];

// Load products from localStorage or preload defaults
let products = JSON.parse(localStorage.getItem('products'));
if (!products || products.length === 0) {
  localStorage.setItem('products', JSON.stringify(defaultProducts));
  products = defaultProducts;
}

const container = document.getElementById('product-container');
products.forEach(product => {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p class="price">₹${product.price}</p>
   
    <a href="buy.html?product=${encodeURIComponent(product.name)}" class="buy-btn">Buy Now</a>
  `;
  container.appendChild(card);
});
