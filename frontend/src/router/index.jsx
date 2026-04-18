import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage.jsx'
import AuthPage from '../pages/AuthPage.jsx'
import StudentDashboard from '../pages/StudentDashboard.jsx'
import OnboardingPage from '../pages/OnboardingPage.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
  {
    path: '/dashboard',
    element: <StudentDashboard />,
  },
  {
    path: '/onboarding',
    element: <OnboardingPage />,
  },
])
