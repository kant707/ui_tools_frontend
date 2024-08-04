import React from 'react';


function LoginForm() {  
  return (
    <div className="login-auth-box">
      <form>
        <div className="form-inner">            
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email"/>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password"/>
        </div>

        <input type="submit" value="Login"/>
        </div>
      </form>
    </div>
  )
}

export default LoginForm;
