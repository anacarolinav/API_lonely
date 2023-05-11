import React, { useState } from 'react';
import * as xlsx from 'xlsx';


function AiAi() {
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

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const buffer = reader.result;
            const workbook = xlsx.read(buffer, { type: 'buffer' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const myObject = xlsx.utils.sheet_to_json(worksheet);
            const valores_json = myObject[1];
            console.log(valores_json);
        };
        reader.readAsArrayBuffer(file);
    };



    const receber_json = valores_json;




    const extrairValores = (objeto, mapeamento) => {
        const resultado = {};
        for (const chave in mapeamento) {
            if (typeof mapeamento[chave] === 'string') {
                const caminho = mapeamento[chave].split('.');
                let valor = objeto;
                for (const parte of caminho) {
                    if (valor && typeof valor === 'object') {
                        valor = valor[parte];
                    } else {
                        valor = undefined;
                        break;
                    }
                }
                resultado[chave] = valor;
            } else if (Array.isArray(mapeamento[chave])) {
                const caminhos = mapeamento[chave];
                for (const caminho of caminhos) {
                    if (typeof caminho === 'string') {
                        const partes = caminho.split('.');
                        let valor = objeto;
                        for (const parte of partes) {
                            if (valor && typeof valor === 'object') {
                                valor = valor[parte];
                            } else {
                                valor = undefined;
                                break;
                            }
                        }
                        resultado[chave] = resultado[chave] || [];
                        resultado[chave].push(valor);
                    }
                }
            }
        }
        return resultado;
    };





    const output = extrairValores(receber_json, mapping);


    return (
        <div>

            <input
                type="file"
                onChange={(e) => {
                    const file = e.target.files[0];
                    handleFileChange(file);

                }}
            />

            <table class="table container">
                <tbody>
                    <tr>
                        <td>{output}</td>
                    </tr>
                </tbody>
            </table>

        </div>
    );
}

export default AiAi;
