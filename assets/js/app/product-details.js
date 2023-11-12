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

   
    } else {
        console.log('Could not find id.');

             //vimeoIframe.src =extractedProduct.link_preview+"?badge=0&amp;autopause=0&amp;quality_selector=1&amp;player_id=0&amp;app_id=58479" 
            // Creating iframe element 
            // var el = document.createElement("iframe");
            // el.src ="https://vimeo.com/883720173?"+"badge=0&amp;autopause=0&amp;quality_selector=1&amp;player_id=0&amp;app_id=58479"  
            // // Setting the values for the attributes 
            // //el.srcdoc = `<h1>.Iframe Element.</h1> <p> Hello Geek! <br> How are you? </p>`;
            // el.style = "position:absolute;top:0;left:0;width:100%;height:100%;"; 
            // el.allow ="autoplay; fullscreen; picture-in-picture";
            // el.frameborder="0";
            // el.width = "400px"; 
            // el.height = "200px"; 
        
            // Adding the created iframe to div as 
            // a child element 
            //document.getElementById("add_iframe_here").appendChild(el); 




        const queryString = window.location.search;
        console.log(queryString);
        const urlParams = new URLSearchParams(queryString);
        const param_value = urlParams.get('productid')
        console.log("GET DATA FROM HTTP: "+param_value);

}
};
