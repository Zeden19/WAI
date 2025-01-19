import { showToast } from "./toast";
import getElementFromHTML from "./getElementFromHTML";
import { newNote } from "../../backgroundTasks/notes";

const NOTES_HTML_FILE = "notes.html";

// to maintain css element between calls/renders
let notesUI = null;

let postNoteUI = null;
let postNoteTextArea = null;
let saveNoteButton = null;

let seeAllNotesButton = null;
let allNoteUI = null;
let allNoteScrollArea = null;
let addNotesButton = null;
let allNotes = [];

export const addNotesUI = async () => {
    notesUI = document.getElementById("notesUI"); // parent element for the entire notesUI

    // Posting Area
    postNoteUI = document.getElementById("postNoteUI");
    postNoteTextArea = document.getElementById("postNoteTextArea");
    saveNoteButton = document.getElementById("saveNoteButton");
    seeAllNotesButton = document.getElementById("seeAllNotesButton");

    // Previous Notes
    allNoteUI = document.getElementById("allNotesUI");
    allNoteScrollArea = document.getElementById("allNoteScrollArea");
    addNotesButton = document.getElementById("addNotes");

    // Renders and creates the text area for notes
    if (!notesUI) {
        notesUI = await getElementFromHTML(NOTES_HTML_FILE, "notesUI");
        const parentUI = document.querySelector(".ph5");
        parentUI.appendChild(notesUI);
    }

    postNoteUI = notesUI.querySelector("#postNoteUI");
    postNoteTextArea = postNoteUI.querySelector("#postNoteTextArea");
    saveNoteButton = postNoteUI.querySelector("#saveNoteButton");
    seeAllNotesButton = postNoteUI.querySelector("#seeAllNotesButton");

    allNoteUI = notesUI.querySelector("#allNoteUI");
    allNoteScrollArea = notesUI.querySelector("#allNoteScrollArea");
    addNotesButton = notesUI.querySelector("#addNotes");
    await addAllNotes();

    saveNoteButton.addEventListener("click", async () => {
        await postNewNote();
    });
    seeAllNotesButton.addEventListener("click", () => {
        postNoteUI.style.display = "none";
        allNoteUI.style.display = "flex";
    });

    addNotesButton.addEventListener("click", () => {
        allNoteUI.style.display = "none";
        postNoteUI.style.display = "flex";
    });
};


// creating new note
const postNewNote = async () => {
    saveNoteButton.disabled = true;
    postNoteTextArea.disabled = true;
    saveNoteButton.innerText = "Saving...";
    saveNoteButton.style.backgroundColor = "rgb(80, 144, 207)";

    const response = await chrome.runtime.sendMessage({
        message: "newNote",
        noteText: postNoteTextArea.value,
    });

    if (response?.error) {
        showToast(response.error, "error");
    } else {
        showToast("Note created successfully", "success");
    }

    seeAllNotesButton.disabled = false;
    postNoteTextArea.disabled = false;
    postNoteTextArea.value = "";
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

const renderNote = (note) => {
    const noteUI = document.createElement("div");
    noteUI.className = "note";
    const noteText = document.createElement("span");
    noteText.innerText = note.text;
    noteUI.appendChild(noteText);
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
        seeAllNotesButton = null;
        allNoteUI = null;
        allNoteScrollArea = null;
        addNotesButton = null;
        allNotes = [];
    }
};
