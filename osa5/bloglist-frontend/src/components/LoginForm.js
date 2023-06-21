const LoginForm = ({
    handleLogin,
    handlePasswordChange,
    handleUsernameChange,
    username,
    password,
    errorMessage
   }) => {
   return (
     <div>
       <h2>Log in to application</h2>
       {errorMessage && <div className='error'>{errorMessage}</div>}
       <form onSubmit={handleLogin}>
         <div>
           username
           <input
             value={username}
             onChange={handleUsernameChange}
           />
         </div>
         <div>
           password
           <input
             type="password"
             value={password}
             onChange={handlePasswordChange}
           />
       </div>
         <button type="submit">login</button>
       </form>
     </div>
   )
 }
 
 export default LoginForm