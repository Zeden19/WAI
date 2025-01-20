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

export const renderNotesUI = async () => {
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
    await renderAllNotes();

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
        noteDescription: postNoteTextArea.value,
    });

    if (response?.error) {
        showToast(response.error, "error");
    } else {
        showToast("Note created successfully", "success");
    }

    saveNoteButton.disabled = false;
    postNoteTextArea.disabled = false;
    postNoteText.disabled = false;
    postNoteTextArea.value = "";
    postNoteText.value = "";
    saveNoteButton.innerText = "Save";
    saveNoteButton.style.backgroundColor = "rgb(10, 102, 194)";

    allNotes.push(response.newNote);
    renderNote(response.newNote);
};

const renderAllNotes = async () => {
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
const renderNote = async (note) => {
    const noteUI = await getElementFromHTML(NOTES_HTML_FILE, "note");
    noteUI.id = note.id;

    const noteTitle = noteUI.querySelector("#noteTitle");
    noteTitle.innerText = note.title;

    const noteDescription = noteUI.querySelector("#noteDescription");
    noteDescription.innerText = note.description;

    const noteFooter = noteUI.querySelector("#noteFooter");
    noteFooter.innerText = note.description.length;

    const deleteButton = document.createElement("button");
    const deleteIcon = document.createElement("img");
    deleteIcon.src = chrome.runtime.getURL("assets/deleteIcon.png");
    deleteButton.appendChild(deleteIcon);

    // Both (or 3) event clickers is quite a lot for a "render" function. Consider separating it into 3 functions
    // this whole thing probbably needs some refactoring!
    deleteButton.onclick = async () => {
        deleteButton.disabled = true;
        const response = await chrome.runtime.sendMessage({
            message: "deleteNote",
            noteId: note.id,
        });
        if (response?.error) {
            await showToast(response.error, "error");
        } else {
            // Todo: add dialog for confirmation
            noteUI.remove();
            showToast("Note successfully deleted", "success");
        }
        deleteButton.disabled = false;
    };

    const editButton = document.createElement("button");
    const editIcon = document.createElement("img");
    editIcon.src = chrome.runtime.getURL("assets/editIcon.png");
    editButton.appendChild(editIcon);

    const saveChangesButton = noteUI.querySelector("#saveChangesButton");
    let oldVals;
    editButton.onclick = async () => {
        oldVals = {
            title: noteTitle.value,
            description: noteDescription.value,
        };
        saveChangesButton.hidden = false;
        editButton.disabled = true;
        noteUI.style.gap = "12px";
        noteTitle.style.borderBottom = "2px solid black";
        noteTitle.readOnly = false;
        noteDescription.readOnly = false;
    };

    saveChangesButton.onclick = async () => {
        const response = await chrome.runtime.sendMessage({
            message: "updateNote",
            noteId: note.id,
            noteTitle: noteTitle.value,
            noteDescription: noteDescription.value,
        });
        if (response?.error) {
            noteTitle.value = oldVals.title;
            noteDescription.value = oldVals.description;
            showToast(response.error, "error");
        } else {
            showToast("Successfully updated note", "success");
        }

        saveChangesButton.hidden = true;
        editButton.disabled = false;
        noteUI.style.gap = "0";
        noteTitle.style.borderBottom = "0";
        noteTitle.readOnly = true;
        noteDescription.readOnly = true;
    };

    noteFooter.append(editButton, deleteButton);
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
