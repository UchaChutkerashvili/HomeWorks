import React, { useState } from 'react'
import UserForm from '../components/UserForm'
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {  
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  
  const onFormSubmit = (firstName, lastName, date, task) => {
    

    setLoading(true)
    fetch("/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
      body: JSON.stringify([{ firstName, lastName, date, task }]),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Response failed");
        return res.json();
      })
      .then(() => navigate('/'))
      .catch(err => console.log(err))
  };
  if(loading) return <p>Loading ..</p>

  return  (
    <div>
        <UserForm onFormSubmit={onFormSubmit} />
         
    </div>
   )
     
}

export default CreatePage