
 function openChat() {
  document.getElementById("account-popup").style.display = "block";
}

function closeForm() {
  document.getElementById("account-popup").style.display = "none";
}

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}




//DROPDOWN
 category_select = document.querySelector('#category'),
 type_select = document.querySelector('#type');
   var category = {
          'All': ['All'],
         'Products': ['Foods','Clothing', 'Accessories','Living', 'Others'],
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


//DISPLAY LOCATION PERMISSION
    navigator.geolocation.getCurrentPosition(function(position) {
      //Get current location of the user
    });

//Displaying Stores according to category and type
const goButton = document.querySelector("#listByCategory");

goButton.addEventListener('click', (e) => {
  e.preventDefault();
  var selectedCategory = document.querySelector("#category").value;
  var selectedType = document.querySelector("#type").value;
  console.log(selectedType, selectedCategory);
  //getting data from firestore
    db.collection('stores').get().then(snapshot =>{
      setupStores(snapshot.docs); 
    });const storeList = document.querySelector('#listScroll');
    const setupStores = (data) => {
      if(data.length){
        let html ='';
        data.forEach(doc =>{
          const store = doc.data();
          const template =`
                <button type="button" class="collapsible">
                  <p class="storeName"><strong>${store.name}</strong><br></p>
                  <p class="storeDesc">Location: <strong>${store.location}</strong><br>
                  <em>${store.description}</em><br>
                  
                  <a href="/storeItemsPage.html" class="view"> View Store ></a>
                  </p>
                </button>
                <div class="contentCollapsible">
                  <p>
                  Store Hours: ${store.storeHours}<br>
                  </p>
                </div>
          `;if(selectedCategory == "All" && selectedType == "All")
            html += template;
          else if(selectedCategory == store.category && selectedType == store.type)
            html += template;
        });
        storeList.innerHTML = html;
      }
    }
        var coll = document.getElementsByClassName("collapsible");
      var i;
      
      for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
          this.classList.toggle("active");
          var content = this.nextElementSibling;
          if (content.style.display === "block") {
            content.style.display = "none";
          } else {
            content.style.display = "block";
          }
        });
      }
})
//AUTHENTICATION LISTENER
    auth.onAuthStateChanged(function(user) {
        if (user){
            setupUI(user);
        }
        else {
            setupUI();
            window.location.href="/index.html";
        }
      });
  //SHOW ACCOUNT DETAILS
  const accountInfo = document.querySelector('.accountInfo');
  const setupUI = (user) => {
    if (user) {
      // account info
      db.collection('users').doc(user.uid).get().then(doc => {
        const html = `
          <img  src="${user.photoURL}" class="imgProfile" type="file" alt="src="Profile Pic"><br>
          <div>Logged in as <strong>${user.email}</strong></div>
        `;
        accountInfo.innerHTML = html;
      })
        
    } else {
      // clear account info
      accountInfo.innerHTML = "";
    }
  };
    
        // logout
        const logout = document.querySelector('#logout');
        logout.addEventListener('click', (e) => {
        e.preventDefault();
        auth.signOut().then(() => {
          window.location.href="/index.html";
          console.log('user signed out');
        })
        });