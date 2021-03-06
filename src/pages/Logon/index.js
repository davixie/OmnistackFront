import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';

import api from '../../services/api';

import './styles.css';
import heroesimg from '../../assets/heroes.png';
import logoimg from '../../assets/logo.svg';

export default function Logon(){

    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('sessions', { id })
            
            localStorage.setItem('ongID', id);///eh para salvar localmente o ID
            localStorage.setItem('ongNome', response.data.nome);

            history.push('/profile');
        }catch(err){
            alert('Seu Login não teve sucesso.')
        }
    };

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoimg} alt="logo"/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input 
                        placeholder="Sua ID" 
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button type="submit" className="button">Entrar</button>

                    <Link className="back-link" to="/register">
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesimg} alt="heroes" />
        </div>
    );
}