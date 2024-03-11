import Layout from '@/containers/Layouts'
import { lazy, ReactElement, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const Home = lazy(async () => import('./Home'))
const SignUp = lazy(async () => import('./SignUp'))
const SignIn = lazy(async () => import('./SignIn'))

export default function Root(): ReactElement {
  return (
    <Layout>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/">
            <Route index element={<Navigate to="/home" />} />
            <Route path="/home/*" element={<Home />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Route>
        </Routes>
      </Suspense>
    </Layout>
  )
}
