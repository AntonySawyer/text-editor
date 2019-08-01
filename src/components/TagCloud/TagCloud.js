import React from 'react';

import Tag from '../Tag';
import './TagCloud.scss';

export default ({ tags, deleteData, saveData, addNew, filter }) => {
  const TagsElements = [];
  Object.keys(tags).forEach(id => {
    TagsElements.push(<Tag key={id} title={tags[id]} filter={() => filter(id)} 
                          deleteData={() => deleteData('tags', id) } />);
  });
  return (
    <div className="tag-cloud">
      {addNew && <input type="text" id="newTadName" /> }
      {addNew && <button className="btn btn-green" onClick={() => saveData('tags')}>Add</button> }
      <div>
        {TagsElements}
      </div>
    </div>
  )
}