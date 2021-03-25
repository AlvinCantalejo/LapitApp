
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


// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    // close the signup modal & reset form
    loginForm.reset();
    document.location.href ="/homePage.html";
  })
  .catch(error => {
      alert(error);
  });

});
