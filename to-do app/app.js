// Reaching HTML elements
const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items;

// Load items
loadItemsFromLS();

// Call event listener
eventListeners();

function eventListeners(){
    // Submit an event
    form.addEventListener('submit', addNewItem);

    // Delete an item
    taskList.addEventListener('click', deleteItem);

    // Delete all items
    btnDeleteAll.addEventListener('click', deleteAllItems);
}

function loadItems(){
    items = loadItemsFromLS();
    items.forEach(function(item){
        createItem(item);
    })
}

// Getting items from local storage
function loadItemsFromLS(){
    if(localStorage.getItem('items') === null){
        items = [];
    }
    else{
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

// Set item to local storage
function setItemToLS(text){
    items = loadItemsFromLS();
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items));
}

// Delete items from local storage
function deleteItemFromLS(text){
    items = loadItemsFromLS();
    items.forEach(function(item,index){
        if(item === text){
            items.splice(index,1);
        }
    });
    localStorage.setItem('items', JSON.stringify(items));
}

function createItem(text){
    // Creating li element
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(text));

    // Creating a element
    const a = document.createElement('a');
    a.className = 'delete-item float-end';
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fas fa-times";"></i>';

    // Adding a to li
    li.appendChild(a);

    // Add li to ul
    taskList.appendChild(li);

    //e.preventDefault();
}

// Adding new item
function addNewItem(e){
    if(input.value === ''){
        alert("Değer girmediniz!");
        return;
    }

    // Create an item
    createItem(input.value);

    // Save to local storage
    setItemToLS(input.value);

    // Clear input
    input.value = '';

    e.preventDefault();
}

// Deleting item
function deleteItem(e){
    if(e.target.className === 'fas fa-times'){
        e.target.parentElement.parentElement.remove();

        // Delete items from local storage
        deleteItemFromLS(e.target.parentElement.parentElement.textContent);
    }

    e.preventDefault();
}

// Delete all items
function deleteAllItems(e){
    taskList.innerHTML = '';
    e.preventDefault();
}