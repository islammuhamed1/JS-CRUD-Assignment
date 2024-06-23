var nameInput = document.getElementById("siteName");
var siteInput = document.getElementById("siteUrl");
var btnSubmit = document.getElementById("addBtn");
var tBody = document.getElementById("tableinfo");
var searchInput = document.getElementById("searchInput");
var btnAdd = document.getElementById("addBtn");
var btnUpdate = document.getElementById("btnUpdate");

var index = -1;
var bookMark = [];

if (localStorage.getItem("container") != null) {
    bookMark = JSON.parse(localStorage.getItem("container"));
    dataDisplay();
}

function addName() {
    if (validation(nameInput) && validation(siteInput)) {
        var names = {
            name: nameInput.value,
            url: siteInput.value
        };
        bookMark.push(names);
        dataDisplay();
        localStorage.setItem("container", JSON.stringify(bookMark));
        clearInput();
    }
}

function validation(joker) {
    var text = joker.value;
    var regex = {
        siteName: /^[A-Za-z\s]{3,30}$/,
        siteUrl: /\b(?:https?|ftp):\/\/[-A-Za-z0-9+&@#\/%?=~_|!:,.;]*[-A-Za-z0-9+&@#\/%=~_|]/
    };

    if (regex[joker.id].test(text) == true) {
        joker.classList.add("is-valid");
        joker.classList.remove("is-invalid");
        return true;
    } else {
        joker.classList.add("is-invalid");
        joker.classList.remove("is-valid");
        return false;
    }
}

function dataDisplay() {
    var searching = searchInput.value.toLowerCase();
    var cartona = '';
    for (var i = 0; i < bookMark.length; i++) {
        if (bookMark[i].name.toLowerCase().includes(searching)) {
            cartona += `
                <tr>
                    <td>${i}</td>
                    <td>${bookMark[i].name}</td>
                    <td><a href="${bookMark[i].url}" target="_blank">${bookMark[i].url}</a></td>
                    <td>
                        <button onclick="visitSite('${bookMark[i].url}')" class="btn btn-outline-info btn-sm">Visit</button>
                        <button onclick="setFormUpdate(${i})" class="btn btn-outline-warning btn-sm">Update</button>
                        <button onclick="deleteData(${i})" class="btn btn-outline-danger btn-sm">Delete</button>
                    </td>
                </tr>
                `;
        }
    }
    document.getElementById("tableinfo").innerHTML = cartona;
}

function setFormUpdate(indexElement) {
    nameInput.value = bookMark[indexElement].name;
    siteInput.value = bookMark[indexElement].url;

    btnAdd.classList.add('d-none');
    btnUpdate.classList.remove('d-none');
    index = indexElement;
}

function updateData() {
    var names = {
        name: nameInput.value,
        url: siteInput.value
    };
    bookMark.splice(index, 1, names);
    dataDisplay();
    localStorage.setItem("container", JSON.stringify(bookMark));
    clearInput();

    btnAdd.classList.remove('d-none');
    btnUpdate.classList.add('d-none');
}

function clearInput() {
    nameInput.value = null;
    siteInput.value = null;
}

function deleteData(indexItem) {
    bookMark.splice(indexItem, 1);
    localStorage.setItem("container", JSON.stringify(bookMark));
    dataDisplay();
}

function search(value) {
    dataDisplay();
}

function visitSite(url) {
    window.open(url, '_blank');
}
