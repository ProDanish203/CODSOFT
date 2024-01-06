import React from 'react'
import { Routes, Route } from "react-router-dom";
import { Dashboard, Home, Job, JobDetail, Login, Register } from "../pages";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

export const Router = () => {
  return (
  <>
  <Routes>
    <Route path='/' element={
      <ProtectedRoute>
        <Home/>
      </ProtectedRoute>
    }/>
    <Route path='browse' element={
      <ProtectedRoute>
        <Job/>
      </ProtectedRoute>
    }/>
    <Route path='job' element={
      <ProtectedRoute>
        <JobDetail/>
      </ProtectedRoute>
    }/>
    <Route path='dashboard/*' element={
      <ProtectedRoute>
        <Dashboard/>
      </ProtectedRoute>
    }/>
    <Route path='login' element={
      <PublicRoute>
        <Login/>
      </PublicRoute>
    }/>
    <Route path='register' element={
      <PublicRoute>
        <Register/>
      </PublicRoute>
    }/>
  </Routes>
  </>
  )
}
