import React, { useState } from 'react';
import Style from './signup.module.css'

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({});

  const handleSignup = async() => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    if (!confirmPassword) newErrors.confirmPassword = 'Confirm Password is required';
    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Add your signup logic here
      console.log("Signup clicked", { name, email, password, confirmPassword });
      const user={
        name:name,
        email:email,
        password:password
      }
      const response=await fetch("http://172.20.10.5:3100/signup",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
      })

      const result=await response.json()
      console.log(result)
    }
  };

  return (
    <div className={Style.signupcontainer}>
      <h1>Sign Up</h1>
      <div className={Style.signupform}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className={Style.signupform}>{errors.name}</p>}
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error">{errors.email}</p>}
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="error">{errors.password}</p>}
        
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        
        <button onClick={handleSignup}>Sign Up</button>
      </div>
    </div>
  );
}

export default Signup;
