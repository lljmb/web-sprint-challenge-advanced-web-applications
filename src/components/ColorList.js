import React, { useState } from "react";
import axios from "axios";
import EditMenu from './EditMenu';
import { useParams, useHistory } from "react-router-dom";
import { axiosWithAuth } from '../helpers/axiosWithAuth'

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  // add in useParams to grab id
  const { id } = useParams();
  const { push } = useHistory();

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  // 1. Complete the saveEdit functions by making a put request for saving colors. (Think about where will you get the id from...)
  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
    .put(`/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
      updateColors(colors.map(color => {
        if (color.id === colorToEdit.id){
          return colorToEdit;
        } else {
          return color;
        }
      }))
    })
    .catch(err => {
      console.log('error editing color: ', err)
    })
  };

  // 2. Complete the deleteColor functions by making a delete request for deleting colors.
  const deleteColor = color => {
    axiosWithAuth()
    .delete(`http://localhost:5000/api/colors/${color.id}`)
    .then(res => {
    updateColors(colors.filter(deletedColor  => {
      return deletedColor.id !== color.id;
    }));
    })
    .catch(err =>{
    console.log('error deleting color: ', err);
    })
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      { editing && <EditMenu colorToEdit={colorToEdit} saveEdit={saveEdit} setColorToEdit={setColorToEdit} setEditing={setEditing}/> }

    </div>
  );
};

export default ColorList;

//Task List:

