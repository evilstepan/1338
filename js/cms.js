
const API_URL = 'https://power-longing-backbone.glitch.me/api/goods';

async function fetchGoods() {
    try {
        const response = await fetch(API_URL); 
        if (!response.ok) throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`);
        
        const goods = await response.json();
        populateTable(goods);
    } catch (error) {
        console.error('Ошибка при получении данных:', error.message);
        displayErrorMessages([error.message]); 
    }
}


function populateTable(goods) {
    const tableBody = document.querySelector('.table-section tbody');
    tableBody.innerHTML = ''; 
    goods.forEach(good => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${good.id}</td>
            <td>${good.name}</td>
            <td>${good.category}</td>
            <td>шт</td>
            <td>1</td>
            <td>$${good.price}</td>
            <td>${good.price}</td>
            <td><img src="carbon_no-image.svg" alt="" width="20px" height="20px"></td>
            <td><img src="akar-icons_edit.svg" alt="" width="20px" height="20px"></td>
            <td><img src="remove.svg" alt="" width="20px" height="20px"></td>
        `;
        tableBody.appendChild(row);
    });
}
document.querySelector('.add-product').addEventListener('click', async () => {
    const newProductData = {
        name: 'Новый товар', 
        category: 'Новая категория',
        price: 150,
    };

    await addProduct(newProductData);
});


async function addProduct(productData) {
    try {
        const response = await fetch(API_URL, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });

        if (response.ok) {
            const newProduct = await response.json();
            addRowToTable(newProduct);
            closeModal(); 
        } else {
            const errorData = await response.json();
            displayErrorMessages(errorData.errors || ['Что-то пошло не так...']);
        }
    } catch (error) {
        console.error('Ошибка при добавлении товара:', error.message);
        displayErrorMessages([error.message]);
    }
}


function addRowToTable(product) {
    const tableBody = document.querySelector('.table-section tbody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td>шт</td>
        <td>1</td>
        <td>$${product.price}</td>
        <td>${product.price}</td>
        <td><img src="carbon_no-image.svg" alt="" width="20px" height="20px"></td>
        <td><img src="akar-icons_edit.svg" alt="" width="20px" height="20px"></td>
        <td><img src="remove.svg" alt="" width="20px" height="20px"></td>
    `;
    tableBody.appendChild(row);
}


function displayErrorMessages(errors) {
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-messages';
    errorContainer.innerHTML = errors.map(error => `<p>${error}</p>`).join('');
    

    const existingErrors = document.querySelector('.error-messages');
    if (existingErrors) existingErrors.remove();

    document.body.prepend(errorContainer); 
}

function closeModal() {
}

document.addEventListener('DOMContentLoaded', fetchGoods);
