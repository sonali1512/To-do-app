  //DOM selector
const list = document.querySelector(".addList");
const cardPopup = document.querySelector(".add-card-popup");
const noMsg = document.querySelector(".no-item-message");
const blur = document.querySelector("#blur");

list.addEventListener("click", ()=>{
    list.classList.add("add-card-popup")
    cardPopup.style.display = "block";
    noMsg.style.display = "none";
    list.classList.add("blur");
});
