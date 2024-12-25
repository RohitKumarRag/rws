/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    toggle.addEventListener('click', () => {
        // Add show-menu class to nav menu
        nav.classList.toggle('show-menu')

        // Add show-icon to show and hide the menu icon
        toggle.classList.toggle('show-icon')
    })
}

showMenu('nav-toggle', 'nav-menu')


// Dialog Or Login Register

const loginBtn = document.getElementById('loginBtn');
const loginToRegBtn = document.getElementById('loginToRegBtn');

const loginDialog = document.querySelector('.loginDialog');
const dialogCloseBtn = document.querySelector('.dialogCloseBtn');
const userInfoDialogCloseBtn = document.querySelector('.userInfoDialogCloseBtn');
function showDialog() {
    loginDialog.showModal();
}
function closedialog() {
    loginDialog.close();
}
loginToRegBtn.addEventListener('click', () => {
    loginDialog.close();
    regDailog.showModal();
})

userInfoDialogCloseBtn.addEventListener('click', () => {
    userInfoDialog.close();
})


// Register Dialog Box
const regBtn = document.getElementById('regBtn');
const regToLoginBtn = document.getElementById('regToLoginBtn');
const regDailog = document.querySelector('.regDialog');
const regDialogCloseBtn = document.querySelector('.regDialogCloseBtn');

function showRegDialog() {
    regDailog.showModal();
}
function closeregDialog() {
    regDailog.close();
}
regToLoginBtn.addEventListener('click', () => {
    regDailog.close();
    loginDialog.showModal();
});


const userInfoDialog = document.getElementById('userInfoDialog');
const userInfo = document.getElementById('userInfo');

userInfo.onclick = () => {
    userInfoDialog.showModal();

}

const gotTOResetPassword = document.getElementById("gotTOResetPassword");
const resetPasswordDialog = document.getElementById("resetPasswordDialog");
gotTOResetPassword.onclick = () => {
    const loginDialog = document.querySelector('.loginDialog');
    resetPasswordDialog.showModal();
    loginDialog.close();


}
const resetPasswordDialogCloseBtn = document.querySelector(".resetPasswordDialogCloseBtn");
resetPasswordDialogCloseBtn.onclick = () => {
    const loginDialog = document.querySelector('.loginDialog');
    loginDialog.showModal();
    resetPasswordDialog.close();

}

function goToRegister() {
    const regDialog = document.querySelector(".regDialog");
    regDialog.showModal();
}

// Get the modal and the modal image
var modal = document.getElementById("myModal");
var modalImg = document.getElementById("imgPreview");
var images = document.querySelector(".previewImage");
var originalWidth, originalHeight;
images.onclick = function () {
    modal.style.display = "block";
    modalImg.src = this.src;

    // Store the original dimensions
    originalWidth = this.naturalWidth;
    originalHeight = this.naturalHeight;

    // Set the modal image to 50% width or height (adjust as desired)
    modalImg.style.width = "60%";
    modalImg.style.height = "auto";
}
var span = document.getElementsByClassName("close")[0];
span.onclick = function () {
    modal.style.display = "none";
    // Reset the image size back to original
    modalImg.style.width = originalWidth + "px";
    modalImg.style.height = originalHeight + "px";
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        // Reset the image size back to original
        modalImg.style.width = originalWidth + "px";
        modalImg.style.height = originalHeight + "px";
    }
}