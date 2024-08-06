import React, { useState } from "react";
import '../style/Comman css/style.css';
import axios from "axios";

function Regi() {

    const [name, setname] = useState("");
    const [age, setage] = useState("");
    const [gender, setgender] = useState("");

    function sendData(e) {
        e.preventDefault();

        const newStudent = {
            name,
            age,
            gender
        }
        axios.post("http://localhost:8070/student/add", newStudent).then(() => {
            alert("Student Add $$")
            setname("");
            setage("");
            setgender("");

        }).catch((err) => {
            alert("Student not add!!");
        })
    }

    return (
        <div className="b">

            <div className="form-container">
                <h1>Registraion Form</h1>
                <form onSubmit={sendData}>
                    <div>YOUR NAME: {name}</div>
                    <div>AGE: {age}</div>
                    <div>GPA: {gender}</div>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" required onChange={(e) => {
                            setname(e.target.value);
                        }} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Age:</label>
                        <input type="number" id="age" name="age" required onChange={(e) => {
                            setage(e.target.value);
                        }} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gpa">GPA:</label>
                        <input type="text" id="gender" name="gender" required onChange={(e) => {
                            setgender(e.target.value);
                        }} />
                    </div>
                    <div className="form-group">
                        <button type="submit" >Submit</button>
                    </div>
                </form>
            </div>

        </div>
    );
}



export default Regi;