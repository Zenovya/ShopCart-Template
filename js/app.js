// variables
const carts = document.querySelector('#carrito');
const listCourse = document.querySelector('#lista-cursos');
const containerCart = document.querySelector('#lista-carrito tbody');
const btnClear = document.querySelector('#vaciar-carrito');
let  items = [];

loadListeners()

function addCourse(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const selectCourse = e.target.parentElement.parentElement;

        data(selectCourse);
    }
}

function loadListeners() {
    listCourse.addEventListener('click', addCourse);
}

function data(course) {
    const info = {
        id: course.querySelector('a').getAttribute('data-id'), 
        title: course.querySelector('h4').textContent,
        image: course.querySelector('img').src,
        price: course.querySelector('.precio span').textContent,
        amount: 1
    }

    items = [...items, info];
    
    addCarts();
}

function addCarts(){
    clearHTML();
    items.forEach( course =>{
        console.log(course)
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>    
                <img src="${course.image}" width="150">
            </td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>${course.amount}</td>
            <td><a href="#" class="borrar-curso" data-id="${course.id}"> X </a> </td>

        `;

        containerCart.appendChild(row)
    })
}

function clearHTML(){
    while(containerCart.firstChild){
        containerCart.removeChild(containerCart.firstChild)
    }
}

