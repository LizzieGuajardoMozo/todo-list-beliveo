import React, { useState, useEffect } from 'react';
import './App.css';
import catIcon from './cat.svg';


function App() {
  /**
   * Exercise SDev
   * Company: Beliveo
   * Candidate: Lizzie Marielle Guajardo Mozo
   * 27 April 2020
   
   * Acceptance Criterias:
    •	Having started the application, I want to see two clearly divided sections: to do and done list, and an area to create a new task. 
    •	Having started the application, when I see the list of tasks, if there's no task, I want to see a clear affordance telling me that the list is empty.
    •	Having started the application, when I see the list of tasks, it should be organized in this fashion: On the top, the to-do tasks and on the bottom, the done tasks.
    •	Having started the application and loaded a list of tasks divided on To-do and Done sub-lists, I want each sub-list to be ordered alphabetically.
    •	Having started the application and loaded a list of tasks and having at least one to-do item on the list, I want it to have a CTA for each to-do item to mark it as done.
    •	Having started the application and loaded a list of tasks and having at least one to-do item on the list, when I click on the CTA of any to-do task, I want to see how the tasks moves from the to-do to the done list.
    •	Having started the application, when I fill up the form to create a new task and "save" the new task, I want to see how this new task is added on the list of to-do tasks.
    •	Having started the application, when I fill up the form to create a new task and "save" the new task, I want the form to be cleaned up.
    •	Having started the application, when I hit the refresh (F5) button, I want the lists of to-do and done tasks to be kept in memory.
    Definition of Done:
    •	Application built on a Git repo.
    •	Application created using the last stable react version.
    •	Application should use react hooks to manage the state.
    •	Code properly formatted in order to improve its readability.
    •	Application state saved on local storage.
    •	Use of Bootstrap components for the visual appearance.
   */

  document.title = "To Do List";

  //Variables that store in Local Storage the task in the "To Do" list and in the "Done" list respectivelly
  var  loadedUndone = localStorage.getItem("todo")  
  var  loadedDone = localStorage.getItem("done")

  //If localStorage is Empty, initialize the variables as empty array, if not, copy the content of local storage
  if(!loadedUndone){
      loadedUndone = []
  }
  else{
    loadedUndone = loadedUndone.split(",");
  }
  if(!loadedDone){
    loadedDone = []
  }
  else{
    loadedDone = loadedDone.split(",");
  }

  //Hook to saveInLocalStorage
  useEffect(()=> {
    saveInLocalStorage();
  })

  ////States Definition
  //unDoneTasks stores an array of task that appear at the "To Do" Section
  const [undoneTasks,setNewUndoneTask] = useState(loadedUndone);  
  //newTask stores the string present at the input "Add New Task"
  const [newTask,setNewTask] = useState("");
  //doneTasks stores an array of tasks that appear at the "Done" Section
  const [doneTasks,setDoneTask] = useState(loadedDone);

  //Function stores "ToDo" tasks and "Done" tasks in localStorage in order to retrieve them when refreshing the page
  function saveInLocalStorage(){
    localStorage.setItem("todo",undoneTasks);
    localStorage.setItem("done",doneTasks);
  }

  //Function that deletes a task from the "Done" Section, receives an index with the position of the task to delete
  function deleteDone(index){
    //Confirmation prompt
    if(window.confirm("Are you sure you want to delete this task? '"+doneTasks[index] +"'. This action cannot be reversed"))
    {
      //Temporal array that copies currently in "Done" section
      var arrTemp = doneTasks;
      arrTemp.splice(index,1);
      //rewrites doneTasks without the deleted item
      setDoneTask(arrTemp); 
      //Adds a blank space to input bar for new Task because a change is needed in order for the delete to appear
      setNewTask(newTask+" ");
    }    
  }

  //Function that deletes a task from the "ToDo" Section, receives an index with the position of the task to delete  
  function deleteUndone(index){
    if(window.confirm("Are you sure you want to delete this task? '"+undoneTasks[index] +"'. This action cannot be reversed"))
    {
      //Temporal array that copies currently in "ToDo" section
      var arrTemp = undoneTasks;
      arrTemp.splice(index,1);
      //rewrites undoneTasks without the deleted item
      setNewUndoneTask(arrTemp);
      //Adds a blank space to input bar for new Task because a change is needed in order for the delete to appear
      setNewTask(newTask+" ");
    }
  }

  //Function that is called when a task in checked in the "To Do" Section, making it go to "Done" Section, receives index of task to move 
  function completeTask(index){    
    //Adds element to the "done" section and sorts the array alphabetically
    setDoneTask(doneTasks.concat([undoneTasks[index]]).sort());
    //Temporal array that copies currently in "ToDo" section
    var arrTemp = undoneTasks;
    arrTemp.splice(index,1);
    //Replaces list of undone tasks without the element that was moved
    setNewUndoneTask(arrTemp); 
    //Updates local storage
    saveInLocalStorage();
  };

  //Function that is called when a task in unchecked in the "Done" Section, making it go to "ToDo" Section, receives index of task to move 
  function markAsUndone(index){
    //Adds element to the "todo" section and sorts the array alphabetically
    setNewUndoneTask(undoneTasks.concat([doneTasks[index]]).sort());
    //Temporal array that copies currently in "done" section
    var arrTemp = doneTasks;
    arrTemp.splice(index,1);
    //Replaces list of done tasks without the element that was moved
    setDoneTask(arrTemp);
    //Updates local storage
    saveInLocalStorage();
  };

  //Functions that adds new task to "ToDo" section
  function addTask(){
    //if the task wirtten at input bar is not empty 
    if(newTask.replace(/\s/g, '').length)
    {
      //Concat element to undoneTasks, order alphabetically and remove white spaces from the beggining if they exist
      setNewUndoneTask(undoneTasks.concat([newTask.replace(/^\s+/g, '')]).sort());      
      //Update local storage
      saveInLocalStorage();
    }
    else{
      alert("New Task cannot be empty space")
    }
    //Empty input bar
    setNewTask("");
    
  };
  
  return (    
    <div className = "body ">
      <div className="container">
        <row>
          {/* Input bar to add new task */}
          <div className="col-12">
            <div className="card" id="new">   
              <div className="input-group text-center">
                <input id="newitem" type="text" className="form-control" value={newTask} onChange={e => setNewTask(e.target.value)} placeholder="Add a new Task" onKeyPress={event => {if(event.key == "Enter"){addTask()}}}/>
                <div className="input-group-append">
                  <button className="btn btn-primary" type="submit" onClick={addTask}>
                    <i className="material-icons align-middle" aria-hidden="true" >add_circle_outline</i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* To-Do Section */}
          <div className="col-12">
            <div className="card" id="todo">
              <h5 className="card-header text-center">To-Do tasks</h5>
              <div className="card-body">                
                {/* If there are no tasks to show, show message */
                undoneTasks.length===0 ? 
                <div text-center>
                  <h4 className="text-center">You Have no Tasks Left!</h4>
                  <p className="text-center">Play a videogame, take a nap or add a new task</p>
                  <div className="text-center">
                    <img src={catIcon}  className="asset text-center"/>
                  </div>
                </div>
                :/* If there are are tasks, display each one */          
                undoneTasks.map(
                    (task,index) => (
                      <div className="input-group">
                        {/* Check Box icon */}
                        <div className="task-row">
                          <div className="input-group-append">
                            <i className="check material-icons align-middle icon-blue" onClick={()=> {completeTask(index)}}> check_box_outline_blank </i>
                          </div>
                        </div>
                        {/* Task Text */}
                        <div className="col-10 task-row">
                          <label className="form-check-label">
                            {task}
                          </label> 
                        </div>
                        {/* Trash icon to delete */}
                        <div className="input-group-append">
                          <i className="trash material-icons align-middle" onClick={()=> {deleteUndone(index)}}> delete </i>
                        </div>
                      </div>                      
                    )
                  )
                }               
              </div>
            </div>
          </div>
          
           {/* Done Section */}
          <div className="col-12">
            <div className="card" id="done">
              <h5 className="card-header text-center">Done tasks</h5>
              <div className="card-body">
              {/* If there are no tasks to show, show message */
              doneTasks.length===0 ? 
                <div text-center>
                  <h4 className="text-center">You Haven't completed any task</h4>
                  <p className="text-center">Not very impressive</p>
                </div>
                : /* If there are tasks, display each one */          
                doneTasks.map(
                      (task,index) => (
                        <div className="input-group">
                           {/* Check Box icon */}
                          <div className="task-row">
                            <div className="input-group-append">
                              <i className="check material-icons align-middle icon-blue" onClick={()=> {markAsUndone(index)}}> check_box </i>
                            </div>
                          </div>
                          {/* Task Text */}
                          <div className=" col-10 task-row">
                            <label className="form-check-label done">
                              {task}
                            </label> 
                          </div>  
                          {/* Trash icon to delete */}
                          <div className="input-group-append">
                            <i className="trash material-icons align-middle" onClick={()=> {deleteDone(index)}}> delete </i>
                          </div>
                        </div>     
                      )
                    )
                }                     
              </div>
            </div>
          </div>

        </row>  
      </div>    
    </div>


        
  );
}

export default App;
