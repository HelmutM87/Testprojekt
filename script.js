let titles = []
let notes = []
let trashTitles = []
let trashNotes = []
loadNoteSheets();
loadTrashSheets();


function renderNotePad() { //rendert bzw zeigt die Startseite des Notizblocks mit Eingabefeld an
    let content = document.getElementById('content');
    content.innerHTML = '';
    content.innerHTML += generateNoticeInput();

    for (let i = 0; i < titles.length; i++) { //holt die Werte aus dem array im Local Storage und rendert sie als HTML
        const title = titles[i];
        const note = notes[i];
        content.innerHTML += generateNoticeOutput(title, note, i);
    }
}


function generateNoticeInput() {
    return `<div class="navBar"><img class="img" onclick="renderNotePad()" src="./icon/android-chrome-192x192.png" alt="Glühbirne">
    <img class="img" onclick="renderTrash()"  src="./icon/papierkorb.png" alt="Papierkorb"></div><div class="input_container"><div class="noticeInputSheet">
    <input class="inputTitle" id="title" type="text" placeholder="Titel">
    <textarea class="inputArea" id="note" type="text" placeholder="Notiz schreiben..."></textarea>
    <div class="saveButtonContainer"><button class="saveButton" onclick="addNotes()">Speichern</button></div>
    </div></div>`;
}


function generateNoticeOutput(title, note, i) {
    return `<div class="noticeOutputSheet">
              <b id="sheetTitle">${title}</b><br>
              <span id="sheetNote">${note}</span><br>
              <img onclick="addToTrash(${i})" class="trashIcon" src="./icon/papierkorb.png">
            </div>`;
}


function addNotes() { //Diese Funktion pusht die Werte aus den Eingabefeldern ins array
    if (title.value === '' || note.value === '') {
        openDialog();
    } else {

        let title = document.getElementById('title');
        let note = document.getElementById('note');

        titles.push(title.value);
        notes.push(note.value);

        renderNotePad();
        saveNotesinLocalStorage();
    }
}


function saveNotesinLocalStorage() { //Diese Funktion wandelt Notizen aus arrays in Text und speichert sie in local Storage
    let titlesAsText = JSON.stringify(titles);
    let notesAsText = JSON.stringify(notes);

    localStorage.setItem('titles', titlesAsText);
    localStorage.setItem('notes', notesAsText);
}


function saveTrashesinLocalStorage() {
    let trashTitlesAsText = JSON.stringify(trashTitles);
    let trashNotesAsText = JSON.stringify(trashNotes);

    localStorage.setItem('trashTitles', trashTitlesAsText);
    localStorage.setItem('trashNotes', trashNotesAsText);
}


function loadNoteSheets() {//Diese Funktion lädt die Werte aus dem array und zeigt sie in den Sheets((title != '' || note != '' )||(title != '' && note != '' ))((title != '' || note != '' )||(title != '' && note != '' )) an
    let titlesAsText = localStorage.getItem('titles');
    let notesAsText = localStorage.getItem('notes');
    if (titlesAsText && notesAsText) {
        titles = JSON.parse(titlesAsText);
        notes = JSON.parse(notesAsText);
    }
}


function openDialog() {//Diese Funktion öffnet den Dialog, wenn man versucht, ein Notizblatt hinzuzufügen, ohne eine Eingabe
    document.getElementById('dialog').classList.remove('d-none');
}


function closeDialog() {//Diese Funktion schliesst das Dialogfenster wieder, wenn man einfach auf die graue Fläche klickt
    document.getElementById('dialog').classList.add('d-none');
}


function addToTrash(i) {//Diese Funktion übergibt ein Notizblatt an das Papierkorb array
    const title = titles[i];
    const note = notes[i];


    trashTitles.push(title);
    trashNotes.push(note);

    removeNotes(i);
    saveTrashesinLocalStorage();
}


function removeNotes(i) { //Diese Funktion löscht ein Notizblatt aus dem Notizen array
    titles.splice(i, 1);
    notes.splice(i, 1);
    renderNotePad();
    saveNotesinLocalStorage();
}


function loadTrashSheets() {
    let trashTitlesAsText = localStorage.getItem('trashTitles');
    let trashNotesAsText = localStorage.getItem('trashNotes');
    if (trashTitlesAsText && trashNotesAsText) {
        trashTitles = JSON.parse(trashTitlesAsText);
        trashNotes = JSON.parse(trashNotesAsText);
    }
}


function renderTrash() {//rendert bzw zeigt den Papierkorb des Notizblocks an
    let content = document.getElementById('content');
    content.innerHTML = '';
    content.innerHTML += generateTrashNavBar();

    for (let i = 0; i < trashTitles.length; i++) {//holt die Werte aus dem array im Local Storage und rendert die als HTML
        const title = trashTitles[i];
        const note = trashNotes[i];

        content.innerHTML += generateTrashOutputSheet(title, note, i);
    }
}


function generateTrashNavBar() {
    return `<div class="navBar"><img class="img" onclick="renderNotePad()" src="./icon/android-chrome-192x192.png" alt="Glühbirne">
<img class="img" onclick="renderTrash()"  src="./icon/papierkorb.png" alt="Papierkorb"></div>`;
}


function generateTrashOutputSheet(title, note, i) {
    return `<div class="noticeOutputSheetTrash">
  <b>${title}</b><br>
  <span>${note}</span><br>
  <div class="trash_recycle_container">
  <img onclick="deleteNotes(${i})" class="trashIcon" src="./icon/papierkorb.png">
  <img onclick="recycleSheet(${i})" class="trashIcon" src="./icon/recycle.png">
  </div>
</div>`;
}


function deleteNotes(i) { //Diese Funktion löscht ein Notizblatt endgültig aus dem Papierkorb
    trashTitles.splice(i, 1);
    trashNotes.splice(i, 1);
    renderTrash();
    saveTrashesinLocalStorage();
}


function recycleSheet(i) {//"pusht" die notizblätter wieder in die title/note arrays
    const title = trashTitles[i];
    const note = trashNotes[i];

    titles.push(title);
    notes.push(note);

    trashTitles.splice(i, 1);
    trashNotes.splice(i, 1);

    renderTrash();
    saveTrashesinLocalStorage();
    saveNotesinLocalStorage();
}