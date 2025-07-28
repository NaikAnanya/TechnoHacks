// Load existing products
let products = JSON.parse(localStorage.getItem('products')) || [];

// Add product
document.getElementById('add-product-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('productName').value.trim();
  const price = document.getElementById('productPrice').value;
  const image = document.getElementById('productImage').value.trim();

  if (name && price && image) {
    const newProduct = { name, price, image };
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    alert("Product added!");
    this.reset();
    renderProductList();
  }
});

// Delete product
function deleteProduct(index) {
  if (confirm("Are you sure you want to delete this product?")) {
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    renderProductList();
  }
}

// Render list of products to delete
function renderProductList() {
  const list = document.getElementById('product-list');
  list.innerHTML = '';
  products.forEach((product, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${product.name} - ₹${product.price}
      <button onclick="deleteProduct(${index})">Delete</button>
    `;
    list.appendChild(li);
  });
}

renderProductList();
