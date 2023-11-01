import './style.css'

function Icone({ children }) {
    return <div className='Icone'>
        {children}
    </div>
}

function Rodape() {
    return <footer className='footer'>
        <div className='boxIcone'>

            <Icone> <a href='#' target='_blank'> <img alt='Email' src="../../../public/images/icon_email.png" />        </a></Icone>
            <Icone> <a href='#' target='_blank'> <img alt='Github' src="../../../public/images/icon_github.png" />      </a></Icone>
            <Icone> <a href='#' target='_blank'> <img alt='Linkedin' src="../../../public/images/icon_linkedin.png" />  </a></Icone>

        </div>
        <span>Yshrael Pimentel</span>
    </footer>
}
export default Rodape