import { Form } from "protected-aidaforms";
import { replaceValuesJDT } from "../ReplaceValuesJDT";
import { json } from "react-router-dom";

let jdt = require("../jdt.json")

function Formu() {
    let composition = {
        "items.0.0.items.0.items.2.value": {
            "code":"local_terms::2",
            "text":"Executar no CHUPorto"
        },
        "items.0.0.items.0.items.3.value":"{\"blocks\":[{\"key\":\"6f6p0\",\"text\":\"Doenca Pulmunar\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
        "items.0.0.items.0.items.4.items.0.value": {
            "code":"SNOMED::260528009",
            "text":"Média"
        },
        "items.0.0.items.0.items.4.items.1.value":"2022-12-02"
    } 
    
    let newjdt = replaceValuesJDT(jdt, composition)
    
    return (
        <Form
            onSubmit={(values, changedFields) => console.log("SUBMITTED VALUES: ", values, "CHANGED FIELDS: ", changedFields)}
            onSave = {(values, changedFields) => console.log("SAVED VALUES: ", values, "CHANGED FIELDS: ", changedFields)}
            onCancel = { status => console.log("CANCELLED:", status) }
            template = { newjdt }
            dlm = {{}}
            showPrint = { true}
            editMode = { false} // colocar assim porque não vamos editar os formulários
            professionalTasks = {
                    ["Registar Pedido", "Consultar Pedido",
                    "Anular Pedido"]}
            canSubmit = { true}
            canSave = { true}
            canCancel = { true}
            patientData = {{
                "numSequencial": 1904865,
                "episodio": 21016848,
                "modulo": "INT",
                "processo": 99998888,
                "nome": "Manuel Utente Teste Teste Teste",
                "dtaNascimento": "1945-08-15",
                "idade": 77,
                "sexo": "Masculino"
            }}
                reportData = {{
                dtaEncerrada: "22-05-2019 13:02",
                dtaCriada: "10-05-2019 18:47",
                realizada: "Joana Pascoal",
                responsavel: "José Costa"
            }}
                referenceModel = {
                    [{
                        "itemName": "Número mecanográfico",
                        "item": "num_mecanografico",
                        "value": "123456",
                        "formVisible": true
                    },
                    {
                        "itemName": "Número sequencial",
                        "item": "num_seq",
                        "value": 1347095,
                        "formVisible": true
                    },
                    {
                        "itemName": "Nome",
                        "item": "Nome",
                        "value": "José da Silva Pinto",
                        "formVisible": true
                    }
                    ]}
        submitButtonDisabled = { false}
        saveButtonDisabled = { false}
        />
    )
};

export default Formu;