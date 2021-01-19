let addButton = document.querySelectorAll('.add-link');

let products = [
    {
        name : 'Human Resource Mangement',
        price : 30,
        tag : 'book1',
        incart : 0
    },
    {
        name : 'Strategic Human Resource Mangement',
        price : 20,
        tag : 'book2',
        incart : 0
    },
    {
        name : 'Time Manegement',
        price : 75,
        tag : 'book3',
        incart : 0
    },
    {
        name : 'The Leader In You',
        price : 10,
        tag : 'book4',
        incart : 0
    },
    {
        name : 'Tools For Success',
        price : 25,
        tag : 'book5',
        incart : 0
    },
    {
        name : 'Keep Sharp',
        price : 30,
        tag : 'book6',
        incart : 0
    },
    {
        name : 'How To Change Your Mind',
        price : 55,
        tag : 'book7',
        incart : 0
    }
]

for( let i = 0 ; i < addButton.length ; i++){
    addButton[i].addEventListener('click' , function(){
        cartNumbers(products[i]);
        cost(products[i]);
    })
}

function load(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}


function cartNumbers(product){
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if(productNumbers){
        localStorage.setItem('cartNumbers' , productNumbers + 1)
        document.querySelector('.cart span').textContent = productNumbers +  1
    }else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1
    }
    setItems(product);
}

function setItems(product){
    let cartItems = localStorage.getItem("productsInCart")
    cartItems = JSON.parse(cartItems);
    console.log(cartItems)
    
    if(cartItems != null ){

        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].incart += 1;
    }else{
        product.incart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function cost(product){
    let productCost = localStorage.getItem('totalCost');
    //console.log('product price' , product.price);
    if(productCost != null){
        productCost = parseInt(productCost);
        localStorage.setItem('totalCost', productCost + product.price);
    }else{
        localStorage.setItem('totalCost' , product.price);    
    }
    
}

function displayCart(){
    let cartItems = localStorage.getItem('productsInCart');
    let myCart = document.querySelector('.my-cart');
    cartItems = JSON.parse(cartItems);
    myCart.innerHTML = '';
    if(cartItems){
        Object.values(cartItems).map(item => {
            myCart.innerHTML += `
                <div class="my-cart">
                        <img src="./images/${item.tag}.jpg" class="cart-img">
                        <div class='cart-product-name '>${item.name}</div>
                    
                    <div class='cart-price'>${item.price}</div>
                    <div class="cart-quantity">
                        <span class="quantity-counter">${item.incart}</span>
                    </div>
                    <div class="cart-total">$ ${item.incart * item.price}</div>
                </div>
            `
        })
    }
}

load();
displayCart();