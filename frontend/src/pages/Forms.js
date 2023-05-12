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
        "items.0.0.items.0.value": {
            "code": "at0014",
            "id": "22001350",
            "type": "local"
        },
        "items.0.0.items.1.value.date": "2023-05-10",
        "items.0.0.items.1.value.time": "20:05",
        
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
        "items.0.0.items.7.items.0.value": {
            "code": "NADMSCI2",
            "text": "APR"
        },
        "items.0.0.items.7.items.1.value": null,
        "items.0.0.items.8.items.0.value": null,
        "items.0.0.items.8.items.1.value": {
            "code": "local_terms::Sim, corrente sanguínea",
            "text": "Sim, corrente sanguínea"
        },
        "items.0.0.items.8.items.2.value": "{\"blocks\":[{\"key\":\"cg98a\",\"text\":\"Pulmão\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
        "items.0.0.items.9.value": null,
        "items.0.1.items.0.value": null,
        "items.0.1.items.1.value": [
            {
                "textId": 0,
                "value": "{\"blocks\":[{\"key\":\"2pfbn\",\"text\":\"Criança 4 anos\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}"
            }
        ],
        "items.0.2.items.0.items.0.value.unit": "Cel",
        "items.0.2.items.0.items.0.value.value": 38,
        "items.0.2.items.1.items.0.value.unit": "/min",
        "items.0.2.items.1.items.0.value.value": 90,
        "items.0.2.items.2.items.0.value.unit": "mm[Hg]",
        "items.0.2.items.2.items.0.value.value": 90,
        "items.0.2.items.2.items.1.value.unit": "mm[Hg]",
        "items.0.2.items.2.items.1.value.value": 30,
        "items.0.2.items.3.items.0.value.unit": "/min",
        "items.0.2.items.3.items.0.value.value": 20,
        "items.0.2.items.4.items.0.value": 50,
        "items.0.2.items.4.items.1.value": 30,
        "items.0.3.items.0.value.unit": "kg",
        "items.0.3.items.0.value.value": 4,
        "items.0.4.items.0.value.unit": "cm",
        "items.0.4.items.0.value.value": 45,
        "items.0.5.items.0.value.unit": "kg/m2",
        "items.0.5.items.0.value.value": 40,
        "items.0.6.items.0.value.unit": "cm",
        "items.0.6.items.0.value.value": 30
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
            patientData={{}}
            reportData={{}}
            referenceModel={[]}
            submitButtonDisabled={false}
            saveButtonDisabled={false}
        />
    )

};

export default Formu;