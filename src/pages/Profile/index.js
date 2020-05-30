import React, { useEffect, useState } from 'react';//useEffect dispara alguma função em algum determinado momento
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';
import './styles.css';

import logoimg from '../../assets/logo.svg';

export default function Profile(){
    const [incidents, setIncidents] = useState([]);

    const ongId = localStorage.getItem('ongID');
    const ongNome = localStorage.getItem('ongNome');

    const history = useHistory();
    
    //recebe dois parametros, a função e quando ela eh executada
    useEffect(() => {

        api.get('profile', {
            headers:{
                Authorization: ongId,//aqui ele pega no insomnia os dados de profile da ong com id = ongId
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDelete(id){
        try{
            await api.delete(`incidents/${id}`, {
                headers:{
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        }catch(err){
            alert('Não foi possível excluir!');
        }
    }

    async function logoff(){
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoimg} alt="logo" />
                <span>Bem vindo {ongNome}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={logoff}>
                    <h3>OFF</h3>
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{incident.value}</p>

                        <button type="button" onClick={() => handleDelete(incident.id)}>
                            LX
                        </button>
                    </li>
                ))}
            </ul>

        </div>
    );
}