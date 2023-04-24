//Selectors
const mainDisplay = document.querySelector(".display");
const overlay = document.querySelector(".overlay");
const newNoteButton = document.querySelector(".nav__btn");
const plusButton = document.querySelector(".navb");
const newNoteDisplay = document.querySelector(".add-note-window");
const closeButton = document.querySelector(".btnClose");
const addNoteButton = document.querySelector(".newNote");
const noteList = document.querySelector(".list-ul");
const firstAddNoteButton = document.querySelector(".plus-icon");

///Markup

html = `<li class="note-preview">
<div class="note-block">
  <div class="note">
    <figure class="category-fig">
      <img src="shopping.svg" />
    </figure>
    <div class="preview__data">
      <h4 class="preview__title">ZAKUPY</h4>
      <p class="preview__publisher">5 minut temu</p>
    </div>
  </div>
  <div class="note">
    Nam sagittis diam eu venenatis gravida. Pellentesque eget ex
    mi.....
  </div>
  <div class="block-icons">
    <img class="view" src="view-04.svg" />
    <img class="view" src="edit.svg" />
    <img class="view" src="trash.svg" />
  </div>
</div>
</li>`;

//Handlers
newNoteButton.addEventListener("click", function () {
  toggleWindow();
});
overlay.addEventListener("click", function () {
  toggleWindow();
});
closeButton.addEventListener("click", function () {
  toggleWindow();
});
addNoteButton.addEventListener("click", function (e) {
  e.preventDefault();
  RenderNewNote();
  toggleWindow();
});
firstAddNoteButton.addEventListener("click", function () {});
//New Note
const toggleWindow = function () {
  overlay.classList.toggle("hidden");
  newNoteDisplay.classList.toggle("hidden");
};
const RenderNewNote = function () {
  noteList.insertAdjacentHTML("afterbegin", html);
};
