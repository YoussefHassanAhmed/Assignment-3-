var bookmarkNameInput = document.getElementById("bookmarkName");
var bookmarkURLInput = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn");
var tBody = document.getElementById("tBody");
var bookmarkcontaier = [];


if (localStorage.getItem("bookmarkList") != null) {

    bookmarcontaier = JSON.parse(localStorage.getItem("bookmarkList"));
    display(bookmarkcontaier)

} else {
    bookmarkcontaier = [];
}


submitBtn.addEventListener("click", function (eventInfo) {
if (vaild(bookmarkNameInput.value) && vaildmail(bookmarkURLInput.value)) {
    var submit = {
        bookmarkName: bookmarkNameInput.value,
        bookmarkURL: bookmarkURLInput.value
    }
    bookmarkcontaier.push(submit);
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarkcontaier));
    bookmarkNameInput.value = "";
    bookmarkURLInput.value = "";
    display(bookmarkcontaier);
}else{
    alert("bookmark Name or bookmark URL invalied");
}
    
})

function display(arr) {
    var box = ``;
    for (var i = 0; i < arr.length; i++) {
        var index = i + 1;
        box += `
        <tr>
        <td>${index}</td>
        <td>${arr[i].bookmarkName}</td>
        <td><button onclick="visititem(${i})" class="btn btn-visit"><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
        <td><button onclick="deletebookmark(${i});" id="deleteBtns" class="btn btn-delete"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
    </tr> 
        `
        
    }
    tBody.innerHTML = box
}


function deletebookmark(bookmarkIndex) {
    bookmarkcontaier.splice(bookmarkIndex, 1);
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarkcontaier));
    display(bookmarkcontaier);
}






function visititem(index) {
    window.open(bookmarkcontaier[index].bookmarkURL);
}

function vaild(name) {
    var nameregex = /^\w{3,}(\s+\w+)*$/;
    if (nameregex.test(name)) {
        bookmarkNameInput.classList.replace("is-invalid", "is-valid");
        return true;
    } else {
        bookmarkNameInput.classList.add("is-invalid");
        return false;
    }
}

function vaildmail(url) {
    var urlregex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
    if (urlregex.test(url)) {
        bookmarkURLInput.classList.replace("is-invalid", "is-valid");
        return true;
    } else {
        bookmarkURLInput.classList.add("is-invalid");
        return false;
    }
}


