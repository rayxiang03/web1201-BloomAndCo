//RX: Validate if the customer aldy login, it redirect to profile.html
let session = localStorage.getItem('session_name') ? localStorage.getItem('session_name') : 'unknown'
if (session != 'unknown') {
    window.location.href = "profile.html";
}


function login() {
    let email, password;
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;

    let customer_records = new Array();
    customer_records = JSON.parse(localStorage.getItem("customers")) ? JSON.parse(localStorage.getItem("customers")) : []

    if (customer_records.some((v) => { return v.email == email && v.password == password })) {
        alert("Login Successfully!");
        let cus_session = customer_records.filter((v) => { return v.email == email && v.password == password })[0]

        localStorage.setItem('session_name', cus_session.fullName);
        localStorage.setItem('session_email', cus_session.email);
        localStorage.setItem('session_dob', cus_session.dob);
        localStorage.setItem('session_contactNumber', cus_session.contactNumber);
        localStorage.setItem('session_address', cus_session.address);
        localStorage.setItem('session_gender', cus_session.gender);

        window.location.href = "profile.html"
    } else {
        alert('Email or password incorrect, please try again!');
    }
}