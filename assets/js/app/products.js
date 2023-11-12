
const url_products ='https://script.google.com/macros/s/AKfycbz2SNcOPLEoOu_s4Fuj15t13G1rWKvhfoN5Pj5gM3doqLl1QNF-xn5kHf1rDaWdQ-3s/exec';
const products= [];
const listElement = document.getElementById('add-products-row');
const postTemplate = document.getElementById('single-post');
const url_version ="https://script.google.com/macros/s/AKfycbz70KCClkMxIwfMWYlzcZ8BqVgzQtWu03Xa-EhmB5R91OeRulnFudVrl7O6_oTNi9hj/exec";
let old_db_version; 
///console.log(old_db);
//let db = openRequest.result;
//db.close();



// call database version

const xhr_version = new XMLHttpRequest();
xhr_version.open('GET', url_version);
xhr_version.responseType = 'json';
xhr_version.onload = function() {
    
    const dbVersion = xhr_version.response.posts;
    console.log("Version from DB: "+dbVersion)

    // OLD DB 

    // TEST IF USING NEWER VERSION
    let db;
    const openRequest = indexedDB.open('myDatabase', dbVersion);
    
    // Manage Downgrade of DB when Products deleted
      openRequest.addEventListener('error', (event) => {
      console.log('Request error:', openRequest.error);
      // Call/Render Data from HTTP 
      call_http_old_db();

         // DELETE DB
          const DBDeleteRequest = indexedDB.deleteDatabase("myDatabase");
          DBDeleteRequest.onerror = (event) => {
          console.error("Error deleting database.");
          };
          DBDeleteRequest.onsuccess = (event) => {
          console.log("Database deleted successfully");

      console.log(event.result); // should be undefined
      };   });


    // IF NOT EXISTING CREATE AND POPULATE FROM URL 
    openRequest.onupgradeneeded = function(e) {
        // triggers if the client had no database
        // ...perform initialization...
        console.log('Database onupgradeneeded');

        db = e.target.result;
        
        console.log("old version: "+e.oldVersion);

        old_db_version=String(e.oldVersion);
        
        // Creates DB if not existing / Else Updates it
        if(!db.objectStoreNames.contains('myDatabaseStore')) {
            console.log("Create new version: "+e.newVersion);
            db.createObjectStore('myDatabaseStore', { keyPath: "id" , autoIncrement: true});
            // Call/Render Data from HTTP   
            call_product_http(db);
        
        } else { 
            // Call/Render Data from HTTP  
            call_product_http(db);
            ////  Save Data to DB
            
        }
    //return  String(e.oldVersion)
    };


    // IF EXISTING USE DB TO RENDER DATA 
    openRequest.onsuccess = function(e) {
        console.log('running onsuccess');
        var cursor = e.target.result;
        db = e.target.result;

        var transaction = db.transaction('myDatabaseStore', 'readonly');
        var objectStore = transaction.objectStore('myDatabaseStore');

        console.log(old_db_version);

        if (!old_db_version){
            objectStore.openCursor().onsuccess = function(event) {
                var cursor = event.target.result;
                if (cursor) {
                  products.push(cursor.value);
                  console.log('New value:', cursor.value);
    
                  const postEl = document.importNode(postTemplate.content, true);
                        postEl.querySelector(".name").textContent = cursor.value.name;
                        postEl.querySelector(".genre").textContent = cursor.value.genre;
                        postEl.querySelector(".title").textContent = cursor.value.title;
                        postEl.querySelector(".short_desc").textContent = cursor.value.short_desc;
                        postEl.querySelector(".time").textContent = cursor.value.time;
                        postEl.querySelector(".level").textContent = cursor.value.level;
                        postEl.querySelector(".sale-parice").textContent = cursor.value.sale_price;
                        postEl.querySelector(".old-parice").textContent = cursor.value.old_price;
                        postEl.querySelector('.course_image').src = "assets/images/courses/"+cursor.value.course_image+".webp";
                     
                        postEl.querySelector(".course_photo").setAttribute("onclick","contactPartner('"+cursor.value.id+"');");
                        postEl.querySelector(".check_course").setAttribute("onclick","contactPartner('"+cursor.value.id+"');");

                        
                        listElement.append(postEl);
    
                  cursor.continue();
                } else {
                  //logTimestamps(timestamps);
                  console.log('Finished iterating');
                  console.log(products);
                }
              };
        }
      };


}
xhr_version.send();


