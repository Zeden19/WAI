import { showToast } from "./toast";
import getElementFromHTML from "./getElementFromHTML";
import { newNote } from "../../backgroundTasks/notes";

const NOTES_HTML_FILE = "notes.html";

let notesUI = null;

let postNoteUI = null;
let postNoteText = null;
let postNoteTextArea = null;
let saveNoteButton = null;

let allNotesUI = null;
let allNoteScrollArea = null;
let allNotes = [];

export const addNotesUI = async () => {
    notesUI = document.getElementById("notesUI"); // parent element for the entire notesUI

    // Posting Area
    postNoteUI = document.getElementById("postNoteUI");
    postNoteTextArea = document.getElementById("postNoteTextArea");
    saveNoteButton = document.getElementById("saveNoteButton");

    // Previous Notes
    allNotesUI = document.getElementById("allNotesUI");
    allNoteScrollArea = document.getElementById("allNoteScrollArea");

    // Renders and creates the text area for notes
    if (!notesUI) {
        notesUI = await getElementFromHTML(NOTES_HTML_FILE, "notesUI");
        const parentUI = document.querySelector(".ph5");
        parentUI.appendChild(notesUI);
    }

    postNoteUI = notesUI.querySelector("#postNoteUI");
    postNoteTextArea = postNoteUI.querySelector("#postNoteTextArea");
    postNoteText = postNoteUI.querySelector("#postNoteText");
    saveNoteButton = postNoteUI.querySelector("#saveNoteButton");

    allNotesUI = notesUI.querySelector("#allNotesUI");
    allNoteScrollArea = notesUI.querySelector("#allNoteScrollArea");
    await addAllNotes();

    saveNoteButton.addEventListener("click", async () => {
        await postNewNote();
    });
};


// creating new note
const postNewNote = async () => {
    saveNoteButton.disabled = true;
    postNoteTextArea.disabled = true;
    postNoteText.disabled = true;
    saveNoteButton.innerText = "Saving...";
    saveNoteButton.style.backgroundColor = "rgb(80, 144, 207)";

    const response = await chrome.runtime.sendMessage({
        message: "newNote",
        noteTitle: postNoteText.value,
        noteDescription: postNoteTextArea.value
    });

    if (response?.error) {
        showToast(response.error, "error");
    } else {
        showToast("Note created successfully", "success");
    }

    postNoteTextArea.disabled = false;
    postNoteText.disabled = false;
    postNoteTextArea.value = "";
    postNoteText.value = ""
    saveNoteButton.innerText = "Save";
    saveNoteButton.style.backgroundColor = "rgb(10, 102, 194)";

    allNotes.push(response.newNote);
    renderNote(response.newNote);
};

const addAllNotes = async () => {
    if (allNotes.length === 0) {
        const { notes } = await chrome.runtime.sendMessage({
            message: "getNoteList",
        });
        allNotes = notes;
    }

    allNotes?.forEach((note) => {
        renderNote(note);
    });
};

// Couple things we need for the future:
// as this list can get pretty long, make each title an accordion for the button
// add ability to edit & delete notes
const renderNote = (note) => {
    const noteUI = document.createElement("div");
    noteUI.className = "note";

    const noteTitle = document.createElement("span");
    noteTitle.className = "noteTitle";
    noteTitle.innerText = note.title;

    const noteDescription = document.createElement("h5");
    noteDescription.className = "noteDescription";
    noteDescription.innerText = note.description;

    noteUI.appendChild(noteTitle);
    noteUI.appendChild(noteDescription);
    allNoteScrollArea.appendChild(noteUI);
};

export const removeNotesUI = () => {
    if (notesUI) {
        notesUI.innerHTML = "";
        notesUI.remove();
        notesUI = null;
        postNoteUI = null;
        postNoteTextArea = null;
        saveNoteButton = null;
        allNotesUI = null;
        allNoteScrollArea = null;
        allNotes = [];
    }
};
