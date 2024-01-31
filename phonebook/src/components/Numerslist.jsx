import React from "react";

const NumbersList = ({ persons, handleDeleteClick }) => {

 return(
 <ul>
    {persons.map((persons, index) => (
      <li key={persons.id}>{persons.name} {persons.number}  <button onClick={() => handleDeleteClick(index)}>Delete</button></li> 
    ))}
  </ul>
  );
}

  

export default NumbersList;