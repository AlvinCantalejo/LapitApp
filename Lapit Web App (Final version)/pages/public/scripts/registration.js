//Login With Facebook
function signinWithFacebook(){
  var provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope('user_birthday, email');
  firebase.auth().useDeviceLanguage();
  firebase.auth().signInWithPopup(provider).then(function(cred){
    var token = cred.credential.accessToken; 
    document.location.href ="/homePage.html";
  })
  .catch(error => {
      alert(error);
      console.log(error);
  });
}
// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;
  const fullname = signupForm['signup-fullname'].value;

  // sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    return db.collection('users').doc(cred.user.uid).set({
      fullname: fullname,
      storeOwner: false
    });
  })
  .then(() => {
    // close the signup modal & reset form
    console.log('user signed in');
    signupForm.reset();
    document.location.href = "/homePage.html";
    }).catch(error => {
      alert(error);
    });
});

function openTC() {
  document.getElementById("modal_bg").style.display = "block";
}

function closeTC() {
  document.getElementById("modal_bg").style.display = "none";
}