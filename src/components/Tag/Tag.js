import React from 'react';
import './Tag.scss';

export default ({ title, deleteData, filter }) => {
  return (
    <div className="tag-wrapper">
      <span onClick={ filter }>{ title }</span>
      <button className="btn btn-red" onClick={ deleteData }>del</button>
    </div>
  )
}