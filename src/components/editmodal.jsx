import React from 'react';
import './editmodal.css'
const EditModal = ({ isOpen, onClose, task, onChange, onSave }) => {
  if (!isOpen) return null;
  

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Task</h2>
        <input 
          type="text" 
          value={task} 
          onChange={onChange} 
        />
        <button onClick={onSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditModal;
