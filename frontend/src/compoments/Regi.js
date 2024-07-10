import React, { useState } from "react";
import '../style/style.css';

function Regi() {

    const [name,setName] = useState('');
   // let name = 'Madushas'

    const onNameChange = (e)=>{
        console.log(e.target.value);
        setName(e.target.value);
        //name = e.target.value;
    }

    const onSubmitClick = ()=>{
        
    }

    return (
        <div className="b">

            <div className="form-container">
                <h1>Registraion Form</h1>
                <form>
                    <div>`Hello {name}`</div>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" required onChange={onNameChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Age:</label>
                        <input type="number" id="age" name="age" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gpa">GPA:</label>
                        <input type="text" id="gpa" name="gpa" required />
                    </div>
                    <div className="form-group">
                        <button type="submit" onClick={onSubmitClick}>Submit</button>
                    </div>
                </form>
            </div>
            
        </div>
    );
}



export default Regi;