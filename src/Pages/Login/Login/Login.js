import { Alert, Button, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { NavLink,useLocation,useHistory } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import login from '../../../images/login.png'

const Login = () => {
    const [loginData,setLoginData]=useState({})
    const {user,signInWithGoogle,loginUser,isLoading,authError}=useAuth();

    const location=useLocation();
    const history=useHistory();

    const handleOnChange=e=>{
      const field=e.target.name;
      const value=e.target.value;
      const newLoginData={...loginData};
      newLoginData[field]=value;
      setLoginData(newLoginData);
    }
    const handleLoginSubmit=e=>{
       loginUser(loginData.email,loginData.password,location,history);
        e.preventDefault();
    }
    const handleGoogleSignIn=e=>{
      signInWithGoogle(location,history);
    }
    return (
        <Container>
            <Grid container spacing={2}>
  <Grid item sx={{mt:8}} xs={12} md={6}>
  <Typography variant="body1" gutterBottom>Login</Typography>
  <form onSubmit={handleLoginSubmit}>
  <TextField 
  sx={{width:'75%',m:1}}
  id="standard-basic" 
  label="Your Email" 
  name="email"
  type="email"
  onChange={handleOnChange}
  variant="standard" />
  <TextField 
  sx={{width:'75%',m:1}}
  id="standard-basic" 
  label="Your Password"
  name='password'
  onChange={handleOnChange}
  type="password" 
  variant="standard" />
  <Button sx={{width:'75%',m:1}} type='submit' variant='contained'>Login</Button>
  <NavLink style={{textDecoration:'none'}} to='/register'>
  <Button sx={{width:'75%',m:1}} type='submit' variant='text'>New User? Please Register</Button>
  </NavLink>
  {
    isLoading && <CircularProgress/>
  }
  {
    user?.email && <Alert severity="success">Login successfully!</Alert>
  }
  {authError && <Alert severity="error">{authError}</Alert>}
  </form>
  <p>...........................................</p>
  <Button onClick={handleGoogleSignIn}  variant='contained'>Google Sign In</Button>
  </Grid>
  <Grid item xs={12} md={6}>
    <img style={{width:'100%'}} src={login} alt='' />
  </Grid>
 
</Grid>
        </Container>
    );
};

export default Login;