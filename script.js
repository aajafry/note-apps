// select elements & assign them to variables.
const getFormTitle = document.querySelector(".note-heading-input");
const getFormText = document.querySelector(".note-paragraph-textarea");
const formSaveBtn = document.querySelector(".from-save-btn");

const formBtnGroup = document.querySelector(".form-btn-group");
const formUpdateBtn = document.querySelector(".from-update-btn");
const formResetBtn = document.querySelector(".from-clear-btn");

const notesWrapper = document.querySelector(".notes-contents-wrapper");
const noteContent = document.querySelector(".note-content");
const noteHeading = document.querySelector(".note-heading");

// store all note into notes array.
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// unique id genaretor function for each note.
const UUID = () => {
    return Math.floor(Math.random(10) * 10000);
}
// note object declaretion.
let noteObject = (id,title,text) =>  {
    return createNote = {
        id: id,
        title: title,
        text:  text
    }
}
// reset the form all input data.
const resetFormField = () => {
    getFormTitle.value = "";
    getFormText.value =  "";
}
// create note html template function.
const createNotetemp = (note) => {
    return `<div class="note-content-body">
        <button 
            class="close-btn" 
            id="close-btn" 
            type="submit" 
            onclick="closeNote(this)"
        >Close</button>
        <div class="note-content" onclick="dataPassToForm(this)" id="${note.id}">
            <h2 class="note-heading">${note.title}</h2>
            <p class="note-paragraph">${note.text}</p>
        </div>
    </div>`;
}
// save event listener for adding note.
formSaveBtn.addEventListener("click", (event) => {
    event.preventDefault();
    // invoke note function for crate a note object.
    noteObject(`note-${UUID()}`,getFormTitle.value, getFormText.value);
    notesWrapper.innerHTML += createNotetemp(createNote); // add new note temp. into note-wrapper div.
    notes.push(createNote); // adding new note into notes array.
    localStorage.setItem("notes",JSON.stringify(notes));  // store notes into local storage.
   // invoke this for reset all the form field.
    resetFormField();
})
// note update listener when click on note div.
const dataPassToForm = (currentElement) => {
    // store current element by ID.
    const currentElementId = currentElement.parentNode.querySelector("#"+ currentElement.id);
    // store current element heading and paragraph text-content.
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
        let updatedHeadingContent = currentElementId.querySelector(".note-heading");
        let updatedParagraphContent = currentElementId.querySelector(".note-paragraph");
        // pass the form filed value to note content.
        updatedHeadingContent.textContent = getFormTitle.value;
        updatedParagraphContent.textContent = getFormText.value;
         // CSS customaization.
        formSaveBtn.style.display = "block";
        formBtnGroup.style.display = "none";
        // update note array and local storage.
        notes = notes.map((note) => {
            if(note.id == currentElementId.id){
                return noteObject(currentElementId.id, getFormTitle.value,getFormText.value);
            }else{
                return note;
            }
        })
        localStorage.setItem("notes",JSON.stringify(notes));  // store notes into local storage.
        // invoke this for reset all the form field.
        resetFormField();
    });
}
// reset even listener for form clear.
formResetBtn.addEventListener("click", (event) => {
    event.preventDefault();
    // invoke this for reset all the form field.
    resetFormField();
})
// definition of closeNote for removing the note from the notes.
const closeNote = (currentElement) => {
    currentElement.parentNode.remove();
    let currentElementId = currentElement.parentNode.querySelector(".note-content").id;
    notes = notes.filter((note) => note.id != currentElementId);
    localStorage.setItem("notes",JSON.stringify(notes));  // store notes into local storage.
}
// shown the notes when document is loaded.
(function notesShown() {
    notes.forEach((note) => {
        notesWrapper.innerHTML += createNotetemp(note);
    });
})();