import React from 'react';

import Tag from '../Tag';

export default ({ tags, deleteData, saveData, filter }) => {

  const TagsElements = [];
  Object.keys(tags).forEach(id => {
    TagsElements.push(<Tag key={id} title={tags[id]} filter={() => filter(id)} 
                          deleteData={() => deleteData('tags', id) } />);
  });
  return (
    <div className="tag-cloud">
      <input type="text" id="newTadName" placeholder="Type new tag here..." />
      <button className="btn btn-green" onClick={() => saveData('tags')}>Add</button>
      <div>
        {TagsElements}
      </div>
    </div>
  )
}