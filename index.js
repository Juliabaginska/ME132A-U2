"use strict";

// Createes new plant + return
function createPlant(id, name, store, price) {
    let plant = { 
        name: name,
        store: store,
        price: price,
    };

    return plant;
}

// Adds a plant
function addPlantToDatabase(database, plant) {
    database.push(plant);
}

function removePlantById(plants, id) {
    for (let i = 0; i < plants.length; i++) {
        let plant = plants[i];
        if (plant.id == id) {
            plants.splice(i,1);
            return;
        }
    }
}

// Filters by store
function getPlantsByStore(plants, store) {
    let plantsByStore = [];
    for (let plant of plants) {
        if (plant.store.toLowerCase() == store.toLowerCase()) {
            plantsByStore.push(plant);
        }
    }
    return plantsByStore;
}

// Filter by price
function getPlantsByPrice(plants, price) {
    let plantsByPrice = [];
    for (let plant of plants) {
        if (plant.price.toLowerCase() == price.toLowerCase()) {
            plantsByPrice.push(plant);
        }
    }
    return plantsByPrice;
}

// Creates HTML document and List
function renderPlant(plant) {
    let div = document.createElement("div");
    div.classList.add("plant");
    div.id = plant.id;

    div.innerHTML = `
    <li>${plant.name}</li>
    <div>${plant.store}</div>
    <div>${plant.price}</div>
    <button type="button">Remove</button>
`;
return div;

}

function renderPlants(plants) {
    let plantsElement = document.getElementById("plants");
    plantsElement.innerHTML = "";
    for (let plant of plants) {
        let plantElement = renderPlant(plant);
        plantsElement.appendChild(plantElement)
    }
    setRemovePlantHandlers();
}

function onAddPlantSubmit(event) {
    event.preventDefault();
    let name = document.getElementById(name).value;
    let store = document.getElementById(store).value;
    let price = document.getElementById(price).value;
    let plant = createNewPlant(name, store, price);

// Alerts if input field is not filled 
    if(name == "") {
        return alert("All fields are not filled")
    }
    else if(store == ""){
        return alert("All fields are not filled")
    }
    else if(price == ""){
        return alert("All fields are not filled")
    }

    plant.id = database[database.length - 1].id + 1;
    addPlantToDatabase(database, plant)
    renderPlants(database);
    let form = document.getElementById("addPlantForm");
    form.reset();
}

function setAddPlantHandler() {
    let form = document.getElementById("addPlantForm");
    form.addEventListner("submit", onAddPlantSubmit);
}

// Removes, confirms 
function onRemovePlantClick(event) {
    let button = event.target;
    let id = button.parentElement.id;

    if(confirm(`Do you want to remove this plant?`)) {
        removePlantById(database, id);
        renderPlants(database);
    }
}

function setRemovePlantHandlers() {
    let buttons = document.querySelectorAll(".plant button");
    for (let button of buttons) {
        button.addEventListener("click", onRemovePlantClick);
    }
}

function onFilterByStoreSubmit(event) {
    event.preventDefault();
    let store = document.getElementById("filterStore").value;
    let plants = getPlantsByStore(database, store);
    renderPlants(plants); 
}

function onFilterByPriceSubmit(event) {
    event.preventDefault();
    let price = document.getElementById("filterPrice").value;
    let plants = getPlantsByPrice(database, price);
    renderPlants(plants); 
}

// Retores website
function onResetClick() {
    document.getElementById("filterStore").value = "";
    document.getElementById("filterPrice").value = "";
    renderPlants(database);
}

function setFilterPlantHandlers() {
    let storeForm = document.getElementById("filterByStore");
    let priceForm = document.getElementById("filterByPrice");
    let reset = document.getElementById("reset");
    storeForm.addEventListener("submit", onFilterByStoreSubmit);
    priceForm.addEventListener("submit", onFilterByPriceSubmit);
    reset.addEventListener("click", onResetClick);
}

renderPlants(database);
setAddPlantHandler();
setFilterPlantHandlers();

