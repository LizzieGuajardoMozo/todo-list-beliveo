import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

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
      setNewUndoneTask(undoneTasks.concat([newTask]).sort());      
      saveInLocalStorage();
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
            <div className="card" id="new">   
                <div className="input-group text-center">
                  <input id="newitem" type="text" class="form-control" value={newTask} onChange={e => setNewTask(e.target.value)} placeholder="Add a new Task" onKeyPress={event => {if(event.key == "Enter"){addTask()}}}/>
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
              <h5 className="card-header text-center">My To-Do tasks</h5>
              <div className="card-body">
                {undoneTasks.map(
                    (task,index) => (
                      <div class="input-group">
                        <div className="task-row">
                          <div class="input-group-prepend">
                            <i className="check material-icons icon-blue" onClick={()=> {completeTask(index);}}> check_box_outline_blank </i>
                          </div>
                        </div>
                        <div className="col-10 task-row">
                          <label className="form-check-label">
                            {task}
                          </label> 
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
              {doneTasks.map(
                    (task,index) => (
                      <div class="input-group">
                        <div className="task-row">
                          <div class="input-group-prepend">
                          <i className="check material-icons align-middle icon-blue" onClick={()=> {markAsUndone(index)}}> check_box </i></div>
                        </div>
                        <div className="col-10 task-row">
                          <label className="form-check-label done">
                            {task}
                          </label> 
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
