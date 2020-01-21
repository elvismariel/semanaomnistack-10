import React from 'react';

import './styles.css';

function DevItem({dev, del, alter}) {
        
    async function handlerDeleteDev(dev) {
        await del(dev);
    }

    async function handleUpdateDev() {
        await alter(dev);
    }

    return (
        <li className="dev-item">
            <header>
                <img src={dev.avatar_url} alt={dev.name} />
                <div className="user-info">
                    <strong>{dev.name}</strong>
                    <span>{dev.techs.join(', ')}</span>
                </div>
            </header>
            <p>{dev.bio}</p>
            <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no Github</a>
            
            <button onClick={handlerDeleteDev}>Excluir</button>
            <button onClick={handleUpdateDev}>Alterar</button>
        </li>
    );
}

export default DevItem;