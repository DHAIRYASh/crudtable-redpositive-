import logo from './logo.svg';
import './App.css';
import {Table,Button, Container,Row,Col,Image} from 'react-bootstrap'
import React, { useEffect,useState } from 'react'
import axios from "axios"
import {Modal,Form} from "react-bootstrap"

import {Table as Table1} from 'easy-table';



function App() {
  const [data, setData] = useState([])
  const [addForm, setaddForm] = useState(false)

  useEffect(  ()=>{
      getData()
  },[])

  const postData=async ()=>{
const res= {}

res.name=name
res.phoneNumber=phoneNumber
res.email=email
res.hobbies=hobbies
if (isEdit) {
  const {details}=await axios.put(`/api/users/update/${updateId}`, res)

}
else{
const {details}=await axios.post("/api/users", res)
}
handleAddFormClose()

  }
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [hobbies, setHobbies] = useState('')
  const handleAddFormClose= () => setaddForm(false);
  const handleAddFormShow= () => setaddForm(true);
  const getData = async ()=>{
    const result = await axios.get("/api/users")
  setData(result.data)
  }

  const [sendData, setSendData] = useState([])
  const [url, setUrl] = useState('')
  
  const deleteData=async(id)=>{
    const remove = await axios.get(`/api/users/delete/${id}`)
    window.location.reload()
  }
  const sendingData=()=>{
    console.log(sendData)
    var Table1 = require('easy-table')
    var t = new Table1
    sendData.map(p=>{
        t.cell('Name',p.name)
        t.cell('Phone Number',p.phoneNumber)
        t.cell('Email',p.email)
        t.cell('Hobbies',p.hobbies)
        t.newRow()
    })
    
   
    // var pu = 'Name      PhoneNumber     Email     Hobbies%0D%0A'
    // sendData.map(p=>{

    //   pu+=`${p.name}    ${p.phoneNumber}    ${p.email}    ${p.hobbies}%0D%0A`


    // })
    window.location.href=`mailto:info@redpositive.in?subject=Testing&body=${t.toString().replaceAll('\n','%0D%0A')}`
   
  }
  const [isEdit, setIsEdit]= useState(false)
  const [updateId, setUpdateId]= useState(false)
  const handleEditFormClose= () => setaddForm(false);
  const handleEditFormShow= (data) => {
    setUpdateId(data._id)
    setName(data.name)
    setPhoneNumber(data.phoneNumber)
    setEmail(data.email)
    setHobbies(data.hobbies)
    setIsEdit(true)
    setaddForm(true);}
  
    function sortTable(n) {
      var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
      table = document.getElementById("form");
      switching = true;
      // Set the sorting direction to ascending:
      dir = "asc";
      /* Make a loop that will continue until
      no switching has been done: */
      while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 1; i < (rows.length - 1); i++) {
          // Start by saying there should be no switching:
          shouldSwitch = false;
          /* Get the two elements you want to compare,
          one from current row and one from the next: */
          x = rows[i].getElementsByTagName("TD")[n];
          y = rows[i + 1].getElementsByTagName("TD")[n];
          /* Check if the two rows should switch place,
          based on the direction, asc or desc: */
          if (dir == "asc") {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              // If so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          } else if (dir == "desc") {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              // If so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          }
        }
        if (shouldSwitch) {
          /* If a switch has been marked, make the switch
          and mark that a switch has been done: */
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          // Each time a switch is done, increase this count by 1:
          switchcount ++;
        } else {
          /* If no switching has been done AND the direction is "asc",
          set the direction to "desc" and run the while loop again. */
          if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
          }
        }
      }
    }

  return (
    <div className="App">
       

       <div class="header">
  <a href="/" class="logo">CRUD TABLE</a>
  <div class="header-right">
<  Button onClick={handleAddFormShow}  >ADD</Button>
<span>    </span>
<Button onClick={()=>sendingData()}  >SEND</Button>

    
   
  </div>
  </div>
   


    
    <Table  className=' table-striped '    id='form' >
                <tr id='table-tr'>
                  <th></th>
                    <th onClick={()=>sortTable(1)}>ID </th>
                    <th onClick={()=>sortTable(2)}>Name</th>
                    <th onClick={()=>sortTable(3)}>Phone Number </th>
                    <th onClick={()=>sortTable(4)}>Email</th>
                    <th onClick={()=>sortTable(5)}>Hobbies</th>
                    
                </tr>
          <tbody>
         {data.map((d,i)=>(
            <tr>
              <td>
              <input type="checkbox" onChange={(e)=>{
                if (e.target.checked){
                  var arr=sendData
                  arr.push(d)
                  setSendData(arr)
                  console.log(JSON.stringify(sendData))
                }
              }}></input>
              </td>
              <td> {i+1}</td>
              <td>
            {d.name}
              </td>
              <td>
            {d.phoneNumber}
              </td>
              <td>
            {d.email}
              </td>
              <td>
            {d.hobbies}
              </td>
              <td>

              <Button onClick={()=>handleEditFormShow(d)} variant='light' className='btn-sm'>
                 <i className='fas fa-edit'></i>
              </Button>

              <Button varient='danger' className='btn-sm' onClick={()=>deleteData(d._id)} >
              <i className='fas fa-trash '></i>
              </Button>
              </td>

            </tr>
             ))}
          </tbody>    
                  
            </Table>

            <Button onClick={handleAddFormShow}  ><i  className="fa fa-plus"  ></i></Button>
       
            
           <Button onClick={()=>sendingData()}  ><i  className="fa fa-paper-plane" ></i></Button>
            <Modal show={addForm} onHide={handleAddFormClose}>
              <Modal.Header closeButton>
                 <Modal.Title>
                   Add your Details
                 </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form >
                   <label>
                         Name:
                     <input type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)}/>
                    </label>

                    <label>
                         Phone Number:
                     <input type="text" name="phoneNumber" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>
                    </label>
                    <label>
                         Email:
                     <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </label>
                    <label>
                         Hobbies:
                     <input type="text" name="Hobbies" value={hobbies} onChange={(e)=>setHobbies(e.target.value)} />
                    </label>
                    <br></br>
                    <button onClick={()=>postData()} >Submit</button>
              </form>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>

           







    </div>
  );
}

export default App;
