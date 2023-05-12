//Rx: Only for login customer, auto populate.
var storedName = localStorage.getItem("session_name");
var storedEmail = localStorage.getItem("session_email");
var storedContactNumber = localStorage.getItem("session_contactNumber");

if (storedName && storedEmail && storedContactNumber) {

    document.getElementById("name").value = storedName;
    document.getElementById("email").value = storedEmail;
    document.getElementById("tel").value = storedContactNumber;

    disableFormFields();
}

function disableFormFields() {
    const fieldsToDisable = ["name", "email"];

    fieldsToDisable.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.disabled = true;
            field.style.backgroundColor = "#cad6d8";
            field.style.border = "1px solid gray";
        }
    });
}

function submitContact(event) {

    //Rx: prevent the default form submit even the invalid still there... (*sys only recognize the required fields, than ignore js)
    //or just x want put the type="submit", settle.
    event.preventDefault();

    var form = document.getElementById("form1");
    var isValid = true;

    clearInvalidMsg();

    for (var i = 0; i < form.elements.length; i++) {
        var element = form.elements[i];
    
            if (element.name === 'name' && element.hasAttribute('required') && !element.value.trim()) {
                isValid = false;
                showErrMsg(element, "Please enter your name.", "name_invalid");

            } else if (element.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(element.value.trim())) {
                isValid = false;
                showErrMsg(element, "Please enter a valid email address.", "email_invalid");

            } else if (element.type === 'tel' && !/^\+?60[1-9]\d{8,9}$/.test(element.value.trim())) {
                isValid = false;
                showErrMsg(element, "Please enter a valid contact number.", "tel_invalid");

            } else if (element.tagName.toLowerCase() === 'textarea' && !element.value.trim()) {
                isValid = false;
                showErrMsg(element, "Please enter some messages.", "msg_invalid");

            } else if (element.tagName.toLowerCase() === 'select' && element.hasAttribute('required') && element.value === "Please Select") {
                isValid = false;
                showErrMsg(element, "Please select Yes or No.", "selection_invalid");
            }                
    }

    if (isValid) {
        var contact_form = {
            email: document.getElementById('email').value,
            name: document.getElementById('name').value,
            tel: document.getElementById('tel').value,
            message: document.getElementById('message').value,
            order: document.getElementById('order').value,
            time: new Date().toLocaleString(),
            status: "Pending"
        };

        //Rx: append with older data.
        var existingForms = JSON.parse(localStorage.getItem('contact_forms')) || [];
        existingForms.push(contact_form);
        localStorage.setItem('contact_forms', JSON.stringify(existingForms));


        alert('Your Form successfully submitted to our database, Thanks.');
        location.reload();
    } 
}

    function showErrMsg(element, msg, invalid_id) {
        var errorContainer = document.getElementById(invalid_id);
        errorContainer.textContent = msg;
        element.classList.add('error');
        element.style.border = "1px solid red";
        
    }

    
function clearInvalidMsg() {

    //Rx: clear the div red text.
    var errorContainers = document.querySelectorAll('.invalidMsg_Class');
    errorContainers.forEach(function (container) {
        container.textContent = '';
    });

    //Rx: remove the red color border.
    var errorFields = document.querySelectorAll('.error');
    errorFields.forEach(function (field) {
        field.classList.remove('error');
        field.style.border = ""; 
    });

}