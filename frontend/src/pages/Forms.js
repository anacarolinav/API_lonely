import { Form } from "protected-aidaforms";
import { replaceValuesJDT } from "../ReplaceValuesJDT";
import { json } from "react-router-dom";
import * as XLSX from 'xlsx'

let jdt = require("../jdt.json")

function Formu() {

    const mapping = {

        'items.0.0.items.0': 'EPISODIO',
        'items.0.0.items.1': 'DATACRIACAO',
        'items.0.0.items.2': 'SINDR01',//1ºmotivo de internamento
        'items.0.0.items.3': 'SINDR02',//2ºmotivo de internamento
        'items.0.0.items.4': 'SINDR03',//3ºmotivo de internamento
        'items.0.0.items.5': 'NADMSCI11',//internamento
        'items.0.0.items.6': 'NADMSCI12',//reinternamento
        'items.0.0.items.7.items.0': ['NADMSCI1',
            'NADMSCI6',
            'NADMSCI2',
            'NADMSCI3',
            'NADMSCI4',
            'NADMSCI9',
            'NADMSCI10'],
        'items.0.0.items.7.items.1': 'Comentários',

        //Infeção
        'items.0.0.items.8.items.0': 'INFECADM20', //comentarios dentro
        'items.0.0.items.8.items.1': 'INFECADM10',//'Infeção aguda à admissão',
        'items.0.0.items.8.items.2': 'INFECADM30',//'Local da infeção'
        'items.0.0.items.9': 'SINDROBS01', //comentarios fora

        //Historia Atual
        'items.0.1.items.0': 'Título',//INUTIL nao existe --Nao ha stress fica em branco
        'items.0.1.items.1': 'NADMSCI137',//historia da doença atual

        //Vital Signs
        'items.0.2.items.0.items.0': 'NADMSCI17',//temperatura
        'items.0.2.items.1.items.0': 'NADMSCI171',//rate
        'items.0.2.items.2.items.0': 'NADMSCI172',//diastolic = TA
        'items.0.2.items.2.items.1': 'NADMSCI173',//sistolic é o da barra

        'items.0.2.items.3.items.0': 'NADMSCI176', //FR
        'items.0.2.items.4.items.0': 'NADMSCI177',//SatO2
        'items.0.2.items.4.items.1': 'NADMSCI178', //Fi O2

        'items.0.3.items.0': 'NADMSCI179',//peso
        'items.0.4.items.0': 'NADMSCI1711', //altura
        'items.0.5.items.0': 'NADMSCI1713' //IMC 

    };

    let composition = {
        //ler o excel -ir buscar o value da tag que temos no mapping
        //ler o jdt.json - ir buscar TUDO do item

        //key está no jdt
        //value do dict está no excel mas temos de ir buscar o value da TAG

        //agora eu quero fazer uma função composition que cria um dicionário em que a key 
        //do dicionário é o item.0.0.items.0 que está no jdt e o value do dicionário está no 
        //excel associado à TAG que está no mapping
        
        "items.0.0.items.0.value": {
            "code": "at0014",
            "id": "22001350",
            "type": "local"
        },

        'items.0.0.items.1': {'value':"2022-11-01T21:29:00"},


        "items.0.0.items.2.value": {
            "code": "local_terms::R50.9",
            "text": "Febre"
        },

        "items.0.0.items.3.value": {
            "code": "local_terms::Outro",
            "text": "Outro"
        },

        "items.0.0.items.4.value": {
            "code": "local_terms::Outro",
            "text": "Outro"
        },

        "items.0.0.items.5.value": {
            "code": "local_terms::U",
            "text": "Urgente"
        },

        "items.0.0.items.6.value": {
            "code": "local_terms::Não",
            "text": "Não"
        },
    }

    let newjdt = replaceValuesJDT(jdt, composition)

    return (
        <Form
            onSubmit={(values, changedFields) => console.log("SUBMITTED VALUES: ", values, "CHANGED FIELDS: ", changedFields)}
            onSave={(values, changedFields) => console.log("SAVED VALUES: ", values, "CHANGED FIELDS: ", changedFields)}
            onCancel={status => console.log("CANCELLED:", status)}
            template={newjdt}
            dlm={{}}
            showPrint={true}
            editMode={false} // colocar assim porque não vamos editar os formulários
            professionalTasks={
                ["Registar Pedido", "Consultar Pedido",
                    "Anular Pedido"]}
            canSubmit={true}
            canSave={true}
            canCancel={true}
            patientData={{
                "numSequencial": 1904865,
                "episodio": 21016848,
                "modulo": "INT",
                "processo": 99998888,
                "nome": "Manuel Utente Teste Teste Teste",
                "dtaNascimento": "1945-08-15",
                "idade": 77,
                "sexo": "Masculino"
            }}
            reportData={{
                dtaEncerrada: "22-05-2019 13:02",
                dtaCriada: "10-05-2019 18:47",
                realizada: "Joana Pascoal",
                responsavel: "José Costa"
            }}
            referenceModel={
                [{
                    "itemName": "Número mecanográfico",
                    "item": "num_mecanografico",
                    "value": "123456",
                    "formVisible": true
                },
                {
                    "itemName": "EPISODIO",
                    "item": "EPISODIO",
                    "value": 1347095,
                    "formVisible": true
                }
                ]}
            submitButtonDisabled={false}
            saveButtonDisabled={false}
        />
    )

};

export default Formu;