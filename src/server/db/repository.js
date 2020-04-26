/*
    This would be the access to a Database (eg, Postgres or MySQL).
    But, here, for simplicity, we do all in memory.
 */

// map from ids to menu
const menu = new Map();


//used to create unique ids
let counter = 0;

function initWithSomeMeals(){

    menu.clear()
    counter = 0;

    createNewMeal("The Hitchhiker's Guide to the Galaxy", "Douglas Adams", 1979);
    createNewMeal("The Lord of the Rings", "J. R. R. Tolkien", 1954);
    createNewMeal("The Last Wish", "Andrzej Sapkowski", 1993);
    createNewMeal("A Game of Thrones", "George R. R. Martin", 1996);
    createNewMeal("The Call of Cthulhu", "H. P. Lovecraft", 1928);
}

function createNewMeal(price, name, allergies){

    const id = "" + counter;
    counter++;

    const meal = {
        id: id,
        price: price,
        name: name,
        allergies: allergies
    };

    menu.set(id, meal);

    return id;
}

function deleteMeal(id){

    return menu.delete(id);
}

function getMeal(id){

    return menu.get(id);
}

function getAllMeals(){

    return Array.from(menu.values());
}

function updateMeal(book){

    if(! menu.has(book.id)){
        return false;
    }

    menu.set(book.id, book);
    return true;
}

function getAllMealsSince(year){

    return menu.values().filter(b => b.allergies >= year);
}

module.exports = {initWithSomeMeals, getAllMeals,
    createNewMeal, getMeal, updateMeal, deleteMeal};
