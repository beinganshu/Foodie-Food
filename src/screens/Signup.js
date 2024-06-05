import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'


export default function Signup() {
    const [credentials, setcredentials] = useState({name:"",email:"",password:"",geolocation:""})
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response= await fetch("http://localhost:5000/api/createuser",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.geolocation})
      });
      const json=await response.json()
      console.log(json);

      if(!json.success)
      {
        alert("Enter valid credentials")
      }
      }
      const onChange=(event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
      }
  return (
    <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover',height: '100vh' }}>
    <Navbar/>
    <br></br>
    <div className='container'><form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
        <div className="m-3">
      <label htmlFor="name" className="form-label">Name</label>
      <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange}></input>
    </div>
    <div className="m-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
      <input type="email" className="form-control" name='email' value={credentials.email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange}></input>
    </div>
    <div className="m-3">
      <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
      <input type="password" className="form-control" name='password' value={credentials.password} id="exampleInputPassword1" onChange={onChange}></input>
    </div>
    <div className="m-3">
      <label htmlFor="exampleInputAddress" className="form-label">Address</label>
      <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} id="exampleInputAddress" onChange={onChange}></input>
    </div>

    <button type="submit" className="m-3 btn btn-success">Submit</button>
    <Link to='/login' className="m-3 btn btn-danger">Already a User</Link>
  </form>
  </div></div>
  )
}
