const url = "http://localhost:8080/admin/"

function deactivate (activateID, deactivateID) {
    document.getElementById(deactivateID).classList.remove('active')
    document.getElementById(activateID).classList.add('active')
}


const pills = document.querySelectorAll('.pill');
const pillsContent = document.querySelectorAll('.pillContent');
pills.forEach((clickedPill) => {
    clickedPill.addEventListener('click', async () => {
        pills.forEach((pill) => {
            pill.classList.remove('active');
        });
        clickedPill.classList.add('active');
        let tabId = clickedPill.getAttribute('id');
        await activePillContent(tabId);
    });
});

async function activePillContent(tabId) {
    pillsContent.forEach((clickedPillContent) => {
        clickedPillContent.classList.contains(tabId) ?
            clickedPillContent.classList.add('active') :
            clickedPillContent.classList.remove('active');
    })
}

const tabs = document.querySelectorAll('.taba');
const tabsContent = document.querySelectorAll('.tabaContent');
tabs.forEach((clickedTab) => {
    clickedTab.addEventListener('click', async () => {
        tabs.forEach((tab) => {
            tab.classList.remove('active');
        });
        clickedTab.classList.add('active');
        let tabaId = clickedTab.getAttribute('id');
        await activeTabContent(tabaId);
    });
});

async function activeTabContent(tabaId) {
    tabsContent.forEach((clickedTabContent) => {
        clickedTabContent.classList.contains(tabaId) ?
            clickedTabContent.classList.add('active') :
            clickedTabContent.classList.remove('active');
    })
}


async function getMyUser() {
    let res = await fetch('/auth');
    let resUser = await res.json();
    userNavbarDetails(resUser);
}

window.addEventListener('DOMContentLoaded', getMyUser);
window.addEventListener('DOMContentLoaded', loadUserTable);
getAdminPage();


function userNavbarDetails(resUser) {
    let userList = document.getElementById('myUserDetails');
    let roles = ''
    for (let role of resUser.roles) {
        roles += role.name + ' '
    }
    userList.insertAdjacentHTML('beforeend', `
        <b> ${resUser.username} </b> with roles: <a>${roles} </a>`);
}


async function getAdminPage() {
    let page = await fetch(url);
    if (page.ok) {
        let listAllUser = await page.json();
        loadTableData(listAllUser);
    } /*else {
        alert(`Error, ${page.status}`)
    }*/
}

function loadTableData(listAllUser) {
    let tableBody = document.getElementById('tbody');
    let dataHtml = '';
    for (let user of listAllUser) {
        let roles = [];
        for (let role of user.roles) {
            roles.push(" " + role.name)
        }
        dataHtml +=
            `<tr>
    <td>${user.id}</td>
    <td>${user.username}</td>
    <td>${user.yearOfBirth}</td>
    <td>${roles}</td>
    <td>
        <button class="btn btn-primary btn-md" data-bs-toogle="modal"
        data-bs-target="#editModal"
        onclick="editModalData(${user.id})">Edit</button>
    </td>
        <td>
        <button class="btn btn-danger" data-bs-toogle="modal"
        data-bs-target="#deleteModal"
        onclick="deleteModalData(${user.id})">Delete</button>
    </td>
</tr>`
    }
    tableBody.innerHTML = dataHtml;
}


async function loadUserTable() {
    let tableBody = document.getElementById('tableUser');
    let page = await fetch('/auth');
    let currentUser;
    if (page.ok) {
        currentUser = await page.json();
    } else {
        alert(`Error, ${page.status}`)
    }
    let dataHtml = '';
    let roles = [];
    for (let role of currentUser.roles) {
        roles.push(" " + role.name)
    }
    dataHtml +=
        `<tr>
    <td>${currentUser.id}</td>
    <td>${currentUser.username}</td>
    <td>${currentUser.yearOfBirth}</td>
    <td>${roles}</td>
</tr>`
    tableBody.innerHTML = dataHtml;
}


const form_new = document.getElementById('formForNewUser');

async function newUser() {
    form_new.addEventListener('submit', addNewUser);
}
form_new.addEventListener('submit', addNewUser);

async function addNewUser(event) {
    event.preventDefault();
    let listOfRole = [];
    for (let i = 0; i < form_new.roleSelect.options.length; i++) {
        if (form_new.roleSelect.options[i].selected) {
            listOfRole.push({id: form_new.roleSelect.options[i].value,
                role: form_new.roleSelect.options[i].text});
        }
    }
    let method = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: form_new.username.value,
            yearOfBirth: form_new.yearOfBirth.value,
            password: form_new.password.value,
            roles: listOfRole
        })
    }
    await fetch(url, method).then(() => {
        form_new.reset();
        getAdminPage();
        let deactivateTab = document.getElementById('profile');
        deactivateTab.classList.remove('active');
        let activateTab = document.getElementById('home');
        activateTab.classList.add('active');
    });
}





const form_ed = document.getElementById('formForEditing');
const id_ed = document.getElementById('id_ed');
const username_ed = document.getElementById('username_ed');
const yearOfBirth_ed = document.getElementById('yearOfBirth_ed');
const password_ed = document.getElementById('password_ed');


async function editModalData(id) {
    $('#editModal').modal('show');
    const urlDataEd = url + id;
    let usersPageEd = await fetch(urlDataEd);
    if (usersPageEd.ok) {
        await usersPageEd.json().then(user => {
            id_ed.value = `${user.id}`;
            username_ed.value = `${user.username}`;
            yearOfBirth_ed.value = `${user.yearOfBirth}`;
            password_ed.value = `${user.password}`;
        })
    } else {
        alert(`Error, ${usersPageEd.status}`)
    }
}

async function editUser() {
    let urlEdit = url + id_ed.value;
    let listOfRole = [];
    for (let i = 0; i < form_ed.rolesForEditing.options.length; i++) {
        if (form_ed.rolesForEditing.options[i].selected) {
            listOfRole.push({id: form_ed.rolesForEditing.options[i].value,
                name: form_ed.rolesForEditing.options[i].text});
        }
    }
    let method = {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: form_ed.editedUserId.value,
            username: form_ed.username.value,
            yearOfBirth: form_ed.yearOfBirth.value,
            password: form_ed.password.value,
            roles: listOfRole
        })
    }
    await fetch(urlEdit, method).then(() => {
        $('#editCloseBtn').click();
        getAdminPage();
    })
}



const form_del = document.getElementById('formForDeleting');
const id_del = document.getElementById('id_del');
const username_del = document.getElementById('username_del');
const yearOfBirth_del = document.getElementById('yearOfBirth_del');
const password_del = document.getElementById('password_del');


async function deleteModalData(id) {
    $('#deleteModal').modal('show');
    const urlForDel = url + id;
    let usersPageDel = await fetch(urlForDel);
    if (usersPageDel.ok) {
        await usersPageDel.json().then(user => {
            id_del.value = `${user.id}`;
            username_del.value = `${user.username}`;
            yearOfBirth_del.value = `${user.yearOfBirth}`;
            password_del.value = `${user.password}`;
        })
    } else {
        alert(`Error, ${usersPageDel.status}`)
    }
}

async function deleteUser() {
    let urlDel = url + id_del.value;
    let method = {
        method: 'DELETE'
    }
    await fetch(urlDel, method).then(() => {
        $('#deleteCloseBtn').click();
        getAdminPage();
    })
}


// if (res.ok){
//     console.log('OK');
// } else {
//     console.log('Not ok');
// }