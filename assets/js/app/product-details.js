const url_products ='https://script.google.com/macros/s/AKfycbyh4-pVuUIwEIP1EeS2u00TXcEW8Bp_Vw2-GZ6h92UIp-FHaT9Wm0c7T_NqklpGATm8/exec';
const products= [];
const url_version ="https://script.google.com/macros/s/AKfycbz70KCClkMxIwfMWYlzcZ8BqVgzQtWu03Xa-EhmB5R91OeRulnFudVrl7O6_oTNi9hj/exec";




 window.addEventListener('DOMContentLoaded', getProductData);

// function getInit() {
//   //initPayPalButton();
//   getProductData();

// };


function getProductData() {
    
    console.log("HOLA ");

     const extractedProduct = JSON.parse(localStorage.getItem('active_product'));

   if (extractedProduct) {
       console.log('Got the id - ' + extractedProduct.id);

        window.location = 'courses-details.html?productid='+extractedProduct.id;
    } else {
        console.log('Could not find id.');

        const queryString = window.location.search;
        console.log(queryString);
        const urlParams = new URLSearchParams(queryString);
        const param_value = urlParams.get('productid')
        console.log("GET DATA FROM HTTP: "+param_value);

}

