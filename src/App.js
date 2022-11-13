import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { randomColor } from "randomcolor";
import Draggable from "react-draggable";
import { FiEdit3, FiDelete } from 'react-icons/fi'
import "./App.css";

function App() {
  const [title, setItem] = useState("");
  const [edit, setEdit] = useState(false);
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const handleSubmit = (e) => {
    // adding an item
    e.preventDefault();

    if (title.trim().length !== 0) {
      const newTask = {
        title: title,
        id: uuidv4(),
        color: randomColor({
          luminosity: "light",
        }),
        defaultPos: {
          x: Math.random() * (200 - 100) + 100,
          y: Math.random() * (-200 - 100) + 100
        },
      };

      setItems([...items, newTask]);
      setItem("");
    } else {
      alert("Please enter a task");
    }
  };

  const onDeleteHandler = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const onEditHandler = (id, item) => {
    setEdit(!edit);
    console.log(id);
  }

  const onStopHandler = (data, index) => {
    let updatedItems = [...items];
    updatedItems[index].defaultPos = {x: data.x, y: data.y};
    setItems(updatedItems);
  }

  return (
    <div>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Enter a task..."
            type="text"
            value={title}
            onChange={(e) => setItem(e.target.value)}
          />
          <button
            className="onSubmitBtn"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            ENTER
          </button>
        </form>
        {items.map((item, index) => (
          <Draggable 
          defaultPosition={item.defaultPos} 
          key={index}
          onStop={(_, data) => {
            onStopHandler(data, index);
          }}
          >
            <div className="todo" style={{ backgroundColor: item.color }}>
              {edit && (
                <div></div>
              )}
              {!edit && (
                <h1 className="todo__title">{item.title}</h1>
              )}
              <div className="right-side">
                <FiEdit3 className="editBtn" color="black" onClick={() => onEditHandler(item.id, item)}/>
                <FiDelete className="deleteBtn" color="black" onClick={() => onDeleteHandler(item.id)}/>
              </div>
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  );
}

export default App;
