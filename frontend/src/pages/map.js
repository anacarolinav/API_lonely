import React, { useState } from 'react';
import * as xlsx from 'xlsx';

import JDT from '../jdt.json';


function Mapeamento() {



    const [valoresJson, setValoresJson] = useState({});
    const [composition, setComposition] = useState({});


    function converterDataSerialParaDataHora(dataSerial, tipo) {
        // Crie um objeto Date a partir da data serial
        var data = new Date((dataSerial - 25569) * 86400 * 1000);

        // Formate a data e hora
        var dataFormatada = data.toISOString().replace('T', ' ').slice(0, 19);

        // Verifique o tipo solicitado
        if (tipo === 'data') {
            // Se for solicitado apenas a data, retorne a parte da data formatada
            return dataFormatada.slice(0, 10);
        } else if (tipo === 'hora') {
            // Se for solicitado apenas a hora, retorne a parte da hora formatada
            return dataFormatada.slice(11);
        } else {
            // Se nenhum tipo for solicitado ou o tipo for inválido, retorne a data formatada completa
            return dataFormatada;
        }
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const buffer = reader.result;
            const workbook = xlsx.read(buffer, { type: 'buffer' });


            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const myObject = xlsx.utils.sheet_to_json(worksheet);
            const valores_json = myObject[1];


            let variavel_true;
            for (let key in valores_json) {

                if (valores_json[key] === "True") {
                    variavel_true = key;
                }
            }


            let composition = {
                "items.0.0.items.O.value": { "code": "at0014", "id": valores_json["EPISODIO"], "type": "local" },

                "items.0.0.items.1.date": converterDataSerialParaDataHora(valores_json["DATACRIACAO"], 'data'),
                "items.0.0.items.1.time": converterDataSerialParaDataHora(valores_json["DATACRIACAO"], 'hora'),


                "items.0.0.items.2.value": { "code": JDT.items[0][0].items[2].itemsList.find(item => item.text === valores_json["SINDR01"]).code, "text": valores_json["SINDR01"] },

                "items.0.0.items.3.value": { "code": JDT.items[0][0].items[3].itemsList.find(item => item.text === valores_json["SINDR02"]).code, "text": valores_json["SINDR02"] },
                "items.0.0.items.4.value": { "code": JDT.items[0][0].items[4].itemsList.find(item => item.text === valores_json["SINDR03"]).code, "text": valores_json["SINDR03"] },
                "items.0.0.items.5.value": { "code": JDT.items[0][0].items[5].itemsList.find(item => item.text === valores_json["NADMSCI11"]).code, "text": valores_json["NADMSCI11"] },
                "items.0.0.items.6.value": { "code": JDT.items[0][0].items[6].itemsList.find(item => item.text === valores_json["NADMSCI12"]).code, "text": valores_json["NADMSCI12"] },

                "items.0.0.items.7.items.0.value": {
                    "code": variavel_true,
                    "text": JDT.items[0][0].items[7].items[0].itemsList.find(item => item.code === variavel_true).text
                },

                "items.0.0.items.7.items.1.value": null,
                "items.0.0.items.8.items.0.value": null,

                "items.0.0.items.8.items.1.value": {
                    "code": JDT.items[0][0].items[8].items[1].itemsList.find(item => item.text === valores_json["INFECADM10"]).code,
                    "text": valores_json["INFECADM10"]
                },

                "items.0.0.items.8.items.2.value": {
                    "code": "at0003",
                    "text": valores_json["INFECADM30"],
                },
                "items.0.0.items.9.value": null,
                "items.0.1.items.0.value": null,

                "items.0.1.items.1.value": [
                    {
                        "code": "at0004",
                        "text": valores_json["NADMSCI137"],
                    }
                ],

                "items.0.2.items.0.items.0.value.unit": "Cel",
                "items.0.2.items.0.items.0.value.value": valores_json["NADMSCI17"],

                "items.0.2.items.1.items.0.value.unit": "/min",
                "items.0.2.items.1.items.0.value.value": valores_json["NADMSCI171"],

                "items.0.2.items.2.items.0.value.unit": "mm[Hg]",
                "items.0.2.items.2.items.0.value.value": valores_json["NADMSCI172"],

                "items.0.2.items.2.items.1.value.unit": "mm[Hg]",
                "items.0.2.items.2.items.1.value.value": valores_json["NADMSCI173"],

                "items.0.2.items.3.items.0.value.unit": "/min",
                "items.0.2.items.3.items.0.value.value": valores_json["NADMSCI176"],

                "items.0.2.items.4.items.0.value": valores_json["NADMSCI177"],
                "items.0.2.items.4.items.1.value": valores_json["NADMSCI178"],

                "items.0.3.items.0.value.unit": "kg",
                "items.0.3.items.0.value.value": valores_json["NADMSCI179"],
                "items.0.4.items.0.value.unit": "cm",
                "items.0.4.items.0.value.value": valores_json["NADMSCI1711"],
                "items.0.5.items.0.value.unit": "kg/m2",
                "items.0.5.items.0.value.value": valores_json["NADMSCI1713"],

                "items.0.6.items.0.value.unit": "cm",
                "items.0.6.items.0.value.value": valores_json["NADMSCI1715"],

            }
            console.log(composition);
            setValoresJson(valores_json);
            setComposition(composition);
        };
        reader.readAsArrayBuffer(file);

    };

    const outputElements = [];

    const renderValue = (value) => {
        if (typeof value === "object" && value !== null) {
            // If the value is an object, recursively call the loop on that object
            const nestedElements = [];
            for (const key in value) {
                nestedElements.push(
                    <tr key={key}>
                        <td>{key}</td>
                        <td>{renderValue(value[key])}</td>
                    </tr>
                );
            }
            return <table>{nestedElements}</table>;
        } else {
            // If the value is not an object, simply return it
            return value;
        }
    };

    for (const key in composition) {
        outputElements.push(
            <tr key={key}>
                <td>{key}</td>
                <td>{renderValue(composition[key])}</td>
            </tr>
        );
    }

    return (
        <div>
            <input type="file" onChange={(event) => handleFileChange(event)} />
            <table>
                <tbody>{outputElements}</tbody>
            </table>
        </div>
    );


}

export default Mapeamento;
