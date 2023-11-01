import './style.css'
function Titulo({ label, id }) {
    return <h2 className="Titulo" id={id}>{label}</h2>
}

export default Titulo