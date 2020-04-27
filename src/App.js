import React from 'react';
import './App.css';

function App() {
  return (
    <div className = "body ">
      <div class="container">
        <row>
          <div class="col-12">
            <div className="card" id="todo">
              <h5 className="card-header text-center">My To-Do tasks</h5>
              <div className="card-body">
                <h5 className="card-title">Special title treatment</h5>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div className="card" id="done">
              <h5 className="card-header text-center">Done tasks</h5>
              <div className="card-body">
                <h5 className="card-title">Special title treatment</h5>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              </div>
            </div>
          </div>
        </row>  
      </div>    
    </div>


        
  );
}

export default App;
