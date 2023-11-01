import './style.css'
import Logo from '../Logo'
import { Button } from 'react-bootstrap';
import { GiTakeMyMoney } from 'react-icons/gi';
import { SiGooglemybusiness } from 'react-icons/si';
import { BsCashCoin, BsSearch } from 'react-icons/bs';
import Switch from '@mui/material/Switch';

function alterarModoModal(bol) {
    const login = document.querySelector('#login')
    const cadastrar = document.querySelector('#cadastrar')
    if (bol) {
        cadastrar.classList.remove('modelTipoAtivo')
        login.classList.add('modelTipoAtivo')
    } else {
        cadastrar.classList.add('modelTipoAtivo')
        login.classList.remove('modelTipoAtivo')
    }
}


function Header() {
    function navegar(href) { window.location.href = href; }
    window.onload = () => {
        const bttns = Array.from(document.getElementsByTagName('button'))
        if (bttns)
            bttns.forEach(bttn => {
                if (bttn)
                    bttn.addEventListener('click', function (Event) {
                        bttns.forEach(esse => {
                            Event.target === esse ? esse.classList.add('bttnAtivo') : esse.classList.remove('bttnAtivo')
                        })
                    })
            })
        const imgUser = document.getElementById('imagemUsuario')
        if (imgUser)
            imgUser.addEventListener('click', function () {
                const modelUser = Array.from(document.getElementsByClassName('modelUsuario'))
                if (modelUser)
                    modelUser.forEach(model => model.classList.contains('modelAtivo') ? model.classList.remove('modelAtivo') : model.classList.add('modelAtivo'))
            })



        alterarModoModal(false)



    }

    document.addEventListener("scroll", function () {
        const header = document.getElementById('header')
        var posicaoy = window.scrollY
        if (header && typeof header != 'undefined')
            posicaoy === 0 ? header.classList.remove('inScroll') : header.classList.add('inScroll')
    })


    return <header id='header'>

        <Logo onClick={() => {
            navegar('#Banner')
            const bttns = Array.from(document.getElementsByTagName('button'))
            console.log(bttns.length)
            bttns.forEach(esse => esse.classList.remove('bttnAtivo'))
        }} />

        <nav>
            <Button onClick={() => navegar('#TituloConsumidor')}>  <GiTakeMyMoney /> Consumidor </Button>
            <Button onClick={() => navegar('#TituloLojista')}> <SiGooglemybusiness /> Logista</Button>
            <Button onClick={() => navegar('#TituloTransacao')}> <BsCashCoin />      Transações</Button>
        </nav>

        <div className='boxRight'>
            <select name="buscarPor" id="buscarPor">
                <option value="">Selecione</option>

                <option value="consumidor">Consumidor</option>
                <option value="lojista">Lojista</option>
                <option value="Transação">Transações</option>

            </select>

            <div className='boxBusca'>
                <input type="text" name="buscar" id="buscar" placeholder='Buscar' />
                <BsSearch className='iconBusca' />
            </div>

            <div className='boxUsuario'>
                <img src="" alt="" id='imagemUsuario' />
                <label htmlFor="">User Fullname</label>
            </div>

            <div className='modelUsuario'>

                <div className='BoxInputAlterarLoginCadastro'><label id='lblCadastro'>Cadastro</label>
                    <Switch defaultChecked color="default" onChange={event => alterarModoModal(event.target.checked)} />
                    <label id='lblLogin'>Entrar</label></div>
                <div id='login'>
                    <span className='aviso'>NÃO ADICIONE INFORMAÇÕES PESSOAIS!! UTILIZE VALORES FICTÍCIOS.</span>
                    <form>
                        <fieldset>
                            <label> <input type="radio" name="tipoUsuario" id="consumidor" value="consumidor" checked /> Consumidor </label>
                            <label> <input type="radio" name="tipoUsuario" id="lojista" value="lojista" /> Logista</label>
                        </fieldset>

                        <fieldset>
                            <label>CPF/CNPJ <br /><input type="Text" name="cpf_cnpj" id="cpf_cnpj" placeholder='Não utilize dados reais!' /></label><br />
                        </fieldset>

                        <button type="submit" className='bttnSubmit'>Entrar</button>

                    </form>
                </div>

                <div id='cadastrar'>
                    <span className='aviso'>NÃO ADICIONE INFORMAÇÕES PESSOAIS!! UTILIZE VALORES FICTÍCIOS.</span>
                    <form>
                        <fieldset>
                            <label> <input type="radio" name="tipoUsuario" id="consumidor" value="consumidor" checked /> Consumidor </label>
                            <label> <input type="radio" name="tipoUsuario" id="lojista" value="lojista" /> Logista</label>
                        </fieldset>

                        <fieldset>
                            <label>Nome <br /><input type="Text" name="nome" id="nome" placeholder='Usuário' /></label><br />
                            <label>CPF/CNPJ <br /><input type="Text" name="cpf_cnpj" id="cpf_cnpj" placeholder='Não utilize dados reais!' /></label><br />
                            <label>Valor Inicial <br /><input type="Text" name="valor" id="valor" placeholder='Saldo inicial da conta' /></label><br />

                            <button type="submit" className='bttnSubmit'>Cadastrar</button>
                        </fieldset>


                    </form>
                </div>

            </div>
        </div>

    </header>
}

export default Header