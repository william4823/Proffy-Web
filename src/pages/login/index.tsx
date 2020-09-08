import React, { useState, FormEvent} from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import {Link, useHistory} from 'react-router-dom'


import eyeIcon from '../../assets/icons/eye.svg'
import hideIcon from '../../assets/icons/hide.svg'
import logoImg from '../../assets/images/logo.svg'


import './style.css'

import InputLabel from '../../components/Input-Login_Casdastro'
import api from '../../services/api'


const Login = () => {

    const history = useHistory()
    const [check, setCheck] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [visibility, setvisibility] = useState(false)

    function handleVisibility() {
        setvisibility(!visibility)
    }

    async function SubmitForm(e: FormEvent) {
        e.preventDefault()

        const auth = await api.post('auth', {
            email,
            password
        })

        console.log(auth.data)

        localStorage.setItem('token', auth.data)
        

        history.push('/study')

    }

    
    return(
        <>
            <div id="page-login-content" className="container">
               <div className="banner">
                <img src={logoImg} className="logo" />
                <br />
                <strong>A sua plataforma de estudos Online</strong>
               </div>

               <div className="login-area">
                <form onSubmit={SubmitForm}>
                        <strong id="make-login">Fazer Login</strong>
                        <InputLabel 
                        label="E-mail"
                        className="Email-Label" 
                        type="email"
                        value={email}
                        onChange={(e) => {setEmail(e.target.value)}}
                        />
                        <InputLabel 
                        label="Senha" 
                        type={visibility ? "text" : "password"} 
                        maxLength={32}
                        value={password}
                        onChange={(e) => {setPassword(e.target.value)}}
                        >
                        
                        <button className="visibility" onClick={handleVisibility} type="button">
                                <img src={visibility ? hideIcon : eyeIcon} />
                            </button>
                        
                        </InputLabel>

                        <div className="buttons">
                            <div className="remember">
                                <Checkbox 
                                checked={check}
                                onChange={(e) => {setCheck(e.target.checked)}}
                                color='primary'
                                id="remember"
                                size="medium"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                                <label htmlFor="remember">Lembre-se de mim</label>
                            </div>

                            <div className="forgot-password">
                                <Link to="/forgot" className="forgot">Esqueci Minha Senha</Link>
                            </div>
                        </div>
                        
                        

                        <div className="acess">
                            <button type="submit">Acessar</button>
                        </div>
                            <br /> <br /> 
                        <div className="register">
                            <strong>
                                Não tem conta ainda? <br />
                            </strong>

                            <Link to ="/register"className="register-link">
                                Cadastre-se agora
                            </Link>
                        </div>
                    </form>

               </div>
                
            </div>
           
        
        </>
    )
}

export default Login
