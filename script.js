const API_URL = "https://crudcrud.com/api/07b1ad6d5bec413aafbc2cd246f2155e/orders";

function addOrder() {

    const price = document.getElementById("price").value.trim();
    const dish = document.getElementById("dish").value.trim();
    const table = document.getElementById("table").value;

    // 🔥 Validation
    if (price === "" || dish === "") {
        alert("Please enter both dish and price");
        return;
    }

    if (price <= 0) {
        alert("Price must be greater than 0");
        return;
    }

    const order = { price, dish, table };

    axios.post(API_URL, order)
        .then(response => {
            showOrderOnScreen(response.data);

            // Clear inputs after success
            document.getElementById("price").value = "";
            document.getElementById("dish").value = "";
        })
        .catch(error => console.log(error));
}

function showOrderOnScreen(order) {

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    li.innerHTML = `
        <span><strong>${order.dish}</strong> - ₹${order.price}</span>
        <button class="btn btn-sm btn-danger">Delete</button>
    `;

    // 🔥 Delete from backend + UI
    li.querySelector("button").addEventListener("click", function () {

        axios.delete(`${API_URL}/${order._id}`)
            .then(() => {
                li.remove();
                updateTotal(order.table);
            })
            .catch(err => console.log(err));
    });

    document.getElementById(order.table).appendChild(li);
    updateTotal(order.table);
}

function loadOrders() {

    // 🔥 Clear all tables first
    document.getElementById("table1").innerHTML = "";
    document.getElementById("table2").innerHTML = "";
    document.getElementById("table3").innerHTML = "";

    axios.get(API_URL)
        .then(response => {
            response.data.forEach(order => {
                showOrderOnScreen(order);
            });
        })
        .catch(error => console.log(error));
}

function updateTotal(table) {

    const items = document.getElementById(table).children;
    let total = 0;

    for (let item of items) {
        const text = item.querySelector("span").innerText;
        const price = parseInt(text.split("₹")[1]);
        total += price;
    }

    document.getElementById(`total-${table}`).innerText = total;
}
window.addEventListener("DOMContentLoaded", loadOrders);