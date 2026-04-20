function addOrder() {

    const price = document.getElementById("price").value;
    const dish = document.getElementById("dish").value;
    const table = document.getElementById("table").value;

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    li.innerHTML = `
        <span><strong>${dish}</strong> - ₹${price}</span>
        <button class="btn btn-sm btn-danger delete-btn">Delete</button>
    `;

    // Added delete functionality
    li.querySelector(".delete-btn").addEventListener("click", function () {
        li.remove();
    });

    document.getElementById(table).appendChild(li);
}