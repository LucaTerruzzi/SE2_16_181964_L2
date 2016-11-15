//reference to the table on the page
var items_table = document.getElementById("items");

//array of items in the warehouse to be displayed
var items = [];

//total number of items in the warehouse
var item_count = 0;

//maximum amount of items
var max_amount = 30;

/**
 * @Show the add item menu, hiding the add button.
 */
function order(){
    //Show content of add menu item and hide the order button
    document.getElementById("add_form").style.display = "block";
    document.getElementById("order_button").style.display = "none";
    //check amount
    checkAmount();
    
}

/**
 * @Add an item to the warehouse or update it if already present.
 * @param [in] string item_name name of the item to be added/updated.
 * @param [in] string item_quantity quantity of the item to be added/updated.
 */
function addToWarehouse(item_name, item_quantity) {
    //check if item already present
    var found = false;
    for(var i in items){
        if(items[i].item_name == item_name){
            //item already present, update quantity
            items[i].quantity += parseInt(item_quantity);
            item_count += parseInt(item_quantity);
            //update table
            items_table.rows[1].cells[i].innerHTML = items[i].quantity;
            //stop looping
            found = true;
            break;
                
        }
    }
    //if the item is not present
    if(!found){
        //create new item
        new_item = {item_name:item_name, quantity:parseInt(item_quantity)}
        //add item to warehouse
        items.push(new_item);
        item_count += parseInt(item_quantity);
        //update table
        var cell_name = items_table.rows[0].insertCell(-1);
        cell_name.innerHTML = item_name;
        var cell_quantity = items_table.rows[1].insertCell(-1);
        cell_quantity.innerHTML = item_quantity;
            
    }
    //Hide add menu item and show the order button
    document.getElementById("add_form").style.display = "none";
    document.getElementById("order_button").style.display = "block";
    
    //check amount NB after insertion
    checkAmount();
    
}

/**
 * @Process & validate input from form, and clear the form for future usage.
 */
function btnAdd(){
    //get form element from page
    var form = document.getElementById("add_form");
    //extract values from form
    var item_name = form.elements[0].value;
    var item_quantity = form.elements[1].value;
    //validation of data
    if(item_name == null || item_name == ""){
        alert("Item name can't be empty!");
    }else if(item_quantity == null || item_quantity < 1){
        alert("Quantity value not valid!");
    }else{
        //if valid, clear the form and add to warehouse
        form.elements[0].value = null;
        form.elements[1].value = null;
        addToWarehouse(item_name, item_quantity);
    }
}

/**
 * @Check if the maximum amount inserted is valid and update max_amount.
 */
function setAmount(){
    //get value from form
    var value = document.getElementById("amount_form").elements[0].value;
    //check if value is valid
    if(value == null || value < 0){
        alert("Value for max amount not valid!");
    }else{
        max_amount = value;
        //check amount NB after change
        checkAmount();
    }
}

/**
 * @Check if the number of items is greater that the maximum and display an alert.
 */
function checkAmount(){
    if(item_count > max_amount){
        alert("The total number of items is greater than the maximum!");
    }
}

/**
 * @Load some defaults values into the table and maximum amount field.
 */
function loadDefaults(){
    addToWarehouse("Item1", 3);
    addToWarehouse("Item2", 6);
    document.getElementById("amount_form").elements[0].value = max_amount;
}
