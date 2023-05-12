var products_DB = {
    "P001": {
        name: "Flamingo Lily",
        picture_url: "assets/images/products/prod1_flamingo.png",
        price: 89.90,
    },
    "P002": {
        name: "Oxalis Triangularis",
        picture_url: "assets/images/products/prod2_oxalis.png",
        price: 45,
    },
    "P003": {
        name: "Ficus Bonsai Plant",
        picture_url: "assets/images/products/prod3_ficus.png",
        price: 89,
    },
    "P004": {
        name: "Podocarpus Brevifolius",
        picture_url: "assets/images/products/prod4_podocarpus.png",
        price: 1688,
    },
    "P005": {
        name: "Money Tree",
        picture_url: "assets/images/products/prod5_moneyTree.png",
        price: 129.99,
    },
    "P006": {
        name: "Calamansi",
        picture_url: "assets/images/products/p2_calamansi.png",
        price: 88.80,
    },
    "P007": {
        name: "Serene Lily Bouquet",
        picture_url: "assets/images/products/prod7_sereneLily.png",
        price: 59.00,
    },
    "P008": {
        name: "Graduate Sunflower Bouquet",
        picture_url: "assets/images/products/prod8_bouquet.png",
        price: 218,
    },
    "P009": {
        name: "Monstera Deliciosa",
        picture_url: "assets/images/products/p1_monstera.png",
        price: 99,
    },
    "P010": {
        name: "Trio Set Pot",
        picture_url: "assets/images/products/prod9_triPot.png",
        price: 109,
    },
}

var session_email = localStorage.getItem("session_email");

function addToCart(productCode) {

    if (!localStorage.getItem("session_email")) {
        alert('You are required to Login to continue.');
        window.location.href = 'login.html';
    } else {
        var prod_qty = 1;

        localStorage.setItem(session_email + "_" + productCode, prod_qty);

        alert("You have added " + " " + products_DB[productCode].name + " to cart!");
    }
}


if (document.getElementById("cart_products") != null) {
    var cart = document.getElementById("cart_products");
    var i = 0;

    window.onload = function () {
        var total = 0, i = 0;

        var pid = ["P001", "P002", "P003", "P004", "P005", "P006", "P007", "P008", "P009", "P010"];

        for (var j = 0; j < pid.length; j++) {

            var prodID = pid[j];

            if (localStorage.getItem(localStorage.session_email + "_" + prodID) != null) {
                var row = cart.insertRow(i);
                var td1 = row.insertCell(0);
                var td2 = row.insertCell(1);
                var td3 = row.insertCell(2);
                var td4 = row.insertCell(3);
                var td5 = row.insertCell(4);

                td1.innerHTML = i + 1;
                td2.innerHTML = '<img src="' + products_DB[prodID].picture_url + '"style="max-width: 100px; max-height: 180px;">';
                td3.innerHTML = '<span id="pid">' + prodID + '</span> ' + products_DB[prodID].name;
                td4.innerHTML = 'RM ' + products_DB[prodID].price.toFixed(2);
                td5.innerHTML = '<button class="delete-button" onclick="deleteRow(\'' + prodID + '\')">X</button>';

                total += products_DB[prodID].price;

                i++;
            }
        }

        var sub_total = document.getElementById("sub_total"), totalItem = document.getElementById("total_items");
        sub_total.innerHTML = 'RM ' + total.toFixed(2);
        totalItem.innerHTML = i;

        if (total == '0.00') {
            var row = cart.insertRow(i);
            var td1 = row.insertCell(0);
            var td2 = row.insertCell(1);
            var td3 = row.insertCell(2);
            var td4 = row.insertCell(3);
            var td5 = row.insertCell(4);
            td1.innerHTML = 'No Products in Cart.';
        }
    }

}

//Rx: Delete single product in cart ya.
function deleteRow(prodID) {
    var productName = products_DB[prodID].name;

    localStorage.removeItem(localStorage.session_email + "_" + prodID);
    displayNotification('"' + productName + '" deleted successfully.');
    
}

function displayNotification(message) {
    var notificationElement = document.getElementById('notification');
    notificationElement.innerText = message;

    notificationElement.classList.remove('hidden');

    setTimeout(function () {
        notificationElement.classList.add('hidden');
        notificationElement.innerText = '';
        location.reload();
    }, 1100);
}