//DOM selector
const list = document.querySelector(".addList");
const cardPopup = document.querySelector(".add-card-popup");
const itemPopup = document.querySelector(".add-item-popup");
const closeCardPopupBtn = document.querySelector(".card-popup-close");
const closeItemPopupBtn = document.querySelector(".item-popup-close");
const noMsg = document.querySelector(".no-item-message");
const blur = document.querySelector("#blur");
const newCardField = document.querySelector(".card-field");
const addCard = document.querySelector("#addCard");
const subItemField = document.querySelector(".item-field");
const addItem = document.querySelector("#addItem");
const cards = document.querySelector(".cards");

const taskTitle = document.querySelector(".title");
const taskCard = document.querySelector(".task-card");

let addSubListContext;
let addSubListParentContext;
// UI Event Listener
list.addEventListener("click", displayPopup);
closeCardPopupBtn.addEventListener("click", closePopup);
closeItemPopupBtn.addEventListener("click", closeListPopup);
addCard.addEventListener("click", AddNewCard);
addItem.addEventListener("click", addNewList);

// Empty Array to hold array of cards
let cardArr = [];

function uiLoader(cardArr) {
  // Displaying empty message
  if (cardArr.length) {
    noMsg.style.display = "none";
  }
  for (let i = 0; i < cardArr.length; i++) {
    const div = document.createElement("div");
    div.classList.add("task-card");
    div.setAttribute("cardid", cardArr[i].id);
    div.innerHTML = `
            <div class="task-content">
                <p class="title">${cardArr[i].cardTitle}</p>
                <hr class="task-content-horizontal">
                <div class="sub-task">
                <ul class="sub-task-ul">
                </ul>
                </div>
                <div class="card-crud">
                    <div class="crud-logo">
                    <i class="fa fa-trash" onclick="removeCard(this)"></i>
                    <i onclick="displayAddListPopup(this)" class="add-link-sub content-add-icon fa fa-plus-circle"></i>
                    </div>
                </div>
            </div>
        `;
    cards.append(div);
    let SubListLength = cardArr[i].subListTodo.length;
    cardId = div.getAttribute("cardid");
    for (let j = 0; j < SubListLength; j++) {
      const li = document.createElement("li");
      li.innerHTML =
        cardTodo[i].subListTodo[j].listName +
        " " +
        `<a class="mark-done" onclick="markItem(this)">mark</a>`;
      div.childNodes[1].childNodes[5].childNodes[1].append(li);
    }
  }
}
// Loading the ui
uiLoader(cardArr);

// UI Functions
// Display add card popup
function displayPopup() {
  cardPopup.style.display = "block";
  blur.classList.toggle("active");
}
// Close add card Popup
function closePopup() {
  cardPopup.style.display = "none";
  blur.classList = "";
}
// Display add list popup
function displayAddListPopup(context) {
  itemPopup.style.display = "block";
  blur.classList.toggle("active");
  addSubListContext =
    context.parentNode.parentNode.parentNode.parentNode.getAttribute("cardid");
  addSubListParentContext =
    context.parentNode.parentNode.parentNode.childNodes[5].childNodes[1];
}
// Close add list Popup
function closeListPopup() {
  itemPopup.style.display = "none";
  blur.classList = "";
}
// Add New Card
function AddNewCard() {
  let taskTitle = newCardField.value;
  if (taskTitle == "") {
    alert("Please add List name");
    return;
  }
  const item = {
    id: Date.now(),
    cardTitle: taskTitle,
    subListTodo: [],
  };
  cardArr.push(item);
  closePopup();
  // Rendering recently created card
  uiLoader([item]);
}

// Add new list
function addNewList() {
  let listItem = subItemField.value;
  if (listItem == "") {
    alert("please add an item name");
    return;
  }
  const subListItem = {
    id: Date.now(),
    listName: listItem,
  };
  for (let i = 0; i < cardArr.length; i++) {
    if (addSubListContext == cardArr[i].id) {
      // pushing sublist data into sublist array
      cardArr[i].subListTodo.push(subListItem);
      // Passing the added item to render
      let itemIndex = cardArr[i].subListTodo.length - 1;
      const li = document.createElement("li");
      li.innerHTML =
        cardArr[i].subListTodo[itemIndex].listName +
        " " +
        `<a class="mark-done" onclick="markItem(this)">mark</a>`;
      addSubListParentContext.append(li);
    }
  }
  closeListPopup();
}
// Line through when sub task is completed
function markItem(liItem) {
  liItem.parentNode.style.textDecoration = "line-through";
}
// Delete the card
function removeCard(cardItem) {
  cardItem.parentNode.parentNode.parentNode.parentNode.remove();
}
