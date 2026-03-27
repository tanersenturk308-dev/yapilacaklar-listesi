const addForm = document.querySelector(".add-form");
const itemList = document.querySelector(".items");
const removebtn = document.querySelector(".remove-btn");
const filterbuttons = document.querySelectorAll(".btn-filter button");
const clearBtn = document.querySelector(".remove-btn");



document.addEventListener("DOMContentLoaded", function() {

    loadItems();
addForm.addEventListener("submit",addItem);
removebtn.addEventListener("click", removeItem);
displayChange();
for (let button of filterbuttons) {
    button.addEventListener("click", filterButtons);
}
clearBtn.addEventListener("click", clear);


});


function clear() {
    itemList.innerHTML = "";
    localStorage.removeItem("Items");
    displayChange();
}

function saveToLS() {
    const liItems = document.querySelectorAll("li");
    const liste = [];

    for(let li of liItems) {
        const id = li.getAttribute("item-id");
        const name1 = li.querySelector(".item-text").textContent;
        const completed = li.hasAttribute("item-completed");

        liste.push({ id, name1, completed});
    }
    localStorage.setItem("Items", JSON.stringify(liste));
    
}


function addItem(e){
    e.preventDefault();
    const text = document.querySelector(".add-input").value;
    
    if(text.trim().length===0){
        alert("Lütfen bir görev giriniz.");
        return;
    }
    createItem(text);
        saveToLS();


    document.querySelector(".add-input").value = "";
    
}
function createItem(text){
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.select = "false"
    checkbox.className = "item-checkbox";
    checkbox.addEventListener("change", itemComplete);
    
    const span = document.createElement("span");
    span.className = "item-text"
    span.innerText = text;

    const icon = document.createElement("i");
    icon.className = "delete-bi bi-trash3";
    icon.addEventListener("click", function(remove){
        const li = icon.closest("li");
    li.remove();
    saveToLS();
    displayChange();
    });
    const icon2 = document.createElement("i");
    icon2.className = "bi bi-pencil-square"
    icon2.addEventListener("click", editItem);


    const div = document.createElement("div");
    div.className = "item-btn";
    div.appendChild(icon);
    div.appendChild(icon2);

    const li = document.createElement("li");
    li.className = "item";
    li.setAttribute("item-id", Date.now());
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(div);

    itemList.prepend(li);
    displayChange();
    filterItems();
    return li;
    // const input = document.querySelector(".add-input");
    // input.value = "";
}
const btn = document.querySelector(".remove-btn");
btn.addEventListener("click", function(){
    itemList.innerHTML = "";
    });

    function itemComplete(e){
        const textspan = e.target.nextElementSibling;

        if(e.target.checked){
            textspan.classList.add("completed");
            e.target.parentElement.setAttribute("item-completed", "");
        }
        else{
            textspan.classList.remove("completed");
            e.target.parentElement.removeAttribute("item-completed");
        }
        filterItems();
        saveToLS();
        

    }

    function editItem(e){
        const span = e.target.parentElement.previousElementSibling;
        const text = prompt("Görevi düzenle:", span.textContent);
        if(text !== null && text.trim().length > 0 ){
            span.textContent = text;
            saveToLS();
            
        }

    }

    function removeItem() {
        itemList.innerHTML = "";
        displayChange();
        saveToLS();
       
    }


    function displayChange() {
        const isEmpty = itemList.querySelectorAll("li").length===0;
        const alert = document.querySelector(".alert");
        const filterBtns = document.querySelector(".btn-filter");

        filterBtns.classList.toggle("d-none", isEmpty)
        alert.classList.toggle("d-none", !isEmpty);
        removebtn.classList.toggle("d-none", isEmpty);
        
        
    }

    function filterButtons(e) {
        for(let btn of filterbuttons) {
            btn.classList.remove("btn-selected");
            btn.classList.add("btn-default");
        }
        e.target.classList.add("btn-selected");
        e.target.classList.remove("btn-default");
        filterItems();

    }

    function filterItems() {
        const filterAttribute = document.querySelector(".btn-selected").getAttribute("complete");
        const li_list = document.querySelectorAll(".items li");

        for(let li of li_list) {
            li.classList.remove("d-flex");
            li.classList.remove("d-none");

            const li_complete = li.hasAttribute("item-completed");
            if(filterAttribute=="Completed") {
                li.classList.toggle(li_complete ? "d-flex":"d-none");
            }
            else if(filterAttribute=="Incomplete") {
                li.classList.toggle(li_complete ? "d-none":"d-flex");
            }
            else{
                li.classList.toggle("d-flex");
            }

        }

    }





    function loadItems() {
    const data = JSON.parse(localStorage.getItem("Items")) || [];
     data.reverse();

    for(let item of data){
        

        const li = createItem(item.name1);

        if(item.completed){
            li.setAttribute("item-completed", "");
            li.querySelector(".item-checkbox").checked = true;
            li.querySelector(".item-text").classList.add("completed");
        }
    }
}