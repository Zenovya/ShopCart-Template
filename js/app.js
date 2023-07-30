// variables
const cart = document.querySelector('#carrito');
const listCourse = document.querySelector('#lista-cursos');
const containerCart = document.querySelector('#lista-carrito tbody');
const btnClear = document.querySelector('#vaciar-carrito');
let items = [];

loadListeners()

function addCourse(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const selectCourse = e.target.parentElement.parentElement;

        data(selectCourse);
    }
}

function loadListeners() {
    listCourse.addEventListener('click', addCourse);

    cart.addEventListener('click', deleteCourse);

    btnClear.addEventListener('click', () => {
        items = []
        clearHTML()
    })
}

function data(course) {
    const info = {
        id: course.querySelector('a').getAttribute('data-id'),
        title: course.querySelector('h4').textContent,
        image: course.querySelector('img').src,
        price: course.querySelector('.precio span').textContent,
        amount: 1
    }

    const band = items.some(course => course.id === info.id);

    if (band) {
        const array = items.map(course => {
            if (course.id === info.id) {
                course.amount++;
                return course;
            } else {
                return course;
            }
        })
        items = [...array];
    } else {
        items = [...items, info];
    }

    addCarts();
}

function addCarts() {
    clearHTML();
    items.forEach(course => {
        const { image, title, price, amount, id } = course;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>    
                <img src="${image}" width="150">
            </td>
            <td>${title}</td>
            <td>${price}</td>
            <td>${amount}</td>
            <td><a href="#" class="borrar-curso" data-id="${id}"> X </a> </td>

        `;

        containerCart.appendChild(row)
    })
}

function deleteCourse(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar-curso')) {
        const courseId = e.target.getAttribute('data-id');

        items = items.filter(course => course.id !== courseId);

        addCarts();

    }
}

function clearHTML() {
    while (containerCart.firstChild) {
        containerCart.removeChild(containerCart.firstChild)
    }
}