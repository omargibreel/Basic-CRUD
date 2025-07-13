var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescriptionInput = document.getElementById("productDescription");
var productImgInput = document.getElementById("productImg");
var searchInput = document.getElementById("searchInput")

var productList = [];


var regex = /^[A-Z][a-z]{3,8}$/
var addBtn = document.getElementById("addBtn")
var updateBtn = document.getElementById("updateBtn")
var currentIdx = 0
if (localStorage.getItem("productContainer") != null) {
    productList = JSON.parse(localStorage.getItem("productContainer"))
    displayData()
}

function addProduct() {
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        description: productDescriptionInput.value,
        image: productImgInput.files[0] ? `imgs/${productImgInput.files[0]?.name}` : "imgs/chefs-1.jpg",
    };
    productList.push(product);
    localStorage.setItem("productContainer", JSON.stringify(productList))
    // clearForm();
    displayData()
}

function clearForm() {
    productNameInput.value = null;
    productPriceInput.value = null;
    productCategoryInput.value = null;
    productDescriptionInput.value = null;
    productImgInput.value = null;
}

function deleteItem(idx) {
    productList.splice(idx, 1)
    localStorage.setItem("productContainer", JSON.stringify(productList))
    displayData()

}

function displayData() {
    var cartona = "";
    for (let i = 0; i < productList.length; i++) {
        cartona += `
        <div class="col">
    <div class="card">
        <img class="card-img-top" src=" ${productList[i].image} " alt=" ${productList[i].name} " />
        <div class="card-body">
            <span class="badge bg-info">Index: ${i} </span>
            <h3 class="card-title h6">ProductName: ${productList[i].name} </h3>
            <div class="d-flex flex-column gap-2">
                <span class="card-text small">ProductPrice: ${productList[i].price} </span>
                <span class="card-text small">productCategory: ${productList[i].category} </span>
                <span class="card-text small">productDescription: ${productList[i].description} </span>
            </div>
        </div>
        <div class="card-footer text-center d-flex gap-2 justify-content-center">
            <button onclick='deleteItem(${i})' class="btn btn-outline-danger"><i class="fas fa-trash"></i></button>
            <button onclick='setUpdateInfo(${i})' class="btn btn-outline-warning"><i class="fas fa-edit"></i></button>
        </div>
    </div>
</div>

        `
    }
    document.getElementById("rowData").innerHTML = cartona;
}
function searchData() {
    var term = searchInput.value

    var cartona = "";
    for (let i = 0; i < productList.length; i++) {
        if (productList[i].name.toLowerCase().includes(term.toLowerCase())) {
            cartona += `
        <div class="col">
    <div class="card">
        <img class="card-img-top" src=" ${productList[i].image} " alt=" ${productList[i].name} " />
        <div class="card-body">
            <span class="badge bg-info">Index: ${i} </span>
            <h3 class="card-title h6">ProductName: ${productList[i].name} </h3>
            <div class="d-flex flex-column gap-2">
                <span class="card-text small">ProductPrice: ${productList[i].price} </span>
                <span class="card-text small">productCategory: ${productList[i].category} </span>
                <span class="card-text small">productDescription: ${productList[i].description} </span>
            </div>
        </div>
        <div class="card-footer text-center d-flex gap-2 justify-content-center">
            <button onclick='deleteItem(${i})' class="btn btn-outline-danger"><i class="fas fa-trash"></i></button>
            <button class="btn btn-outline-warning"><i class="fas fa-edit"></i></button>
        </div>
    </div>
</div>

        `
        }
    }
    document.getElementById("rowData").innerHTML = cartona;

}

function setUpdateInfo(idx) {
    currentIdx = idx
    // productList[idx]
    productNameInput.value = productList[idx].name
    productPriceInput.value = productList[idx].price
    productCategoryInput.value = productList[idx].category
    productDescriptionInput.value = productList[idx].description

    addBtn.classList.add("d-none")
    updateBtn.classList.remove("d-none")
}

function updateProduct() {
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        description: productDescriptionInput.value,
        image: productImgInput.files[0] ? `imgs/${productImgInput.files[0]?.name}` : "imgs/chefs-1.jpg",
    };
    productList.splice(currentIdx, 1, product)

    updateBtn.classList.add("d-none")
    addBtn.classList.remove("d-none")
    localStorage.setItem("productContainer", JSON.stringify(productList))
    displayData()
}