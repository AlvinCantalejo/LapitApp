category_select = document.querySelector('#category'),
 type_select = document.querySelector('#type');
   var category = {
         'Products': ['Clothing', 'Foods', 'Accessories','Living', 'Others',],
         'Services': ['Computer Repair', 'Key Duplicate', 'Shoe Repair', 'Payong Repair', 'Hair cut and Treatment', 'Others']
       };
   setOptions(category_select, Object.keys(category));
   setOptions(type_select, category[category_select.value]);
   category_select.addEventListener('change', function() {
   setOptions(type_select, category[category_select.value]);
   });
     
   function setOptions(dropDown, options) {
     // clear out any existing values
     dropDown.innerHTML = '';
     // insert the new options into the drop-down
     options.forEach(function(value) {
       dropDown.innerHTML += '<option name="' + value + '">' + value + '</option>';
       });
     }

     auth.onAuthStateChanged(function(user) {
        if (user){
            console.log(user);
            db.collection('users').doc(user.uid).set({
              fullname: user.displayName
            });
        }
        else {
            window.location.href="/index.html";
        }
      });

const form = document.querySelector('#create-store-form');
    var deliveryoption = "";
        if(document.getElementById("meetup").checked)
            deliveryoption += "'Meetup',";
        if(document.getElementById("pickup").checked)
            deliveryoption += "'Pickup',";
        if(document.getElementById("delivery").checked)
            deliveryoption += "'Delivery',";
    var paymentoption = "";
        if(document.getElementById("cashondelivery").checked)
            paymentoption += "'Cash on Delivery',";
        if(document.getElementById("gcash").checked)
            paymentoption += "'GCash',";
        if(document.getElementById("paymaya").checked)
            paymentoption += "'Paymaya',";


//saving store
form.addEventListener('submit', (e) =>{

    const form = document.querySelector('#create-store-form');
    var deliveryoption = "";
        if(document.getElementById("meetup").checked)
            deliveryoption += "'Meetup',";
        if(document.getElementById("pickup").checked)
            deliveryoption += "'Pickup',";
        if(document.getElementById("delivery").checked)
            deliveryoption += "'Delivery',";
    var paymentoption = "";
        if(document.getElementById("cashondelivery").checked)
            paymentoption += "'Cash on Delivery',";
        if(document.getElementById("gcash").checked)
            paymentoption += "'GCash',";
        if(document.getElementById("paymaya").checked)
            paymentoption += "'Paymaya',";

    var user = firebase.auth().currentUser;
    e.preventDefault();
    db.collection('stores').add({
        uid: user.uid,
        name: form.name.value,
        location: form.location.value,
        storeHours: form.hours.value,
        category: form.category.value,
        type: form.type.value,
        description: form.description.value,
        deliveryOption: deliveryoption,
        paymentOption: paymentoption
    }).then(() => {
        form.reset();
        alert("Store created successfully!");
        window.location.href="/homePageWithStore.html";
    }).catch(error => {
        alert(error);
        console.log(error);
    });
})
const logout = document.querySelector('#logout');
        logout.addEventListener('click', (e) => {
        e.preventDefault();
        auth.signOut().then(() => {
          window.location.href="/index.html";
          console.log('user signed out');
        })
        });