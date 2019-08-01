import React from 'react';
import './Tag.scss';

export default ({ title, deleteData }) => {
  return (
    <div className="tag-wrapper">
      <span>{ title }</span>
      <button className="btn btn-red" onClick={ deleteData }>del</button>
    </div>
  )
}