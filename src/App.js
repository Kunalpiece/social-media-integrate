import { useState } from 'react';
import './App.css';
import { signInWithGoogle, signInWithGithub, UserLogOut } from './Firebase'
import { FcGoogle } from 'react-icons/fc';
import { ImGithub } from 'react-icons/im';

function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [image, setImage] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  const handleSignInChanges = (val) => {
    setLoggedIn(true)
    setName(val.user.displayName)
    setEmail(val.user.email)
    setImage(val.user.photoURL)
  }

  const handleSignOutChanges = () => {
    UserLogOut()
    setLoggedIn(false)
    setName('')
    setEmail('')
    setImage('')
  }

  const handleOnGoogle = () => {
    signInWithGoogle()
      .then((result) => handleSignInChanges(result))
      .catch((err) => {
        console.log(err)
      })
  }

  const handleOnGithub = () => {
    signInWithGithub()
      .then((result) => handleSignInChanges(result))
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="App">
      <header className='navbar'>
        <h1>The Sparks Foundation</h1>
      </header>
      {!(loggedIn) &&
        <div className='container'>
          <div className="App-header">
            <div className='header'>
              <h3>Sign in with ...</h3>
            </div>
            <div className='content'>
              <button onClick={handleOnGoogle}>
                <FcGoogle size={20} />
              </button>
              <button onClick={handleOnGithub}>
                <ImGithub size={20} />
              </button>
            </div>
          </div>
        </div>
      }
      {(loggedIn) &&
        <div className='container'>
          <div className='profile'>
            <h2>{name}</h2>
            <h3>{email}</h3>
            <img src={image} alt="usrImage" />
          </div>
          <div className='logout'>
            <button onClick={handleSignOutChanges} >Log Out</button>
          </div>
        </div>
      }
      <footer className='footer'>
        <p>Developed by Kunal Gupta</p>
        <a href='https://www.linkedin.com/in/kunal-gupta-b2677a191/' target="_blank" rel='noreferrer'><img src="https://img.icons8.com/nolan/32/linkedin.png" alt='LinkedIn'/></a>
        <a href='https://github.com/Kunalpiece' target="_blank" rel='noreferrer'><img src="https://img.icons8.com/nolan/32/github.png" alt='Github' /></a>
      </footer>
    </div>
  );
}

export default App;