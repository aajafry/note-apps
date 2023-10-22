// select elements & assign them to variables.
// const formInfo = document.querySelector(".note-apps-from");
const getFormTitle = document.querySelector(".note-heading-input");
const getFormText = document.querySelector(".note-paragraph-textarea");
const formSaveBtn = document.querySelector(".from-save-btn");

const formBtnGroup = document.querySelector(".form-btn-group");
const formUpdateBtn = document.querySelector(".from-update-btn");
const formResetBtn = document.querySelector(".from-clear-btn");

const notesWrapper = document.querySelector(".notes-contents-wrapper");
// const noteContentBody = document.querySelector(".note-content-body");
// const closeBtn = document.querySelector(".close-btn");
const noteContent = document.querySelector(".note-content");
const noteHeading = document.querySelector(".note-heading");
// const noteParagraph = document.querySelector(".note-paragraph");

// store all note into notes array.
const notes = JSON.parse(localStorage.getItem("notes")) || [];

// create note html template function.
const createNotetemp = (note) => {
    return `<div class="note-content-body">
        <button 
            class="close-btn" 
            id="close-btn" 
            type="submit" 
            onclick="closeNote(this)"
        >Close</button>
        <div class="note-content" onclick="dataPassToForm(this)">
            <h2 class="note-heading">${note.title}</h2>
            <p class="note-paragraph">${note.text}</p>
        </div>
    </div>`;
}
// save event listener for adding note.
formSaveBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const createNote = {
        title: getFormTitle.value,
        text:  getFormText.value
    }
    notesWrapper.innerHTML += createNotetemp(createNote); // add new note temp. into note-wrapper div.
    notes.push(createNote); // adding new note into notes array.
    localStorage.setItem("notes",JSON.stringify(notes));  // store notes into local storage.
    // reset the form input data.
    getFormTitle.value = "";
    getFormText.value =  "";
})
// note update listener when click on note div.
const dataPassToForm = (currentElement) => {
    let headingContent = currentElement.querySelector(".note-heading").textContent;
    let paragraphContent = currentElement.querySelector(".note-paragraph").textContent;
    // pass the note content value to form filed.
    getFormTitle.value = headingContent;
    getFormText.value =  paragraphContent;
    // CSS customaization.
    formSaveBtn.style.display = "none";
    formSaveBtn.style.transition = "all .5s ease";
    formBtnGroup.style.display = "flex";
    formBtnGroup.style.transition = "all .5s ease";
    // update event listener for note modification.
    formUpdateBtn.addEventListener("click", (event) => {
        event.preventDefault();
        headingContent = getFormTitle.value;
        paragraphContent = getFormText.value;
        formSaveBtn.style.display = "block";
        formBtnGroup.style.display = "none";
        console.log("fire!")
    });
}
// reset even listener for form clear.
formResetBtn.addEventListener("click", (event) => {
    event.preventDefault();
    getFormTitle.value = "";
    getFormText.value =  "";
})
// definition of closeNote for removing the note from the notes.
const closeNote = (currentElement) => {
    currentElement.parentNode.remove();
}
// shown the notes when window is loaded.
(function notesShown() {
    notes.forEach((note) => {
        notesWrapper.innerHTML += createNotetemp(note);
    });
})();