import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { JobCard } from '../components/cards'


export const Profile = () => {

  const user = useSelector(state => state.auth.user)
  if(!user) return <Navigate to="/login"/>

  console.log(user.postedJobs)
  return (
  <>
    <h2 className='md:text-4xl text-2xl font-extrabold'>Profile</h2>

    <div className='mt-5'>
      <p>Name: <span>{user.name}</span></p>
      <p>Username: <span>{user.username}</span></p>
      <p>Email: <span>{user.email}</span></p>

      {user.role === "employer" && (
      <>
      <h2 className='md:text-2xl text-xl font-extrabold mt-4'>Posted Jobs:</h2>

      {user.postedJobs && user.postedJobs.length > 0 ? (
      <div className='mt-10 flex flex-wrap gap-10 justify-center items-center'>
        {user.postedJobs.map((data) => (
          <JobCard data={data} key={data._id}/>
        ))}
      </div>
      ) 
      : (
        <p>You haven't posted any job yet</p>
      )}
      </>
      )}

    </div>
  </>
  )
}
