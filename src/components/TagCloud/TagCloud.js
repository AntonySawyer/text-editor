import React from 'react';

import Tag from '../Tag';
import './TagCloud.scss';

export default ({ tags, deleteData, saveData }) => {
  const TagsElements = [];
  Object.keys(tags).forEach(id => {
    TagsElements.push(<Tag key={id} title={tags[id]} deleteData={() => deleteData('tags', id) } />);
  });
  return (
    <div className="tag-cloud">
      <input type="text" id="newTadName" />
      <button className="btn btn-green" onClick={() => saveData('tags') }>Add</button>
      <div>
        {TagsElements}
      </div>
    </div>
  )
}