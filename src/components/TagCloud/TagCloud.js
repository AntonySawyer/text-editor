import React from 'react';

import Tag from '../Tag';
import './TagCloud.scss';

export default ({ tags }) => {
  const TagsElements = [];
  Object.keys(tags).forEach(id => {
    TagsElements.push(<Tag key={id} title={tags[id]} />);
  });
  return (
    <div className="tag-cloud">
      <input type="text" />
      <button className="btn btn-green">Add</button>
      <div>
        {TagsElements}
      </div>
    </div>
  )
}