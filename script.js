// select elements & assign them to variables.
let formInfo = document.querySelector("note-apps-from");
let getFormTitle = document.querySelector(".note-heading-input");
let getFormText = document.querySelector(".note-paragraph-textarea");
let formSaveBtn = document.querySelector(".from-save-btn");

let formBtnGroup = document.querySelector(".form-btn-group");
let formUpdateBtn = document.querySelector(".from-update-btn");
let formDeleteBtn = document.querySelector(".from-clear-btn");

let notesWrapper = document.querySelector(".notes-contents-wrapper");
let noteContentBody = document.querySelector(".note-content-body");
let closeBtn = document.querySelector(".close-btn");
let noteContent = document.querySelector(".note-content");
let noteHeading = document.querySelector(".note-heading");
let noteParagraph = document.querySelector(".note-paragraph");

// store all note into notes array.
const notes = JSON.parse(localStorage.getItem("notes")) || [];

// create note html template function.
let createNotetemp = (note) => {
    return `<div class="note-content-body">
        <button class="close-btn">Close</button>
        <div class="note-content">
            <h2 class="note-heading">${note.title}</h2>
            <p class="note-paragraph">${note.text}</p>
        </div>
    </div>`;
}

// add note function.
let addNote = (title,text) => {
    //  note object declaretion.
    let createNote = {
        title: title,
        text: text
    }
    notes.push(createNote); // adding new note into notes array.
    localStorage.setItem("notes",JSON.stringify(notes));  // store notes into local storage.
}

// save event listener for adding note.
formSaveBtn.addEventListener("click", (event) => {
    event.preventDefault();
    notesWrapper.innerHTML += createNotetemp(createNote); // add new note temp. into note-wrapper div.
    // invoke addnote function.
    addNote(getFormTitle.value,getFormText.value);
    event.reset; // reset the form input data.
})

// reset even listener for form clear.
formDeleteBtn.addEventListener("click", (event) => {
    event.preventDefault();
    getFormTitle.value = "";
    getFormText.value =  "";
})

// close event listener for note delete.
closeBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.target.parentElement.remove();
})
// note update listener when click on note div.
noteContent.addEventListener("click", (event) => {
    event.preventDefault();
    // pass the note content value to form filed.
    getFormTitle.value = noteHeading.textContent;
    getFormText.value =  noteParagraph.textContent;
    // css customaization.
    formSaveBtn.style.display = "none";
    formSaveBtn.style.transition = "all .5s ease";
    formBtnGroup.style.display = "flex";
    formBtnGroup.style.transition = "all .5s ease";
    // invoke event listener for note modification.
    formUpdateBtn.addEventListener("click", updateNote)
})

// update event listener for note modification.
let updateNote = (event) => {
    event.preventDefault();
        // pass the form filed to note content value.
        noteHeading.textContent = getFormTitle.value;
        noteParagraph.textContent = getFormText.value;
        // invoke addnote function.
    addNote(noteHeading.textContent, noteParagraph.textContent);
}

// shown the notes when window is loaded.
let noteBinder = () => {
    notes.forEach(note => {
        notesWrapper.innerHTML += createNotetemp(note);
    });
}
// invoke notebinder function.
noteBinder();