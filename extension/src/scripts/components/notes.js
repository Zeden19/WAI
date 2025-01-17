import { showToast } from "./toast";

// to maintain css element between calls/renders
let notesUI = null;

let header = null;

let postNoteUI = null;
let postNoteTitle = null;
let postNoteBody = null;
let postNotePostButton = null;
let postNotePreviousButton = null;

let allNoteUI = null;
let allNoteScrollArea = null;
let allNotesButton = null;

// TODO: Adding a Title Feature
const addPostNotes = () => {
    // Styling NotesUI
    notesUI.style.display = "flex";
    notesUI.style.flexDirection = "row";
    notesUI.style.width = "60%";
    notesUI.style.marginTop = "1.6rem";

    // Styling NotesTextArea
    postNoteBody.style.width = "100%";
    postNoteBody.style.height = "3.6rem";
    postNoteBody.style.minHeight = "3.6rem";
    postNoteBody.style.maxHeight = "15rem";
    postNoteBody.style.boxSizing = "border-box";
    postNoteBody.style.border = "2px solid rgb(10, 102, 194)";

    postNoteBody.style.overflow = "hidden";
    postNoteBody.style.overflowY = "scroll";
    postNoteBody.style.resize = "vertical";
    postNoteBody.style.scrollbarWidth = "none";
    postNoteBody.placeholder = "Enter your notes here :)";

    // Styling ConfirmButton
    // lowkey should find actual stupid top an
    postNotePostButton.style.marginLeft = "1.6rem";
    postNotePostButton.style.height = "3.6rem";
    postNotePostButton.style.backgroundColor = "rgb(10, 102, 194)";
    postNotePostButton.style.color = "white";
    postNotePostButton.style.border = "none";
    postNotePostButton.style.borderRadius =
        "var(--corner-radius-large)!important";
    postNotePostButton.style.fontSize = "1.5rem";
    postNotePostButton.style.fontWeight = "bold";

    postNotePostButton.innerText = "Save";
    postNotePostButton.style.color = "white";
    postNotePostButton.style.cursor = "pointer";
    postNotePostButton.style.transition = "all 0.2s ease-in-out";
    postNotePostButton.style.boxShadow = "0 0 0 0 rgba(10, 102, 194, 0.5)";
    postNotePostButton.style.paddingLeft = "2rem";
    postNotePostButton.style.paddingRight = "2rem";

    // Previous Button
    postNotePreviousButton.innerText = "See All Notes";
    postNotePreviousButton.style.margin = "1.6rem";

    // Posting Changes to Notes
    const postNewNotes = async () => {
        confirmButton.disabled = true;
        notesTextArea.disabled = true;
        confirmButton.innerText = "Saving...";
        confirmButton.style.backgroundColor = "rgb(80, 144, 207)";

        const newNote = await chrome.runtime.sendMessage({
            message: "newNote",
            noteText: notesTextArea.value,
        });

        if (newNote?.error) {
            showToast(newNote.error, "error");
        } else {
            showToast("Note created successfully", "success");
        }

        confirmButton.disabled = false;
        notesTextArea.disabled = false;
        confirmButton.innerText = "Save";
        confirmButton.style.backgroundColor = "rgb(10, 102, 194)";

        // set id of the newly created element (newNote.id)
    };

    postNotePostButton.addEventListener("click", async () => {
        await postNewNotes();
    });
};

const addAllNotes = async () => {
    // Previous Button
    allNotesButton.innerText = "See All Notes";
    allNotesButton.style.margin = "1.6rem";

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

export const addNotesUI = () => {
    notesUI = document.getElementById("notesUI"); // parent element for the entire notesUI

    // Posting Area
    postNoteUI = document.getElementById("postNoteUI");
    postNoteTitle = document.getElementById("postNoteUI");
    postNoteBody = document.getElementById("notesArea");
    postNotePostButton = document.getElementById("notesPostButton");
    postNotePreviousButton = document.getElementById("notesPreviousButton");

    // Previous Notes
    allNoteUI = document.getElementById("allNotesUI");
    allNoteScrollArea = document.getElementById("allNoteScrollArea");
    allNotesButton = document.getElementById("allNotesPreviousButton");

    // Renders and creates the text area for notes
    if (!notesUI) {
        const parentUI = document.querySelector(".ph5");
        notesUI = document.createElement("div");
        notesUI.id = "notesUI";
        notesUI.classList.add("notesUI");
        parentUI.appendChild(notesUI);
    }

    // If postNoteUI hasn't been created yet, we create it
    if (
        !postNoteUI ||
        !postNoteTitle ||
        !postNoteBody ||
        !postNotePostButton ||
        !postNotePreviousButton
    ) {
        postNoteUI = document.createElement("textarea");
        postNoteUI.id = "postNoteUI";
        postNoteUI.style.display = "none"; // All notes is default display
        notesUI.appendChild(postNoteUI);

        postNoteTitle = document.createElement("h2");
        postNoteUI.id = "postNoteTitle";
        postNoteUI.appendChild(postNoteTitle);

        postNoteBody = document.createElement("textarea");
        postNoteUI.id = "postNoteBody";
        postNoteUI.appendChild(postNoteBody);

        postNotePostButton = document.createElement("button");
        postNoteUI.id = "postNotePostButton";
        postNoteUI.appendChild(postNotePostButton);

        postNotePreviousButton = document.createElement("button");
        postNotePreviousButton.id = "notesPreviousButton";
        postNoteUI.appendChild(postNotePreviousButton);

        addPostNotes();
    }

    // If allNotesUI hasn't created yet, we create it
    if (!allNoteUI || !allNoteScrollArea || !allNotesButton) {
        allNoteUI = document.createElement("div");
        allNoteUI.id = "allNoteUI"; // All notes is default display
        notesUI.appendChild(allNoteUI);

        allNoteScrollArea = document.createElement("div");
        allNoteScrollArea.id = "allNoteScrollArea";
        allNoteUI.appendChild(allNoteScrollArea);

        allNotesButton = document.createElement("button");
        allNotesButton.id = "allNotesPreviousButton";
        allNoteUI.appendChild(allNotesButton);

        addAllNotes();
    }

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
    }
};
