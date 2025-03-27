// Start togglePassword icon change JS
var togglePassword = document.querySelector('.togglePassword');
console.log(togglePassword)
var  password = document.querySelector('.id_password');
if(togglePassword != null){
    togglePassword.addEventListener('click', function (e) {
        console.log(this);
        // toggle the type attribute
        var type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        // toggle the eye slash icon
        this.classList.toggle('hide-icon');
    });
};


