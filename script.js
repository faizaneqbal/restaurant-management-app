const API_URL = "https://crudcrud.com/api/07b1ad6d5bec413aafbc2cd246f2155e/orders";

function addOrder() {

    const price = document.getElementById("price").value;
    const dish = document.getElementById("dish").value;
    const table = document.getElementById("table").value;

    const order = {
        price,
        dish,
        table
    };

    axios.post(API_URL, order)
        .then(response => {
            showOrderOnScreen(response.data);
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
            })
            .catch(err => console.log(err));
    });

    document.getElementById(order.table).appendChild(li);
}

function loadOrders() {

    axios.get(API_URL)
        .then(response => {
            response.data.forEach(order => {
                showOrderOnScreen(order);
            });
        })
        .catch(error => console.log(error));
}

window.addEventListener("DOMContentLoaded", loadOrders);