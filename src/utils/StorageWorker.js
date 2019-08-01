export const getData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const saveData = (key, data, id) => {
  const modifyData = getData(key);
  switch (key) {
    case 'tags':
      const idToSave = newId(key);
      modifyData[idToSave] = data;
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
}

export const firstId = (key) => {
  const dataList = getData(key);
  return Object.keys(dataList)[0];
}

export const newId = (key) => {
  const dataList = getData(key);
  const ids = Object.keys(dataList);
  return +ids[ids.length - 1] + 1;
}

export const isExist = (id) => {
  const notesList = getData('notes');
  return id in notesList;
}