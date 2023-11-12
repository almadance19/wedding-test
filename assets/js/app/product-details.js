const url_products ='https://script.google.com/macros/s/AKfycbyh4-pVuUIwEIP1EeS2u00TXcEW8Bp_Vw2-GZ6h92UIp-FHaT9Wm0c7T_NqklpGATm8/exec';
const products= [];
const listElement = document.getElementById('add-products-row');
const postTemplate = document.getElementById('single-post');
const url_version ="https://script.google.com/macros/s/AKfycbz70KCClkMxIwfMWYlzcZ8BqVgzQtWu03Xa-EhmB5R91OeRulnFudVrl7O6_oTNi9hj/exec";
let old_db_version; 
///console.log(old_db);
//let db = openRequest.result;
//db.close();


window.addEventListener('DOMContentLoaded', getInit);

function getInit() {
  //initPayPalButton();
  getProductData();

};


function getProductData() {
    const extractedProduct = JSON.parse(localStorage.getItem('active_product'));
if (extractedProduct) {
   console.log('Got the id - ' + extractedProduct.id);

   window.location = 'courses-details.html?productid='+extractedProduct.id;
 } else {
   console.log('Could not find id.');
 }

}


// Check if Product in DB
//Take Data to Localstorage

