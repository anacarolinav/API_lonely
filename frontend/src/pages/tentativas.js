
const xlsx = require('xlsx');

// Lê o arquivo Excel
const workbook = xlsx.readFile('/Users/anacarolinaalves/Desktop/MESTRADO/2/ApI/doc_admissao_EPISOCIO1.xlsx');

// Seleciona a primeira planilha
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//console.log(worksheet);

// Converte a planilha em objeto JSON
const myObject = xlsx.utils.sheet_to_json(worksheet);
const valores_json = myObject[1];
//console.log(myObject);




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


function extrairValores(objeto, mapeamento) {
    const resultado = {};

    // percorrer o mapeamento
    for (const chave in mapeamento) {
        //console.log(typeof (mapeamento[chave]) + mapeamento[chave]);
        if (typeof (mapeamento[chave]) === 'string') {
            const caminho = mapeamento[chave].split('.');
            let valor = objeto;



            // percorrer o caminho até a chave final
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
            //console.log("Array");
            const caminhos = mapeamento[chave];
            for (const caminho of caminhos) {
                if (typeof (caminho) === 'string') {
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
                    if (typeof valor === 'object') {
                        resultado[chave].push({ valor: true, posicao: posicao });
                    } else {
                        resultado[chave].push(valor);
                    }
                }
                
            }
        }
    }

    return resultado;
}

const valores = extrairValores(valores_json, mapping);
console.log(valores);

/*
{
  'items.0.0.items.0': 22001350,
  'items.0.0.items.1': 44572.89513888889,
  'items.0.0.items.2': 'Febre',
  'items.0.0.items.3': '- escolha -',
  'items.0.0.items.4': '- escolha -',
}
*/
