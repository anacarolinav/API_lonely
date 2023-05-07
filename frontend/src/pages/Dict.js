import { StyledTitle, Avatar, StyledButton, ButtonGroup, StyledFormArea, colors } from "../components/Styles";

// Logo
import Logo from '../assets/logo.png';

const Dict = () => {

    const meuDicionario = {
        'items.0.0.items.0': 'EPISODIO',
        'items.0.0.items.1': 'DATACRIACAO',
        'items.0.0.items.2': 'SINDR01',//1ºmotivo de internamento
        'items.0.0.items.3': 'SINDR02',//2ºmotivo de internamento
        'items.0.0.items.4': 'SINDR03',//3ºmotivo de internamento
        'items.0.0.items.5': 'NADMSCI11',//internamento
        'items.0.0.items.6': 'NADMSCI12',//reinternamento
        //Proveniencia
        'items.0.0.items.7.items.0':'Nome',
        'items.0.0.items.7.items.1':'Comentários',
        //Infeção
        'items.0.0.items.8.items.0': 'INFECADM20', //comentarios dentro
        'items.0.0.items.8.items.1': 'INFECADM10',//'Infeção aguda à admissão',
        'items.0.0.items.8.items.2': 'INFECADM30',//'Local da infeção'
        'items.0.0.items.9':'SINDROBS01', //comentarios fora
        //Historia Atual
        'items.0.1.items.0':'Título',//INUTIL nao existe
        'items.0.1.items.1':'NADMSCI137',//historia da doença atual
        //Vital Signs
        'items.0.2.items.0.items.0':'NADMSCI17', //temperatura
        'items.0.2.items.1.items.0':'NADMSCI171', //rate
        'items.0.2.items.2.items.0':'NADMSCI172',//diastolic = TA
        'items.0.2.items.2.items.1': 'NADMSCI173',//sistolic é o da barra
        
        'items.0.2.items.3.items.0': 'NADMSCI176', //FR
        'items.0.2.items.4.items.0':'NADMSCI177',//SatO2
        'items.0.2.items.4.items.1':'NADMSCI178', //Fi O2
        
        'items.0.3.items.0':'NADMSCI179',//peso
        'items.0.4.items.0':'NADMSCI1711', //altura
        'items.0.5.items.0':'NADMSCI1713' //IMC

        //ignoramos os p que nao estao no forms: p, P

    };

    console.log(meuDicionario['chave1']); // valor1
    console.log(meuDicionario.chave2); // valor2

    

    return (
        <div>
            <pre>{JSON.stringify(meuDicionario, null, 2)}</pre>
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    backgroundColor: "transparent",
                    width: "100%",
                    padding: "15px",
                    display: "flex",
                    justifyContent: "flex-start",
                }}
            >
                <Avatar image={Logo} />
            </div>
            <StyledTitle size={65}>Welcome to React App</StyledTitle>
            
        </div>
    );
}

export default Dict;