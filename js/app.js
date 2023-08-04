const cart = document.querySelector('#carrito');
const listCourse = document.querySelector('#lista-cursos');
const containerCart = document.querySelector('#lista-carrito tbody');
const btnClear = document.querySelector('#vaciar-carrito');

//Array del carrito
let items = [];

//Cargando eventos
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
    //Creando obj con toda la información del curso
    const info = {
        id: course.querySelector('a').getAttribute('data-id'),
        title: course.querySelector('h4').textContent,
        image: course.querySelector('img').src,
        price: course.querySelector('.precio span').textContent,
        amount: 1
    }


    const band = items.some(course => course.id === info.id);

    //Validación para los cursos con el mismo ID
    if (band) {
        const array = items.map(course => {
            if (course.id === info.id) {
                course.amount++;
                return course;
            } else {
                return course;
            }
        })
        //Copiando el nuevo array con el dato de amount modificado en el array de cursos
        items = [...array];
    } else {
        //Agrega directamenmte el objeto info al array de cursos
        items = [...items, info];
    }

    addCarts();
}

function addCarts() {
    clearHTML();
    //Iterando y generando codigo html por cada uno de los obj en el array items
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

        //Elimina el obj seleccionado y vuelve a llamar a la función addCarts() para actualizar el carrito en el HTML
        items = items.filter(course => course.id !== courseId);

        addCarts();

    }
}

function clearHTML() {
    //ciclo que se encarga de borrar la lista de cursos del carrito en el HTML
    while (containerCart.firstChild) {
        containerCart.removeChild(containerCart.firstChild)
    }
}