// Class

class Note {
  constructor(title, category, index) {
    this.title = title;
    this.category = category;
    this.index = index;
  }
}
const noteArr = [];
let i = 0;
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
const title = document.querySelector(".title-Input");
const category = document.querySelector(".cat");
const bg = document.querySelector(".bg-active");
const plus = document.querySelector(".plus");

///Markup

//Handlers
noteList.addEventListener("click", function (e) {
  if (!e.target.closest(".view")) return;
  const key = e.target.closest(".view").id;
  if (key === "remove") {
    const id = e.target.parentNode.parentNode.parentNode.id;
    const note1 = noteArr.findIndex((el) => String(el.index) === String(id));
    e.target.parentNode.parentNode.parentNode.remove();
    noteArr.splice(note1, 1);
    if (noteArr.length === 0) {
      FirstView();
    }
  }
});

newNoteButton.addEventListener("click", function () {
  toggleWindow();
});
overlay.addEventListener("click", function () {
  overlay.classList.add("hidden");
  newNoteDisplay.classList.add("hidden");
});
closeButton.addEventListener("click", function () {
  toggleWindow();
});
addNoteButton.addEventListener("click", function (e) {
  i++;
  e.preventDefault();
  newNoteDisplay.classList.toggle("hidden");
  const data = getDataNote();
  title.value = "";
  displayFormatting(data);
});
const displayFormatting = function (data) {
  const note = new Note(...data, i);
  noteArr.push(note);
  FirstView();
  RenderNewNote(...data);
};
firstAddNoteButton.addEventListener("click", function () {
  toggleWindow();
});
//New Note
const toggleWindow = function () {
  overlay.classList.toggle("hidden");
  newNoteDisplay.classList.toggle("hidden");
};
const RenderNewNote = function (title, category) {
  if (!category) {
    category = `General`;
  }

  const html = `<li id='${i}' class="note-preview">
  <div class="note-block">
    <div class="note">
      <figure class="category-fig">
        <img src="${category}.svg" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${title}</h4>
        <p class="preview__publisher">${new Date(Date.now())
          .toLocaleString()
          .slice(0, -3)}</p>
      </div>
    </div>
    <div class="note">
      Nam sagittis diam eu venenatis gravida. Pellentesque eget ex
      mi.....
    </div>
    <div class="block-icons">
      <img id ="show" class="view" src="view-04.svg" />
      <img id = "edit" class="view" src="edit.svg" />
      <img id = "remove" class="view" src="trash.svg" />
    </div>
  </div>
  </li>`;
  noteList.insertAdjacentHTML("afterbegin", html);
};
const getDataNote = function () {
  return [title.value, category.value];
};
const FirstView = function () {
  newNoteButton.classList.toggle("hidden");
  plus.classList.toggle("hidden");
  bg.classList.toggle("hidden");
};
FirstView();
overlay.classList.toggle("hidden");
