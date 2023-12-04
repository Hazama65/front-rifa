
import {  Routes, Route, Navigate} from 'react-router-dom'
import { AdminPage, HomePage } from '../Ruleta'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { UserStateProps } from '../interfaces/interfaces';

export const RuletaRouter = () => {
  
  const {user} = useSelector( (state: UserStateProps) => state.user );


  const [license, setLicense] = useState('');

  useEffect(() => {
      setLicense(user.email)
  }, [user])
  
  return (
    <>

        <Routes>
              {
                (license === 'terryxbt@gmail.com') 
                ? (
                  <>
                  
                    <Route  path="admin" element={<AdminPage />} />
                    {/* <Route path="home" element={<HomePage />} /> */}

                    <Route path="*" element={<Navigate to="/admin" />} />
                  </>
                  )
                : (
                  <>
                    <Route path="home" element={<HomePage />} />
                    <Route path="*" element={<Navigate to="/home" />} />
                  </>

                )
              }
                <Route 
                    path="*"
                    element={<Navigate to="/home" />}
                /> 
        </Routes>

    </>
  )
}