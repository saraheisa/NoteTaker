(function () {

    class Note {
        constructor(id, title, content, dateCreated, isDeleted) {
            this.id = id;
            this.title = title;
            this.content = content;
            this.dateCreated = dateCreated;
            this.isDeleted = isDeleted;
        }
        setDeleted(isDeleted) {
            this.isDeleted = isDeleted;
        }
    }

    let noteId = 0;

    let addBtn = document.getElementById("addBtn");

    let noteModal = document.getElementById("noteModal");
    let closeSpan = document.getElementsByClassName("close")[0];

    let noteTitleTxt = document.getElementById("noteTitleTxt");
    let noteBodyTxt = document.getElementById("noteBodyTxt");
    let submitNoteBtn = document.getElementById("submitNoteBtn");

    let notesSection = document.getElementById("notes");
    let historySection = document.getElementById("history");
    let historyItems = document.getElementById("historyItems");
    let historyArrow = document.getElementById("arrow");


    let notesArr = [];

    function openModal() {

        noteTitleTxt.value = '';
        noteBodyTxt.value = '';
        noteModal.style.display = "block";
    }

    function closeModal() {
        noteModal.style.display = "none";
    }

    function getDataFromModal() {

        let id = noteId++;
        let title = noteTitleTxt.value;
        let content = noteBodyTxt.value;
        let dateCreated = new Date();
        let isDeleted = false;

        let note = new Note(id, title, content, dateCreated, isDeleted);

        addNoteToUI(note);

        closeModal();

        notesArr.push(note);

        addHistory(note);
    }

    function addNoteToUI(note) {

        let divElem = document.createElement("div");
        divElem.className = "note";

        let headerElem = document.createElement("header");

        let h4Elem = document.createElement("h4");
        h4Elem.className = "noteTitle";
        h4Elem.innerText = note.title;

        let iElem = document.createElement("i");
        iElem.className = "fas fa-times del";

        iElem.addEventListener("click", function (event) {
            let delId = event.target.nextSibling.innerText;
            event.target.parentNode.parentNode.style.display = "none";
            updateArray(delId);
        });

        let spanElem = document.createElement("span");
        spanElem.className = "hide";
        spanElem.innerText = note.id;

        let pElem = document.createElement("p");
        pElem.className = "noteBody";
        pElem.innerText = note.content;

        headerElem.appendChild(h4Elem);
        headerElem.appendChild(iElem);
        headerElem.appendChild(spanElem);

        divElem.appendChild(headerElem);
        divElem.appendChild(pElem);

        notesSection.appendChild(divElem);

    }

    function openHistory() {
        historyItems.style.display = 'block';
        historyArrow.style.transform = "rotate(180deg) scale(1) skew(1deg) translate(0px, 12px)";
    }

    function closeHistory() {
        historyItems.style.display = 'none';
        historyArrow.style.transform = "rotate(0deg)";
    }

    function formatDate(date) {
        let dd = date.getDate();
        let mm = date.getMonth() + 1; //January is 0!
        let yyyy = date.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        let today = mm + '/' + dd + '/' + yyyy;

        return today;
    }

    function addHistory(note) {

        let res = '';

        if (note.isDeleted) {
            res = 'restore';
        }

        let divElem = document.createElement("div");
        divElem.className = "item";

        let spanElem = document.createElement("span");
        spanElem.className = "hide";
        spanElem.innerText = note.id;

        let h4Elem = document.createElement("h4");
        h4Elem.innerText = note.title;

        let smallElem = document.createElement("small");
        smallElem.innerText = formatDate(note.dateCreated);

        let pElem = document.createElement("p");
        pElem.innerText = res;
        pElem.addEventListener("click", function (event) {
            let reId = event.target.nextSibling.innerText;
            restoreNote(reId);
        })

        divElem.appendChild(h4Elem);
        divElem.appendChild(smallElem);
        divElem.appendChild(pElem);
        divElem.appendChild(spanElem);

        historyItems.appendChild(divElem);
    }

    function updateArray(id) {

        notesArr.forEach(element => {
            if (element.id == id) {
                console.log(element.isDeleted);
                if (element.isDeleted) {
                    element.setDeleted(false);
                    addNoteToUI(element);
                } else {
                    element.setDeleted(true);
                }
            }
        });

        updateHistory();
    }

    function updateHistory() {

        while (historyItems.firstChild) {
            historyItems.removeChild(historyItems.firstChild);
        }

        notesArr.forEach(element => {
            addHistory(element);
        });
    }

    function restoreNote(id) {

        updateArray(id);

    }

    addBtn.addEventListener("click", openModal);

    closeSpan.addEventListener("click", closeModal);

    window.addEventListener("click", function (event) {
        if (event.target == noteModal) {
            closeModal();
        }
    });

    submitNoteBtn.addEventListener("click", getDataFromModal);

    historySection.addEventListener("click", function () {
        if (historyItems.style.display === 'none') {
            openHistory();
        } else {
            closeHistory();
        }
    });


})();
