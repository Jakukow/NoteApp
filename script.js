// Class

class Note {
  constructor(title, category, index, htmlCode, text, date) {
    this.title = title;
    this.category = category;
    this.index = index;
    this.htmlCode = htmlCode;
    this.text = text;
    this.date = date;
  }
}
localStorage.getItem("Notes")
  ? (noteArr = JSON.parse(localStorage.getItem("Notes")))
  : (noteArr = []);
localStorage.getItem("Index")
  ? (i = JSON.parse(localStorage.getItem("Index")))
  : (i = 0);
let n = -123;
let removable = "";
//Selectors
const buttonClass = document.querySelector(".btn");
const searchButton = document.querySelector(".search__btn");
const searchBar = document.querySelector(".search");
const searchInput = document.querySelector(".search__field");
const searchIcon = document.querySelector(".shref");
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
const form = document.querySelector("form");
const textEditor = document.querySelector(".text-editor");
const submitBtn = document.querySelector("#submit-btn");
const format = document.querySelector(".formatting");
const noteDisplay = document.querySelector(".display-note");
const textDisp = document.querySelector(".text");
const closeView = document.getElementById("closeView");
const alertWindow = document.querySelector(".alert");

///Markup

//Handlers
searchButton.addEventListener("click", function (e) {
  e.preventDefault();
  if (!searchInput.value) return;
  newNoteButton.classList.toggle("hidden");
  if (buttonClass.classList.contains("xclass")) {
    searchInput.value = "";
    RestoreAllNotes();
  }
  if (!buttonClass.classList.contains("xclass")) {
    const titleInput = searchInput.value;
    RenderTitles(titleInput);
  }

  buttonClass.classList.toggle("xclass");
  buttonClass.classList.contains("xclass")
    ? (searchIcon.href.baseVal = "icons.svg#icon-close")
    : (searchIcon.href.baseVal = "icons.svg#icon-search");
  buttonClass.classList.contains("xclass")
    ? (searchInput.disabled = true)
    : (searchInput.disabled = false);
});

closeView.addEventListener("click", function () {
  overlay.classList.add("hidden");
  noteDisplay.classList.add("hidden");
});
noteList.addEventListener("click", function (e) {
  if (!e.target.closest(".view")) return;
  removable = e.target.parentNode.parentNode.parentNode;
  const key = e.target.closest(".view").id;
  const id = e.target.parentNode.parentNode.parentNode.id;
  if (key === "remove") {
    const note1 = noteArr.findIndex((el) => String(el.index) === String(id));
    e.target.parentNode.parentNode.parentNode.remove();
    noteArr.splice(note1, 1);
    if (noteArr.length === 0) {
      FirstView();
    }
    if (buttonClass.classList.contains("xclass") && !noteList.firstChild) {
      ResetView();
      RestoreAllNotes();
    }
    localStorage.setItem("Notes", JSON.stringify(noteArr));
  }
  if (key === "show") {
    displayNote(id);
  }
  if (key === "edit") {
    editNote(id);
  }
});

newNoteButton.addEventListener("click", function () {
  overlay.classList.toggle("hidden");
  newNoteDisplay.classList.toggle("hidden");
  n = -123;
});

overlay.addEventListener("click", function () {
  if (format.classList.contains("hidden")) {
    title.value = "";

    newNoteDisplay.classList.add("hidden");
    alertWindow.classList.add("hidden");
    overlay.classList.toggle("hidden");
    noteDisplay.classList.add("hidden");
  } else return;
});
closeButton.addEventListener("click", function () {
  overlay.classList.add("hidden");
  newNoteDisplay.classList.add("hidden");
  noteDisplay.classList.add("hidden");
  title.value = "";
});
addNoteButton.addEventListener("click", function (e) {
  e.preventDefault();
  newNoteDisplay.classList.toggle("hidden");
  displayFormatting();
});
const displayFormatting = function () {
  format.classList.remove("hidden");
  document.querySelector(".title-new").textContent =
    document.querySelector(".title-Input").value;
};
firstAddNoteButton.addEventListener("click", function () {
  toggleWindow();
  n = -123;
});

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (noteArr.some((el) => String(el.index) === String(n))) {
    const id = noteArr.findIndex((el) => String(el.index) === String(n));
    const html = `<div style="text-align: ${textEditor.style.textAlign}">${textEditor.innerHTML}</div>`;
    console.log("chhh");
    textEditor.textContent.length > 45
      ? (subtilte = textEditor.textContent.slice(0, 45) + "...")
      : (subtilte = textEditor.textContent);
    textEditor.innerHTML = "";
    title.value = "";

    UpdateNote(html, noteArr[id], id, subtilte);
    return;
  } else {
    i++;
    localStorage.setItem("Index", JSON.stringify(i));
    const data = getDataNote();
    title.value = "";
    const html = `<div style="text-align: ${textEditor.style.textAlign}">${textEditor.innerHTML}</div>`;
    textEditor.textContent.length > 45
      ? (subtilte = textEditor.textContent.slice(0, 45) + "...")
      : (subtilte = textEditor.textContent);

    const note = new Note(
      ...data,
      i,
      html,
      subtilte,
      new Date(Date.now()).toLocaleString().slice(0, -3)
    );

    if (noteArr.length === 0) {
      FirstView();
    }
    noteArr.push(note);
    localStorage.setItem("Notes", JSON.stringify(noteArr));
    textEditor.innerHTML = "";
    overlay.classList.toggle("hidden");
    format.classList.add("hidden");
    RenderNewNote(note.title, note.category, subtilte, note.date, note.index);
  }
});

