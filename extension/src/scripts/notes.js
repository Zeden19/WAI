import { doc } from "firebase/firestore";
import { showToast } from "./linkedin";

let notesUI = null
export const addNotesUI = (notesTextArea) => {
    if (notesUI === null) notesUI = notesTextArea;

    // Styling NotesTextArea
    notesUI.style.marginTop = "2rem"
    notesUI.style.marginTop = "2rem"
    notesUI.style.width = "66.67%"; 
    notesUI.style.height = "4rem"; 
    notesUI.style.boxSizing = "border-box";
    notesUI.style.border = "2px solid rgb(10, 102, 194)";

    notesUI.style.overflow = "hidden";
    notesUI.style.overflowY = "scroll";
    notesUI.style.resize = "none";
    notesUI.style.scrollbarWidth = "none";
    notesUI.placeholder = "Enter your notes here :)"
}

export const removeNotesUI = () => {
    notesUI?.remove();
    notesUI = null;
}