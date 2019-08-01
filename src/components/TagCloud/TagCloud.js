import React from 'react';

import Tag from '../Tag';

export default ({ tags, deleteData, saveData, addNew, filter }) => {
  const TagsElements = [];
  Object.keys(tags).forEach(id => {
    TagsElements.push(<Tag key={id} title={tags[id]} filter={() => filter(id)} 
                          deleteData={() => deleteData('tags', id) } />);
  });
  return (
    <div className="tag-cloud">
      {addNew && <input type="text" id="newTadName" placeholder="Type new tag here..." /> }
      {addNew && <button className="btn btn-green" onClick={() => saveData('tags')}>Add</button> }
      <div>
        {TagsElements}
      </div>
    </div>
  )
}