//New Note
const toggleWindow = function () {
  overlay.classList.toggle("hidden");
  newNoteDisplay.classList.toggle("hidden");
};
const RenderNewNote = function (title, category, subtilte, date, index) {
  if (!category) {
    category = `General`;
  }

  const html = `<li id='${index}' class="note-preview">
  <div class="note-block">
    <div class="note">
      <figure class="category-fig">
        <img src="${category}.svg" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${title}</h4>
        <p class="preview__publisher">${date}</p>
      </div>
    </div>
    <div class="note">
      ${subtilte}
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
  searchBar.classList.toggle("hidden");
};

const formatText = function (command, value = null) {
  if (command === "insertUnorderedList") {
    document.execCommand(command, false, value);
    const ul = textEditor.querySelector("ul");
    if (ul) {
      ul.classList.add("ul-list");
    }
  } else if (command === "insertOrderedList") {
    document.execCommand(command, false, value);
    const ol = textEditor.querySelector("ol");
    if (ol) {
      ol.classList.add("ol-list");
    }
  } else {
    document.execCommand(command, false, value);
  }
  textEditor.focus();
};

const displayNote = function (idNote) {
  const idx = noteArr.findIndex((el) => String(el.index) === String(idNote));
  overlay.classList.remove("hidden");
  noteDisplay.classList.remove("hidden");
  const htmlIn = noteArr[idx].htmlCode;
  textDisp.innerHTML = htmlIn;
};

const editNote = function (id) {
  const idx = noteArr.findIndex((el) => String(el.index) === String(id));
  n = id;
  overlay.classList.remove("hidden");
  format.classList.remove("hidden");
  textEditor.innerHTML = noteArr[idx].htmlCode;
  document.querySelector(".title-new").textContent = noteArr[idx].title;
};
const UpdateNote = function (html, note, id, subtilte) {
  if (!note.category) {
    note.category = `General`;
  }
  noteArr[id].htmlCode = html;
  noteArr[id].text = subtilte;
  noteArr[id].date = new Date(Date.now()).toLocaleString().slice(0, -3);
  gen = `<li id='${note.index}' class="note-preview">
  <div class="note-block">
    <div class="note">
      <figure class="category-fig">
        <img src="${note.category}.svg" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${note.title}</h4>
        <p class="preview__publisher">${new Date(Date.now())
          .toLocaleString()
          .slice(0, -3)}</p>
      </div>
    </div>
    <div class="note">
      ${subtilte}
    </div>
    <div class="block-icons">
      <img id ="show" class="view" src="view-04.svg" />
      <img id = "edit" class="view" src="edit.svg" />
      <img id = "remove" class="view" src="trash.svg" />
    </div>
  </div>
  </li>`;
  removable.remove();
  noteList.insertAdjacentHTML("afterbegin", gen);
  overlay.classList.toggle("hidden");
  format.classList.add("hidden");
  localStorage.setItem("Notes", JSON.stringify(noteArr));
};
const RenderTitles = function (title) {
  const filteredNotes = noteArr.filter((el) =>
    el.title.toLowerCase().includes(title.toLowerCase())
  );
  if (filteredNotes.length === 0) {
    alertWindow.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
    ResetView();
    return;
  }
  RemoveNotes();
  filteredNotes.forEach((el) =>
    RenderNewNote(el.title, el.category, el.text, el.date, el.index)
  );
};

const ResetView = function () {
  searchInput.disabled = false;
  searchIcon.href.baseVal = "icons.svg#icon-search";
  newNoteButton.classList.toggle("hidden");
  buttonClass.classList.toggle("xclass");
  searchInput.value = "";
};
const RemoveNotes = function () {
  while (noteList.firstChild) {
    noteList.removeChild(noteList.firstChild);
  }
};
const RestoreAllNotes = function () {
  RemoveNotes();
  noteArr.forEach((el) =>
    RenderNewNote(el.title, el.category, el.text, el.date, el.index)
  );
};
const init = function () {
  if (noteArr.length === 0) return;
  FirstView();
  noteArr.forEach((el) =>
    RenderNewNote(el.title, el.category, el.text, el.date, el.index)
  );
};
init();
