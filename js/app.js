const guidRegex = /(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}/g

function hideModal() {
    document.getElementById("results").classList.remove("is-active")
}

function showModal() {
    document.getElementById("results").classList.add("is-active")
}

function copyToClipboard() {
    /* Get the text field */
    var copyText = document.getElementById("listOfGuids");

    /* Select the text field */
    copyText.select();

    /* Copy the text inside the text field */
    document.execCommand("copy");

    /* Alert the copied text */
    alert("Copied the text: " + copyText.value);
}

function findGuids() {
    let text = document.getElementById("textWithGuids").value;
    var validText = validateText(text);

    if (!validText) {
        return;
    }

    let isUnique = document.getElementById("isUnique").checked;
    let isNotUnique = document.getElementById("isNotUnique").checked;

    var validIsUnique = validateIsUnique(isUnique, isNotUnique);

    if (!validIsUnique) {
        return;
    }

    let guidsFound = findGuidsInText(text, isUnique);
    if (!guidsFound) {
        return;
    }
    showModal();
}

function findGuidsInText(text, isUnique) {
    let foundGuids = text.match(guidRegex);

    if (foundGuids === null) {
        document.getElementById("textWithGuids").classList.add("is-danger");
        document.getElementById("noGuidsFound").classList.remove("is-hidden");
        return false;
    } else {
        document.getElementById("textWithGuids").classList.remove("is-danger");
        document.getElementById("noGuidsFound").classList.add("is-hidden");
    }

    let returnedString = "";
    if (isUnique) {
        let unique = [...new Set(foundGuids)];
        unique.forEach(element => {
            returnedString = returnedString += `${element} `;
        });
    } else {
        foundGuids.forEach(element => {
            returnedString = returnedString += `${element} `;
        });
    }
    document.getElementById("listOfGuids").innerText = returnedString;
    return true;
}

function validateText(text) {
    if (text === "") {
        document.getElementById("noGuidsFound").classList.add("is-hidden");
        document.getElementById("textWithGuids").classList.add("is-danger");
        document.getElementById("textError").classList.remove("is-hidden");
        return false;
    } else {
        document.getElementById("textWithGuids").classList.remove("is-danger");
        document.getElementById("textError").classList.add("is-hidden");
        return true;
    }
}


function validateIsUnique(isUnique, isNotUnique) {
    if (isUnique === false && isNotUnique === false) {
        document.getElementById("textUnique").classList.remove("is-hidden");
        return false;
    } else {
        document.getElementById("textUnique").classList.add("is-hidden");
        return true;
    }
}