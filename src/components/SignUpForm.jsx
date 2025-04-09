import { useState } from 'react'

function SignUpForm({setToken}) {
    const [username,setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    async function handleSubmit(event){
        event.preventDefault()
        try{
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", 
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(
                        {
                            username: username, 
                            password:password
                        }
                    )
                }
            )
            const result = await response.json()
            setToken(result.token)
            console.log(result);
        } catch (error) {
          setError(error.message);
        }
      }
    return(
        <>
        <h2>Sign Up!</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
            <label>
                Username: <input 
                value = {username}
                pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$"
                title="Your username must be at least 5 characters long, contain at least one letter and one number."
                required
                onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                Password: <input 
                type="password" 
                value={password} 
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                title="Your password must be at least 8 characters long, contain at least one number, one uppercase and lowercase letter and one special character."
                required 
                onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button>Submit</button>
            
        </form>
        </>
    )
}

export default SignUpForm