let main = document.querySelector(".main");

let nameInput = document.createElement("input");
nameInput.placeholder = "Enter  name";
let createBtn = document.createElement("button");

createBtn.textContent = "Create";
const usersList = document.createElement("div");

let modal = document.querySelector(".modal");
let modalContainer = document.querySelector(".modal-container");
let x = document.createElement("span");
x.textContent = "X";

let users = [
  { id: 1, name: "Khayyam" },
  { id: 2, name: "Omar" },
];

function deleteUser(id) {
  let findIndex = users.findIndex((user) => user.id === id);
  users.splice(findIndex, 1);
  fetchUser();
}

function changeUser(user, id) {
  users = users.map((item) => (item.id === id ? user : item));
  fetchUser();
  closeModal();
}

function openModal(user) {
  modal.classList.add("active");

  let changeNameInput = document.createElement("input");

  changeNameInput.value = user.name;

  const changeBtn = document.createElement("button");
  changeBtn.textContent = "Change";

  changeBtn.addEventListener("click", () => {
    const editUser = {
      ...user,
      name: changeNameInput.value,
    };

    changeUser(editUser, user.id);
  });

  modalContainer.append(changeNameInput, changeBtn, x);
}

function closeModal() {
  modal.classList.remove("active");
  modalContainer.textContent = "";
}

x.addEventListener("click", closeModal);

function userList(user) {
  let userName = document.createElement("h3");
  userName.textContent = `username: ${user.name}`;
  let deleteBtn = document.createElement("button");
  let editBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  editBtn.textContent = "Edit";

  deleteBtn.addEventListener("click", () => {
    deleteUser(user.id);
  });

  editBtn.addEventListener("click", () => {
    openModal(user);
  });

  usersList.append(userName, deleteBtn, editBtn);
}

function fetchUser() {
  usersList.textContent=""
  users.map((user) => userList(user));
}


function createUser() {
  let newUser = {
    id: users.length + 1,
    name: nameInput.value,
  };

  users.push(newUser);
  userList(newUser);
  nameInput.value = "";
}

createBtn.addEventListener("click", () => {
  createUser();
});

fetchUser();
main.append(nameInput, createBtn);
main.append(usersList);
