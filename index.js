import { menuArray } from "./data.js"

const appComposeOrder = 1
const appEnterCardDetails = 2
let appState = appComposeOrder

const orderItems = new Array(menuArray.length).fill(0)

document.addEventListener('click', e => {
    if (e.target.className === 'dish-add-btn') {
        handleDishAddButtonClick(e)
    } else if (e.target.className === 'order-item-remove-btn') {
        handleDishRemoveButtonClick(e)
    } else if (e.target.className === 'complete-order-btn') {
        handleCompleteOrderButtonClick()
    }
})

document.getElementById('card-details-form').addEventListener('submit', e => {
    const formData = new FormData(e.target)
    appState = appComposeOrder
    e.target.classList.add('hidden')
    document.getElementById('order').classList.add('hidden')
    document.getElementById('complete-order-btn-container').classList.add('hidden')
    const thanks = document.getElementById('thanks')
    thanks.textContent = `Thanks, ${formData.get('name')}! Your order is on its way!`
    thanks.classList.remove('hidden')
    e.preventDefault()

    orderItems.fill(0)
})

function handleDishAddButtonClick(e) {
    if (appState === appComposeOrder) {
        orderItems[e.target.dataset.menuItem]++
        renderOrder()
    }
}

function handleDishRemoveButtonClick(e) {
    if (appState === appComposeOrder) {
        orderItems[e.target.dataset.menuItem]--
        renderOrder()
    }
}

function handleCompleteOrderButtonClick() {
    if (appState === appComposeOrder) {
        const cardDetailsForm = document.getElementById('card-details-form')
        cardDetailsForm.classList.remove('hidden')
        appState = appEnterCardDetails
    }
}

function renderOrder() {
    const order = document.getElementById('order')
    const completeOrderBtnContainer = document.getElementById('complete-order-btn-container')
    
    order.classList.remove('hidden')
    completeOrderBtnContainer.classList.remove('hidden')
    document.getElementById('thanks').classList.add('hidden')

    if (!orderItems.some(x => x)) {
        order.classList.add('hidden')
        completeOrderBtnContainer.classList.add('hidden')
        return
    }
    let orderHtml = `<h2 class="order-title">Your order</h2>`
    let totalPrice = 0
    orderItems.forEach((orderItem, itemIndex) => {
        if (orderItem) {
            const cost = orderItem * menuArray[itemIndex].price
            orderHtml += `
            <div class="order-item">
                <h2 class="order-item-name">${menuArray[itemIndex].name}</h2>
                <button class="order-item-remove-btn" data-menu-item="${itemIndex}">remove</button>
                <h3 class="order-item-price">$${cost}</h3>
            </div>`
            totalPrice += cost
        }
    })
    orderHtml += `
        <div class="total-price-order">
            <h2 class="total-price-title">Total price:</h2>
            <h3 class="total-price-value">$${totalPrice}</h3>
        </div>`
    order.innerHTML = orderHtml
    order.classList.remove('hidden')
    completeOrderBtnContainer.classList.remove('hidden')
}

function renderMenu() {
    const restaurantMenu = document.getElementById('restaurant-menu')
    let menuHTML = ``
    menuArray.forEach((menuItem, index) => {
        menuHTML += `
            <div class="restaurant-menu-item">
                <img src="${menuItem.emoji}" class="dish-img"/>
                <div class="dish-info">
                    <h2 class="dish-name">${menuItem.name}</h2>
                    <p class="dish-ingredients">${menuItem.ingredients.join(', ')}</p>
                    <h3 class="dish-price">$${menuItem.price}</h3>
                </div>
                <button class="dish-add-btn" data-menu-item="${index}">+</button>
            </div>
        `
    })
    restaurantMenu.innerHTML = menuHTML
}

renderMenu()
renderOrder()