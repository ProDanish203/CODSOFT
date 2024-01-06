import React from 'react'
import { Routes, Route } from "react-router-dom";
import { Home, Login, Register } from "../pages";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

export const Router = () => {
  return (
  <>
  <Routes>
    <Route path='/*' element={
      <ProtectedRoute>
        <Home/>
      </ProtectedRoute>
    }/>
    <Route path='/login' element={
      <PublicRoute>
        <Login/>
      </PublicRoute>
    }/>
    <Route path='/register' element={
      <PublicRoute>
        <Register/>
      </PublicRoute>
    }/>
  </Routes>
  </>
  )
}
