import React, { useState, useEffect } from 'react';
import './App.css';
import catIcon from './cat.svg';


function App() {

  document.title = "To Do List";

  var  loadedUndone = localStorage.getItem("todo")  
  var  loadedDone = localStorage.getItem("done")

  if(!loadedUndone){
      loadedUndone = []
  }
  else
  {
    loadedUndone = loadedUndone.split(",");
  }

  if(!loadedDone){
    loadedDone = []
  }
  else
  {
    loadedDone = loadedDone.split(",");
  }

  useEffect(()=> {
    saveInLocalStorage();
  })


  const [undoneTasks,setNewUndoneTask] = useState(loadedUndone);  
  const [newTask,setNewTask] = useState("");
  const [doneTasks,setDoneTask] = useState(loadedDone);



  function saveInLocalStorage(){
    localStorage.setItem("todo",undoneTasks);
    localStorage.setItem("done",doneTasks);
  }

  function deleteDone(index){
    if(window.confirm("Are you sure you want to delete this task? '"+doneTasks[index] +"'. This action cannot be reversed"))
    {
      var arrTemp = doneTasks;
      arrTemp.splice(index,1);
      setDoneTask(arrTemp); 
      setNewUndoneTask(undoneTasks);
      setNewTask(newTask+" ");
    }    
  }

  function deleteUndone(index){
    if(window.confirm("Are you sure you want to delete this task? '"+undoneTasks[index] +"'. This action cannot be reversed"))
    {
      var arrTemp = undoneTasks;
      arrTemp.splice(index,1);
      setNewUndoneTask(arrTemp);
      setDoneTask(doneTasks);
      setNewTask(newTask+" ");
    }
  }

  function completeTask(index){    
    setDoneTask(doneTasks.concat([undoneTasks[index]]).sort());
    var arrTemp = undoneTasks;
    arrTemp.splice(index,1);
    setNewUndoneTask(arrTemp); 
    saveInLocalStorage();
  };

  function markAsUndone(index){
    setNewUndoneTask(undoneTasks.concat([doneTasks[index]]).sort());
    var arrTemp = doneTasks;
    arrTemp.splice(index,1);
    setDoneTask(arrTemp);
    saveInLocalStorage();
  };

  function addTask(){
    if(newTask.replace(/\s/g, '').length)
    {
      //Ordena alfabeticamente
      setNewUndoneTask(undoneTasks.concat([newTask.replace(/^\s+/g, '')]).sort());      
      saveInLocalStorage();
    }
    else{
      alert("New Task cannot be empty space")
    }
    setNewTask("");
    
  };
  
  return (    
    <div className = "body ">
      <div className="container">
        <row> 
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

          <div className="col-12">
            <div className="card" id="todo">
              <h5 className="card-header text-center">To-Do tasks</h5>
              <div className="card-body">
                {undoneTasks.length===0 ? 
                <div text-center>
                  <h4 className="text-center">You Have no Tasks Left!</h4>
                  <p className="text-center">Play a videogame, take a nap or add a new task</p>
                  <div className="text-center">
                    <img src={catIcon} alt="consider taking a nap" className="asset text-center"/>
                  </div>
                </div>
                :                
                undoneTasks.map(
                    (task,index) => (
                      <div className="input-group">
                        <div className="task-row">
                          <div className="input-group-append">
                            <i className="check material-icons align-middle icon-blue" onClick={()=> {completeTask(index)}}> check_box_outline_blank </i>
                          </div>
                        </div>
                        <div className="col-10 task-row">
                          <label className="form-check-label">
                            {task}
                          </label> 
                        </div>
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
          
          <div className="col-12">
            <div className="card" id="done">
              <h5 className="card-header text-center">Done tasks</h5>
              <div className="card-body">
              {doneTasks.length===0 ? 
                <div text-center>
                  <h4 className="text-center">You Haven't completed any task</h4>
                  <p className="text-center">Not very impressive</p>
                </div>
                :                
                doneTasks.map(
                      (task,index) => (
                        <div className="input-group">
                          <div className="task-row">
                            <div className="input-group-append">
                              <i className="check material-icons align-middle icon-blue" onClick={()=> {markAsUndone(index)}}> check_box </i>
                            </div>
                          </div>
                          <div className=" col-10 task-row">
                            <label className="form-check-label done">
                              {task}
                            </label> 
                          </div>  
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
