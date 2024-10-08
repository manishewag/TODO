/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Card from 'react-bootstrap/Card';
import { useParams } from "react-router-dom";


//  ************ Todo List *********


export default function App() {

  const [isCompleteScreen,setIsCompleteScreen] = useState(false);


  const [todos, setTodos] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");


  const [currentEdit, setCurrentEdit] = useState("");// handleEdit
  const [currentEditedItem,setCurrentEditedItem] = useState("");
 

  const handleAddTodo = () => {
    let newTodoItem = {
      name: name,
      description: description
    }

    let updateTodoArr = [...todos];
    updateTodoArr.push(newTodoItem);
    setTodos(updateTodoArr);
  };

  const handleDelete = (index) => {
    let deleteTodo = [...todos];
    deleteTodo.splice(index, 1);
    setTodos(deleteTodo);
  };

  const handleEdit = (index,e) => {
    setCurrentEdit(index);
    setCurrentEditedItem(e);
    
  };

  const handleEditName = (value) => {
    setCurrentEditedItem((prev)=>{
      return {...prev,name:value}
    })
  };

  const handleEditDescription = (value) => {
    setCurrentEditedItem((prev)=>{
      return {...prev,description:value}
    })
  };

  const handleEditStatus = (value) => {
    setCurrentEditedItem((prev)=>{
      return {...prev,status:value}
    })
  }

  const handleUpdateTodo = () => {
    let newTodo = [...todos];
    newTodo[currentEdit] = currentEditedItem;
    setTodos(newTodo);
    setCurrentEdit("");
  }


  return <>
          {/* className={`isCompleteScreen ${isCompleteScreen===false && 'active'}`}  */} 
    <header className="head">
      <h1>MY TODO </h1>
    </header> &nbsp;

    <div className='todo'>

      <div className='wrapper'>
        <div className='inputbox'>
          <input type='text' placeholder='Todo name' value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className='description'>
          <input type='text' placeholder='Todo description' value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div>
          <button type='button' className='primaryBtn' onClick={handleAddTodo}>Add Todo</button>
        </div>

      </div>

    </div> &nbsp;&nbsp;&nbsp;

    {/* className={`isCompleteScreen ${isCompleteScreen===false && 'active'}`}  onClick={()=>setIsCompleteScreen(false)} */}


    <div className='title'>
      <h4>My Todos</h4><br />
       <h4 className="dropdown" >Status Filter : &nbsp;
       <Dropdown>
      <Dropdown.Toggle variant="danger" id="dropdown-basic">
        All
        
      </Dropdown.Toggle>
      
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Completed</Dropdown.Item>
        <Dropdown.Item href="#/action-2" >Not Completed</Dropdown.Item>
        
      </Dropdown.Menu>
    </Dropdown>
      </h4>
    </div> 

    &nbsp;


    <div className="container" >
      {
        todos.map((e, index) => {

          if (currentEdit===index) {

            return (
              <div className='wrapper' key={index}>
                <div className='inputbox'>
                  <input type='text' placeholder='Todo name' value={currentEditedItem.name} onChange={(e) => handleEditName(e.target.value)} />
                </div>

                <div className='description'>
                  <input type='text' placeholder='Todo description' value={currentEditedItem.description} onChange={(e) => handleEditDescription(e.target.value)} />
                </div>

                <div className='description'>
                  <input type='text' placeholder='Todo status' value={currentEditedItem.status} onChange={(e) => handleEditStatus(e.target.value)} />
                </div>

                <div>
                  <button type='button' className='primaryBtn' onClick={handleUpdateTodo}> Update Todo</button>
                </div>

              </div>
            )

          // </div>

          }
          else
          {
          return <>

            <div className="Card" key={index}>
              <Card.Body>
                <div >&nbsp;
                  <h6>&nbsp;&nbsp;Name : {e.name}</h6>
                  <h6>&nbsp;&nbsp;Description : {e.description}</h6>
                  <h6>&nbsp; Status :  <Dropdown.Toggle className='toggle' variant='success'> Completed</Dropdown.Toggle> </h6>          
                </div>&nbsp;&nbsp;

                <div className='Btn'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <button type='button' className="Edit" onClick={()=> handleEdit(index,e)}>Edit</button>&nbsp; &nbsp;
                  <button type='button' className="Delete" onClick={() => handleDelete(index)}>Delete</button>
                  &nbsp;&nbsp;&nbsp;
                </div>
                &nbsp;
              </Card.Body>
            </div>

          </>
          }
        })

      }
    </div>

  </>

}



