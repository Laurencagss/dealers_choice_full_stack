


let myForm = document.getElementById('myForm')
let myList = document.getElementById('myList')
let myInput= document.getElementById('myField')


myForm.addEventListener('submit', (x) => {
    x.preventDefault()
    createItem(myInput.value)
})

function createItem (inv) {
    let taskItem = `<li>${inv} <button onclick='deleteItem(this)'>Delete</button></li>`
    myList.insertAdjacentHTML('beforeend', taskItem)
    myInput.value = ''
    myInput.focus()
}


function deleteItem(deadEle) {
    deadEle.parentElement.remove()
}

module.exports = {
    createItem,
    deleteItem
}
