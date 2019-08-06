export const getData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const checkData = () => {
  const notes = getData('notes');
  if (notes === null || Object.keys(notes).length === 0) {
    localStorage.setItem('notes', JSON.stringify({ 1: { id: 1, title: 'Unnamed note №1', text: 'Click "edit" button!', tags: '' } }));
  }
  if (getData('tags') === null) {
    localStorage.setItem('tags', JSON.stringify({}));
  }
}

export const saveData = (key, data, id) => {
  const modifyData = getData(key);
  switch (key) {
    case 'tags':
      if (!Object.values(modifyData).includes(data)) {
        const idToSave = newId(key);
        modifyData[idToSave] = data;
      }
      break;
    case 'notes':
      modifyData[id] = data[id];
      break;
    default:
      break;
  }
  localStorage.setItem(key, JSON.stringify(modifyData));
}

export const deleteData = (key, id) => {
  const modifyData = getData(key);
  delete modifyData[id];
  localStorage.setItem(key, JSON.stringify(modifyData));
  checkData();
}

export const firstId = (key) => {
  const dataList = getData(key);
  return Object.keys(dataList)[0];
}

export const newId = (key) => {
  const dataList = getData(key);
  const ids = Object.keys(dataList);
  return ids.length === 0 ? 1 : +ids[ids.length - 1] + 1;
}

export const isExist = (id) => {
  const notes = getData('notes');
  return id in notes;
}

export const clearUnusedTags = () => {
  const notes = getData('notes');
  const tags = getData('tags');
  const tagsValues = Object.values(tags);
  const used = [];
  Object.keys(notes).forEach(id => notes[id].tags.split(',').forEach(tag => used.push(tag)));
  const unused = tagsValues.filter(tag => !used.includes(tag));
  Object.keys(tags).forEach(id => {
    if (unused.includes(tags[id])) {
      deleteData('tags', id);
    }
  })
}