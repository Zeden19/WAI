import { showToast } from "./toast";
import getElementFromHTML from "./getElementFromHTML";

const NOTES_HTML_FILE = "notes.html";

// to maintain css element between calls/renders
let notesUI = null;

let header = null;

let postNoteUI = null;
let postNoteTitle = null;
let postNoteBody = null;
let postNoteButton = null;
let postNotePreviousButton = null;

let allNoteUI = null;
let allNoteScrollArea = null;
let allNotesButton = null;

// Posting Changes to Notes
const postNewNote = async () => {
    confirmButton.disabled = true;
    postNoteBody.disabled = true;
    confirmButton.innerText = "Saving...";
    confirmButton.style.backgroundColor = "rgb(80, 144, 207)";

    const newNote = await chrome.runtime.sendMessage({
        message: "newNote",
        noteText: postNoteBody.value,
    });

    if (newNote?.error) {
        showToast(newNote.error, "error");
    } else {
        showToast("Note created successfully", "success");
    }

    confirmButton.disabled = false;
    postNoteBody.disabled = false;
    confirmButton.innerText = "Save";
    confirmButton.style.backgroundColor = "rgb(10, 102, 194)";

    // set id of the newly created element (newNote.id)
};

const addAllNotes = async () => {
    // getting the notes
    const { notes } = await chrome.runtime.sendMessage({
        message: "getNoteList",
    });

    header = document.createElement("h2");
    header.textContent = "Test Header";
    allNoteScrollArea.appendChild(header);

    const renderIndividualPost = (note) => {};

    notes?.forEach((note) => {
        renderIndividualPost(note);
    });
};

export const addNotesUI = async () => {
    notesUI = document.getElementById("notesUI"); // parent element for the entire notesUI

    // Posting Area
    postNoteUI = document.getElementById("postNoteUI");
    postNoteTitle = document.getElementById("postNoteTitle");
    postNoteBody = document.getElementById("postNoteBody");
    postNoteButton = document.getElementById("postNoteButton");
    postNotePreviousButton = document.getElementById("notesPreviousButton");

    // Previous Notes
    allNoteUI = document.getElementById("allNotesUI");
    allNoteScrollArea = document.getElementById("allNoteScrollArea");
    allNotesButton = document.getElementById("allNotesButton");

    // Renders and creates the text area for notes
    if (!notesUI) {
        notesUI = await getElementFromHTML(NOTES_HTML_FILE, "notesUI");
        const parentUI = document.querySelector(".ph5");
        parentUI.appendChild(notesUI);
    }

    postNoteUI = notesUI.querySelector("#postNoteUI");
    postNoteTitle = postNoteUI.querySelector("#postNoteTitle");
    postNoteBody = postNoteUI.querySelector("#postNoteBody");
    postNoteButton = postNoteUI.querySelector("#postNoteButton");
    postNotePreviousButton = postNoteUI.querySelector(
        "#postNotePreviousButton",
    );

    allNoteUI = notesUI.querySelector("#allNoteUI");
    allNoteScrollArea = notesUI.querySelector("#allNoteScrollArea");
    allNotesButton = notesUI.querySelector("#allNotesButton");
    await addAllNotes();

    postNoteButton.addEventListener("click", async () => {
        await postNewNote();
    });
    postNotePreviousButton.addEventListener("click", () => {
        postNoteUI.style.display = "none";
        allNoteUI.style.display = "flex";
    });

    allNotesButton.addEventListener("click", () => {
        allNoteUI.style.display = "none";
        postNoteUI.style.display = "flex";
    });
};

export const removeNotesUI = () => {
    if (notesUI) {
        notesUI.innerHTML = "";
        notesUI.remove();
        notesUI = null;
        header = null;
        postNoteUI = null;
        postNoteTitle = null;
        postNoteBody = null;
        postNoteButton = null;
        postNotePreviousButton = null;
        allNoteUI = null;
        allNoteScrollArea = null;
        allNotesButton = null;
    }
};
