import React from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/authProvider'
import axios from 'axios'
import Box from '@mui/material/Box'
import logo from '../assets/logo.png'
import { TextField, Typography } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useTheme } from '@mui/material'
import Button from '@mui/material/Button'

const Login = () => {
  const theme = useTheme()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()
  const auth = useAuth()
  const { state } = useLocation()

  const validateLogin = () => {
    setUsernameError('')
    setPasswordError('')

    if ('' === username) {
      setUsernameError('Please enter your username')
      return
    }

    if ('' === password) {
      setPasswordError('Please enter a password')
      return
    }

    if (password.length < 7) {
      setPasswordError('The password must be 8 characters or longer')
      return
    }

    logIn()
  }

  const logIn = async () => {
    let res: any = null
    try {
      res = await axios.post('/api/login', JSON.stringify({ username, password }))
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

  const [university, setUniversity] = useState('')

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

      <Box px={20} py={10} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} gap={'80px'}>
        <Box display={'flex'} justifyContent={'space-between'} gap={'100px'} width={'100%'}>
          <Box flexGrow={1} borderRadius={'20px'}>
            <Typography pb={2} variant='h5'>
              Select your university
            </Typography>
            <Box sx={{ minWidth: 120 }}>
              <FormControl color='primary' sx={{ backgroundColor: 'white' }} fullWidth>
                <Select labelId='universityLabel' id='university' value={university} onChange={handleChange}>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
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
        </Box>
        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} width={'100%'}>
          <Typography pb={2} variant='h5'>
            Who are you?
          </Typography>
          <Box display={'flex'} justifyContent={'center'} gap={'50px'} width={'100%'}>
            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              color={theme.palette.secondary.main}
              flexGrow={1}
              borderRadius={3}
              p={5}
              sx={{ backgroundColor: theme.palette.primary.main }}
            >
              <Typography variant='h4'>Admin</Typography>
            </Box>
            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              color={theme.palette.secondary.main}
              flexGrow={1}
              borderRadius={3}
              p={5}
              sx={{ backgroundColor: theme.palette.primary.main }}
            >
              <Typography variant='h4'>Service</Typography>
            </Box>
            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              color={theme.palette.secondary.main}
              flexGrow={1}
              borderRadius={3}
              p={5}
              sx={{ backgroundColor: theme.palette.primary.main }}
            >
              <Typography variant='h4'>Student</Typography>
            </Box>
          </Box>
        </Box>
        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} width={'50%'}>
          <Typography pb={2} variant='h5'>
            Admin ID
          </Typography>
          <TextField sx={{ borderRadius: '3', p: '2', backgroundColor: 'white' }} value={username} id='user-id'></TextField>
          <br />
          <br />
          <Typography pb={2} variant='h5'>
            Password
          </Typography>
          <TextField type='password' sx={{ borderRadius: '3', p: '2', backgroundColor: 'white' }} value={password} id='user-id'></TextField>
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
