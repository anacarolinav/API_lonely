import React, { useState } from "react";
import * as XLSX from "xlsx";


const mapping = {
  //key está no jdt
  //value do dict está no excel mas temos de ir buscar o value da TAG

  //agora eu quero fazer uma função composition que cria um dicionário em que a key 
  //do dicionário é o item.0.0.items.0 que está no jdt e o value do dicionário está no 
  //excel associado à TAG que está no mapping

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

  'items.0.0.items.8.items.0': 'INFECADM20', //comentarios dentro
  'items.0.0.items.8.items.1': 'INFECADM10',//'Infeção aguda à admissão',
  'items.0.0.items.8.items.2': 'INFECADM30',//'Local da infeção'
  'items.0.0.items.9': 'SINDROBS01', //comentarios fora

  'items.0.1.items.0': 'Título',//INUTIL nao existe --Nao ha stress fica em branco
  'items.0.1.items.1': 'NADMSCI137',//historia da doença atual
  'items.0.2.items.0.items.0': 'NADMSCI17',//temperatura
  'items.0.2.items.1.items.0': 'NADMSCI171',//rate
  'items.0.2.items.2.items.0': 'NADMSCI172',//diastolic = TA
  'items.0.2.items.2.items.1': 'NADMSCI173',//sistolic é o da barra

  'items.0.2.items.3.items.0': 'NADMSCI176', //FR
  'items.0.2.items.4.items.0': 'NADMSCI177',//SatO2
  'items.0.2.items.4.items.1': 'NADMSCI178', //Fi O2

  'items.0.3.items.0': 'NADMSCI179',//peso
  'items.0.4.items.0': 'NADMSCI1711',
  'items.0.5.items.0': 'NADMSCI1713'

};


function ReadExcels() {
  const [items, setItems] = useState([]);

  const readExcel = (file) => {
    console.log("Starting readExcel");

    const promise = new Promise((resolve, reject) => {

      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        console.log("FileReader onload");

        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);

      };

      fileReader.onerror = (error) => {
        console.error(error);
        reject(error);
      };
    });

    promise.then((d) => {
      console.log("Promise resolved");
      console.log(d);
      setItems(d);
    }).catch((error) => {
      console.error(error);
    });

    console.log("Finishing readExcel");

  };


  return (
    <div>

      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);

        }}
      />

      <table class="table container">
        <thead>
          <tr>
            <th scope="col">EPISODIO</th>
            <th scope="col">DATACRIACAO</th>

          </tr>
        </thead>
        <tbody>
          {items.map((d) => (
            <tr key={d.EPISODIO}>
              <th>{d.EPISODIO}</th>
              <td>{new Date((d.DATACRIACAO - 25569) * 86400 * 1000).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default ReadExcels;