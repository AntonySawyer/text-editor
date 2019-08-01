export const formatTag = () => {
  const input = document.getElementById('newTadName');
  const strToSave = input.value.trim().replace(/ /g, '_');
  input.value = '';
  return strToSave;
}

export const getNoteObj = (id) => {
  const title = document.getElementById('editNoteTitle').value;
  const text = document.getElementById('noteText').innerText;
  const tagsArr = [];
  document.querySelectorAll('#noteTags span').forEach(el => tagsArr.push(el.innerText));
  const tags = tagsArr.join(',');
  return {[id]: {id, title, text, tags}};
}

export const injectTags = (note, tags) => {
  tags.map(t => formatTag(t))
  note.tags = uniqueArr(tags).join(',');
  return {[note.id]: note};
}

export const uniqueArr = (arr) => {
  return [...new Set(arr)];
}