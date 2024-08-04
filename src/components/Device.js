import React from 'react';

function Device(props) {
  return (
    <div className={`device ${props.class}`}>
      <strong>{props.title}</strong>
      <iframe className="file-preview" srcDoc={props.srcDoc} title="html Preview"></iframe>
    </div>
  )
}

export default Device;
