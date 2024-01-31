import React from "react"; 

const AddPersonForm = ({ onSubmit, onNameChange, onPhoneChange, newName, newPhone }) => (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={onNameChange} required/>
      </div>
      <div>
        number: <input value={newPhone} onChange={onPhoneChange} type="number" required/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );

  export default AddPersonForm;