import React, { useEffect } from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/authProvider'
import axios from 'axios'
import Box from '@mui/material/Box'
import logo from '../assets/logo.png'
import { IconButton, OutlinedInput, TextField, Typography } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useTheme } from '@mui/material'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const Login = () => {
  const navigate = useNavigate()
  const auth = useAuth()
  const { state } = useLocation()
  const theme = useTheme()

  const universities = ['MUIC', 'Oxford University', 'Hogwarts', 'LFIB']

  // Input values
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userRole, setUserRole] = useState('')
  const [university, setUniversity] = useState('')
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [userRoleError, setUserRoleError] = useState(false)
  const [universityError, setUniversityError] = useState(false)

  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword: any = () => setShowPassword((show) => !show)

  const validateLogin = () => {
    setUsernameError(false)
    setPasswordError(false)
    setUserRoleError(false)
    setUniversityError(false)

    let hasError = false

    if ('' === username) {
      setUsernameError(true)
      hasError = true
    }

    if ('' === password) {
      setPasswordError(true)
      hasError = true
    }

    if ('' === userRole) {
      setUserRoleError(true)
      hasError = true
    }

    if ('' === university) {
      setUniversityError(true)
      hasError = true
    }

    if (hasError) return

    logIn()
  }

  const logIn = async () => {
    let res: any = null
    try {
      res = await axios.post('/api/' + userRole + '/login', JSON.stringify({ username, password }))
    } catch (e) {
      window.alert('Wrong username or password')
      return
    }

    const resData = res.data
    if (res.status === 200) {
      auth?.setToken(resData)
      navigate(state?.path || '/')
    } else {
      window.alert('Wrong username or password')
    }
  }

  const handleChange = (event: SelectChangeEvent) => {
    setUniversity(event.target.value as string)
  }

  return (
    <Box>
      <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={'100px'} paddingTop={'20px'}>
        <img width={'130px'} src={logo} />
        <Typography sx={{ fontWeight: '500' }} variant='h2' color={'primary'}>
          Welcome to Campus Compass!
        </Typography>
      </Box>

      <Box px={30} py={6} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} gap={'80px'}>
        {/* <Box display={'flex'} justifyContent={'space-between'} gap={'100px'} width={'100%'}>
          <Box flexGrow={1} borderRadius={'20px'}>
            <Typography pb={2} variant='h5'>
              Select your university
            </Typography>
            <Box sx={{ minWidth: 120 }}>
              <FormControl error={universityError} sx={{ backgroundColor: 'white' }} fullWidth>
                <Select displayEmpty labelId='universityLabel' id='university' value={university} onChange={handleChange}>
                  <MenuItem value=''>
                    <b>Your University</b>
                  </MenuItem>
                  {universities.map((universityName) => (
                    <MenuItem key={'menuItem-' + universityName} value={universityName}>
                      {universityName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            border={'solid 3px'}
            borderColor={theme.palette.primary.main}
            borderRadius={'20px'}
            p={5}
          >
            <Typography variant='h5'>
              <span style={{ textDecoration: 'underline' }}>Contact us</span> directly to register your university.
            </Typography>
          </Box>
        </Box> */}
        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} width={'100%'}>
          <Typography pb={2} variant='h5'>
            Who are you?
          </Typography>
          <Box display={'flex'} justifyContent={'center'} gap={'50px'} width={'100%'}>
            <Button
              onClick={() => setUserRole('admin')}
              sx={{
                border: userRoleError ? 'solid 1px red' : 'solid 0px red',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: userRole === 'admin' ? theme.palette.secondary.main : theme.palette.primary.main,
                flexGrow: 1,
                borderRadius: 3,
                padding: 5,
                backgroundColor: userRole === 'admin' ? theme.palette.primary.main : 'white',
                ':hover': { backgroundColor: userRole === 'admin' ? theme.palette.primary.main : theme.palette.secondary.dark }
              }}
            >
              <Typography variant='h4'>Admin</Typography>
            </Button>
            <Button
              onClick={() => setUserRole('service')}
              sx={{
                border: userRoleError ? 'solid 1px red' : 'solid 0px red',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: userRole === 'service' ? theme.palette.secondary.main : theme.palette.primary.main,
                flexGrow: 1,
                borderRadius: 3,
                padding: 5,
                backgroundColor: userRole === 'service' ? theme.palette.primary.main : 'white',
                ':hover': { backgroundColor: userRole === 'service' ? theme.palette.primary.main : theme.palette.secondary.dark }
              }}
            >
              <Typography variant='h4'>Service</Typography>
            </Button>
            <Button
              onClick={() => setUserRole('student')}
              sx={{
                border: userRoleError ? 'solid 1px red' : 'solid 0px red',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: userRole === 'student' ? theme.palette.secondary.main : theme.palette.primary.main,
                flexGrow: 1,
                borderRadius: 3,
                padding: 5,
                backgroundColor: userRole === 'student' ? theme.palette.primary.main : 'white',
                ':hover': { backgroundColor: userRole === 'student' ? theme.palette.primary.main : theme.palette.secondary.dark }
              }}
            >
              <Typography variant='h4'>Student</Typography>
            </Button>
          </Box>
        </Box>
        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} width={'50%'}>
          <Typography pb={2} variant='h5'>
            {userRole === 'admin' ? 'Admin' : userRole === 'service' ? 'Service' : userRole === 'student' ? 'Student' : 'User'} ID
          </Typography>
          <TextField
            error={usernameError}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}
            sx={{ borderRadius: '3', p: '2', backgroundColor: 'white' }}
            value={username}
            id='user-id'
          ></TextField>
          <br />
          <br />
          <Typography pb={2} variant='h5'>
            Password
          </Typography>
          <FormControl error={passwordError} sx={{ borderRadius: '3', p: '2', backgroundColor: 'white' }} variant='outlined'>
            <OutlinedInput
              id='password'
              type={showPassword ? 'text' : 'password'}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
              endAdornment={
                <InputAdornment sx={{ paddingRight: '5px' }} position='end'>
                  <IconButton onClick={handleClickShowPassword} edge='end'>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <br />
          <br />
          <Button
            sx={{
              ':hover': { backgroundColor: '#1D6CA5' },
              alignSelf: 'center',
              padding: '10px',
              width: '150px',
              backgroundColor: '#2B94E0',
              color: 'white',
              fontSize: '18px'
            }}
            onClick={validateLogin}
          >
            Log In
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Login
