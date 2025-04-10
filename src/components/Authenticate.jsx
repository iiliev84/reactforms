import { useState } from 'react'

function Authenticate({token}) {
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);
    const [auth, setAuth] = useState()

    async function handleClick() {
    try {
      const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
            method: "GET",
            headers: {"Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      setSuccessMessage(result.message);
      setAuth(result.data)
    } catch (error) {
      setError(error.message);
    }
  }
    return(
        <>
         <div>
            <h2>Authenticate</h2>
            {successMessage && <p>{successMessage}</p>}
            {error && <p>{error} </p>}
            <button onClick={handleClick}>Authenticate Token!</button>
            {auth ?
            <div>
                <h3> Your username is <p>{auth.username}</p></h3>
            </div>
        :
        <h3>You are not signed in! Please sign up and authenticate.</h3>
        
    }
        </div>
        </>
    )
}

export default Authenticate