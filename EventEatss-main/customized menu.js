 let cart=[];
function addToCart(item, image, price) {
  cart.push({ item: item, image: image, price: price });
  renderCartItems();
  calculateTotalAmount();
}

function renderCartItems() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';

  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <p>${item.item}</p>
      <p>₹${item.price}</p>
    `;
    cartItems.appendChild(cartItem);
  });
}

  function processPayment() {
    // Logic to process payment
    alert('Payment processed successfully!');
    saveCartData();
    cart = [];
    renderCartItems();
    alert('Event Details Successfully Saved!');
    window.location.href = 'payment.html'; // Redirect to payment.php
  }
// ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

function calculateTotalAmount() {
  let totalAmount = 0;
  cart.forEach(item => {
    totalAmount += item.price;
  });

  const totalAmountElement = document.getElementById('total-amount');
  totalAmountElement.textContent = `Total Amount: ₹${totalAmount}`;
}

calculateTotalAmount();

// ...................................................................
function renderCartItems() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';

  cart.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <p>${item.item}</p>
      <p>₹${item.price}</p>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItems.appendChild(cartItem);
  });
}
function removeFromCart(index) {
  cart.splice(index, 1);
  renderCartItems();
  calculateTotalAmount();
}

function calculateTotalAmount() {
  let totalAmount = 0;
  cart.forEach(item => {
    totalAmount += item.price;
  });

  const totalAmountElement = document.getElementById("total-amount");
  totalAmountElement.textContent = 'Total Amount:₹ ' + totalAmount;
}


  function saveCartData() {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'save_cart.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          alert('Order Placed Successfully!');
        } else {
          alert('Please try again.');
        }
      }
    };
    xhr.send(JSON.stringify(cart));
  }

// Extract URL parameters and pre-fill the form fields
  function preFillFormFields() {
    var urlParams = new URLSearchParams(window.location.search);
    var name = urlParams.get('name');
    var email = urlParams.get('email');

    if (name && email) {
      document.getElementById('name').value = name;
      document.getElementById('email').value = email;
    } else {
      // Retrieve form data from localStorage and pre-fill the form fields
      var formDataJSON = localStorage.getItem('formData');
      if (formDataJSON) {
        var formData = JSON.parse(formDataJSON);
        document.getElementById('name').value = formData.name;
        document.getElementById('email').value = formData.email;
      }
    }
  }

  // Call the preFillFormFields function when the page is loaded
  window.onload = preFillFormFields;