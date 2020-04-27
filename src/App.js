import React, { useState } from 'react';
import './App.css';

function App() {
  const [undoneTasks,setNewUndoneTask] = useState([]);  
  const [newTask,setNewTask] = useState("")
  const [doneTasks,setDoneTask] = useState([]);

  function completeTask(index){    
    setDoneTask(doneTasks.concat([undoneTasks[index]]).sort());
    var arrTemp = undoneTasks;
    arrTemp.splice(index,1);
    setNewUndoneTask(arrTemp); 
  };

  function markAsUndone(index){
    setNewUndoneTask(undoneTasks.concat([doneTasks[index]]).sort());
    var arrTemp = doneTasks;
    arrTemp.splice(index,1);
    setDoneTask(arrTemp);
  };

  function addTask(){
    if(newTask.replace(/\s/g, '').length)
    {
      //Ordena alfabeticamente
      setNewUndoneTask(undoneTasks.concat([newTask]).sort());      
    }
    else{
      window.console.log("agregar toast")
    }
    setNewTask("");
  };
  
  return (
    <div className = "body ">
      <div className="container">
        <row>

          <div className="col-12">
            <div className="card">
              <span className="text-center">
                <input id="newitem" type="text" value={newTask} onChange={e => setNewTask(e.target.value)} placeholder="Add a new Task"/> 
                <button className="btn btn-primary" type="submit" onClick={addTask}>
                  <i className="material-icons align-middle" aria-hidden="true"  >add_circle_outline</i>
                </button>              
              </span>
            </div>
          </div>

          <div className="col-12">
            <div className="card" id="todo">
              <h5 className="card-header text-center">My To-Do tasks</h5>
              <div className="card-body">
                {undoneTasks.map(
                    (task,index) => (
                      <div className="form-check">
                        <i className="check material-icons align-middle" onClick={()=> {completeTask(index);}}> check_box_outline_blank </i>
                        <label className="form-check-label" for="defaultCheck1">
                          {task}
                        </label>
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
              {doneTasks.map(
                    (task,index) => (
                      <div className="form-check">
                        <i className="check material-icons align-middle" onClick={()=> {markAsUndone(index)}}> check_box </i>
                        <label className="form-check-label done" for="defaultCheck1">
                          {task}
                        </label>
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
