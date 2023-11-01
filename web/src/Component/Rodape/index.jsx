import './style.css'
import React from 'react'

function Icone({ children }) {
    return <div className='Icone'>
        {children}
    </div>
}

function Rodape() {
    return <footer className='footer'>
        <div className='boxIcone'>

            <Icone> <a className="iconEmail" href='#' target='_blank'>  </a></Icone>
            <Icone> <a className="iconGithub" href='#' target='_blank'>  </a></Icone>
            <Icone> <a className="iconLinkedin" href='#' target='_blank'>  </a></Icone>

        </div>
        <span>Yshrael Pimentel</span>
    </footer>
}
export default Rodape