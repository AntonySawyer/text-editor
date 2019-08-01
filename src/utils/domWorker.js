export function editStart() {
  const noteText = document.querySelector('.textArea');
  noteText.setAttribute('contentEditable', true);
  noteText.classList.add('editNoteText');
  focusAtEnd(noteText);
  document.getElementById('editBtn').classList.add('hidden');
  document.getElementById('saveBtn').classList.remove('hidden');
  document.querySelector('.notes-viewer > h1').style = "display: none";
  document.getElementById('editNoteTitle').classList.remove('hidden');
}

export function editEnd() {
  const noteText = document.querySelector('.textArea');
  noteText.setAttribute('contentEditable', false);
  noteText.classList.remove('editNoteText');
  document.getElementById('editBtn').classList.remove('hidden');
  document.getElementById('saveBtn').classList.add('hidden');
  document.querySelector('.notes-viewer > h1').style = {};
  document.getElementById('editNoteTitle').classList.add('hidden');
  document.getElementById('newNoteTitle').value = '';
}

export function clearAllInputs() {
  document.querySelector('.textArea').innerHTML = '';
  document.getElementById('editNoteTitle').value = '';
}

export function focusAtEnd(el) {
  el.focus();
  if (typeof window.getSelection != "undefined" &&
    typeof document.createRange != "undefined"
  ) {
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  } else if (typeof document.body.createTextRange != "undefined") {
    const textRange = document.body.createTextRange();
    textRange.moveToElementText(el);
    textRange.collapse(false);
    textRange.select();
  }
}