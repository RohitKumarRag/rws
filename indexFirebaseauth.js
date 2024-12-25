import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    setPersistence,
    browserLocalPersistence,
    onAuthStateChanged,
    signOut,
    sendPasswordResetEmail

} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

import {
    getFirestore,
    setDoc,
    getDoc,
    doc
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDCKE-hKPzoUT-gyiCBLSOdbnY8HIOXTlA",
    authDomain: "rohitwebstore.firebaseapp.com",
    databaseURL: "https://rohitwebstore-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "rohitwebstore",
    storageBucket: "rohitwebstore.appspot.com",
    messagingSenderId: "304950008568",
    appId: "1:304950008568:web:99ba29c204a4a6db67390d",
    measurementId: "G-Y4Q3Y0LN22"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();




function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function () {
        messageDiv.style.opacity = 0;
    }, 5000);
}

// Step 3: Set Auth Persistence to 'local' for permanent persistence
// const auth = getAuth();

setPersistence(auth, browserLocalPersistence)
    .then(() => {
        return signInWithEmailAndPassword(auth, email, password);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

    });




// const email = document.getElementById('regEmail').value;
// const password = document.getElementById('regPassword').value;


const signUp = document.getElementById('regSubmit');
signUp.addEventListener('click', (event) => {
    event.preventDefault();

    const loadingContainer = document.getElementById('loading-containerReg');
    loadingContainer.style.display = "block";
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const firstName = document.getElementById('regFirstName').value;
    const lastName = document.getElementById('regLastName').value;
    const displayEmail = document.getElementById('displayEmail');
    const displayFOrLName = document.getElementById('displayFOrLName');
    const userInfo = document.getElementById('userInfo');
    const menuBarBtns = document.getElementById('menuBarBtns');
    const regDailog = document.querySelector('.regDialog');

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            window.localStorage.setItem('loggedInUserId', user.uid);
            const userData = {
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password
            };
            showMessage('Account Created & Logged in Success, You can Close this Window', 'signUpMessage');
            loadingContainer.style.display = "none";
            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, userData)
                .then(() => {
                    displayEmail.textContent = 'Email: ' + userData.email;
                    displayFOrLName.textContent = 'Name: ' + userData.firstName + ' ' + userData.lastName;
                    menuBarBtns.style.display = "none";
                    userInfo.style.display = "flex";
                    loadingContainer.style.display = "none";
                    regDailog.close();
                    location.reload();
                })
                .catch((error) => {
                    console.error("error writing document", error);
                    const userInfo = document.getElementById('userInfo');
                    const menuBarBtns = document.getElementById('menuBarBtns');
                    menuBarBtns.style.display = "flex";
                    userInfo.style.display = "none";

                });
        })
        .catch((error) => {
            loadingContainer.style.display = "none";
            const errorCode = error.code;
            if (errorCode == 'auth/email-already-in-use') {
                showMessage('Email Address Already Exists!!', 'signUpMessage');
                loadingContainer.style.display = "none";
            }
            else {
                showMessage('Enter Valid Details or unable to create User', 'signUpMessage');
                loadingContainer.style.display = "none";
            }
        })


});


window.addEventListener('scroll', () => {

    const header = document.querySelector('.header');
    const userInfo = document.getElementById('userInfo');
    const lastScrollY = window.scrollY;

    if (lastScrollY < window.scrollY) {
        userInfo.classList.add('userInfo--hidden');
    } else {
        userInfo.classList.remove('userInfo--hidden');
    }

    lastScrollY = window.scrollY;

});



const signIn = document.getElementById('loginSubmit');
signIn.addEventListener('click', (event) => {
    event.preventDefault();

    const loadingContainer = document.getElementById('loading-container');
    loadingContainer.style.display = "block";

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const userInfo = document.getElementById('userInfo');
    const menuBarBtns = document.getElementById('menuBarBtns');
    const loginDialog = document.querySelector('.loginDialog');

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showMessage('login is successful', 'signInMessage');
            const user = userCredential.user;
            window.localStorage.setItem('loggedInUserId', user.uid);

            menuBarBtns.style.display = "none";
            userInfo.style.display = "flex";
            loadingContainer.style.display = "none";
            loginDialog.close();
            location.reload();


        })
        .catch((error) => {
            const errorCode = error.code;
            loadingContainer.style.display = "none";
            if (errorCode === 'auth/invalid-credential') {
                showMessage('Incorrect Email or Password', 'signInMessage');
                loadingContainer.style.display = "none";
            }
            else {
                showMessage('Account does not Exist', 'signInMessage');

                const userInfo = document.getElementById('userInfo');
                const menuBarBtns = document.getElementById('menuBarBtns');


                menuBarBtns.style.display = "flex";
                userInfo.style.display = "none";
                loadingContainer.style.display = "none";
            }
        })
})




onAuthStateChanged(auth, function (user) {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userInfo = document.getElementById('userInfo');
                    const menuBarBtns = document.getElementById('menuBarBtns');
                    menuBarBtns.style.display = "none";
                    userInfo.style.display = "flex";
                    const goToRegister = document.querySelector(".goToRegister");
                    goToRegister.style.display = "none";
                    const userData = docSnap.data();

                    const displayEmail = document.getElementById('displayEmail');
                    const displayFOrLName = document.getElementById('displayFOrLName');
                    displayEmail.textContent = 'Email: ' + userData.email;
                    displayFOrLName.textContent = 'Name: ' + userData.firstName + " " + userData.lastName;


                    // location.reload();

                }
                else {
                    console.log("no document found matching id");
                }
            })
            .catch((error) => {
                console.log("Error getting document");
            })
    }
    else {
        console.log("User Id not Found in Local storage");
    }


})

const logoutButton = document.getElementById('logoutBtn');
logoutButton.addEventListener('click', () => {
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
        .then(() => {
            const userInfo = document.getElementById('userInfo');
            const menuBarBtns = document.getElementById('menuBarBtns');
            menuBarBtns.style.display = "flex";
            userInfo.style.display = "none";
            const userInfoDialog = document.getElementById('userInfoDialog');
            userInfoDialog.close();
        })
        .catch((error) => {
            console.error('Error Signing out:', error);
        })
});

const resetPasswordBtn = document.getElementById("resetPasswordBtn");
resetPasswordBtn.onclick = (event) => {
    event.preventDefault();

    const loadingContainerReset = document.getElementById("containerReset");
    loadingContainerReset.style.display = "block";
    const resetPasswordEmail = document.getElementById("resetPasswordEmail").value;
    const resetPasswordEmailCheck = document.getElementById("resetPasswordEmail");
    const resetPasswordDialog = document.getElementById("resetPasswordDialog");


    if (resetPasswordEmailCheck.value == "") {
        loadingContainerReset.style.display = "none";
        showMessage("Please Enter Your Registered Email!", 'resetPasswordMessage');
    }
    else {
        loadingContainerReset.style.display = "block";
        sendPasswordResetEmail(auth, resetPasswordEmail)
            .then(() => {

                showMessage("Reset Password Email Sent..", 'resetPasswordMessage');
                loadingContainerReset.style.display = "none";

                setTimeout(() => {
                    resetPasswordDialog.close();
                }, 5000);

            })
            .catch((error) => {
                showMessage("Error Sending Reset Password Email!", 'resetPasswordMessage');
                loadingContainerReset.style.display = "none";
            });
    }


}