function contactPartner(a){
 console.log("GO TO PRODUCT DETAIL:"+a);
 console.log("GO TO PRODUCT DETAIL:"+products[1]);

 localStorage.clear();
 //localStorage.removeItem('active_product');
 localStorage.setItem('active_product', JSON.stringify(products[Number(a)-1]));
 

 const extractedProduct = JSON.parse(localStorage.getItem('active_product'));
 if (extractedProduct) {
    console.log('Got the id - ' + extractedProduct.id);

    window.location = 'courses-details.html?productid='+extractedProduct.id;
  } else {
    console.log('Could not find id.');
  }
}




// GET DATA FROM API
function call_product_http(db) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url_products);
    xhr.responseType = 'json';
    xhr.onload = function() {
    const listOfPosts = xhr.response.posts;
    console.log(listOfPosts)
    for (const post of listOfPosts) {
        const postEl = document.importNode(postTemplate.content, true);
                postEl.querySelector(".name").textContent = post[2];
                postEl.querySelector(".genre").textContent = post[9];
                postEl.querySelector(".title").textContent = post[1];
                postEl.querySelector(".short_desc").textContent = post[3];
                postEl.querySelector(".time").textContent = post[10];
                postEl.querySelector(".level").textContent = post[8];
                postEl.querySelector(".sale-parice").textContent = post[7];
                postEl.querySelector(".old-parice").textContent = post[12];
                postEl.querySelector('.course_image').src = "assets/images/courses/"+post[11]+".webp";
                postEl.querySelector(".course_photo").setAttribute("onclick","contactPartner('"+post[0]+"');");
                postEl.querySelector(".check_course").setAttribute("onclick","contactPartner('"+post[0]+"');");

       
            
        
                listElement.append(postEl);
                products.push(post);
    }
        const transaction  = db.transaction("myDatabaseStore", "readwrite");
            const objectStore = transaction .objectStore('myDatabaseStore');
            const objectStoreRequest = objectStore.clear();

            console.log(products)
            // Save Values to Database 
            for (const post of products) {
                
                const item = {
                    id:post[0],
                    title: post[1], 
                    author: post[2],
                    short_desc: post[3],
                    desc: post[4],
                    song: post[5],
                    link_preview: post[6],
                    sale_price: post[7],
                    level: post[8],
                    genre: post[9],
                    time: post[10],
                    course_image: post[11],
                    old_price: post[12],
                };

                const tx = db.transaction("myDatabaseStore", "readwrite");
                const store = tx.objectStore('myDatabaseStore');
                store.add(item);
                }
    };
    xhr.send();
}




function call_http_old_db(){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url_products);
    xhr.responseType = 'json';
    xhr.onload = function() {
    const listOfPosts = xhr.response.posts;
    console.log(listOfPosts)
    for (const post of listOfPosts) {
        const postEl = document.importNode(postTemplate.content, true);
                postEl.querySelector(".name").textContent = post[2];
                postEl.querySelector(".genre").textContent = post[9];
                postEl.querySelector(".title").textContent = post[1];
                postEl.querySelector(".short_desc").textContent = post[3];
                postEl.querySelector(".time").textContent = post[10];
                postEl.querySelector(".level").textContent = post[8];
                postEl.querySelector(".sale-parice").textContent = post[7];
                postEl.querySelector(".old-parice").textContent = post[12];
                postEl.querySelector('.course_image').src = "assets/images/courses/"+post[11]+".webp";
                postEl.querySelector(".course_photo").setAttribute("onclick","contactPartner('"+post[0]+"');");
                postEl.querySelector(".check_course").setAttribute("onclick","contactPartner('"+post[0]+"');");
                
                listElement.append(postEl);
                products.push(post);
        }
    };
    xhr.send();           
}