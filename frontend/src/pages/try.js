const fs = require('fs');
const xlsx = require('xlsx');

// Defina o caminho dos arquivos JDT.json e Excel
const jdtPath = '../jdt.json';
const excelPath = './dados.xlsx';

function extrairDadosDoJdtEMapearComExcel(mapping, jdtPath, excelPath) {
  // Ler o arquivo JDT.json
  const jdtFile = fs.readFileSync(jdtPath, 'utf-8');
  const jdtData = JSON.parse(jdtFile);

  // Ler o arquivo Excel e obter a planilha desejada
  const excelFile = xlsx.readFile(excelPath);
  const sheetName = 'nome_da_planilha'; // Substitua pelo nome da sua planilha
  const sheet = excelFile.Sheets[sheetName];

  // Criar um objeto para armazenar os dados extraídos do JDT.json
  const jdtDataDict = {};

  // Iterar sobre as chaves do mapeamento e extrair os dados do JDT.json
  for (const [key, value] of Object.entries(mapping)) {
    const jdtValue = extractValueFromJdt(key, jdtData);
    jdtDataDict[value] = jdtValue;
  }

  // Criar um objeto para armazenar os dados extraídos do Excel
  const excelDataDict = {};

  // Iterar sobre as chaves do mapeamento e extrair os dados do Excel
  for (const [key, value] of Object.entries(mapping)) {
    const excelCell = sheet[key];
    const excelValue = excelCell ? excelCell.v : null;
    excelDataDict[value] = excelValue;
  }

  // Combinar os dados extraídos do JDT.json e do Excel
  const combinedDataDict = { ...jdtDataDict, ...excelDataDict };

  return combinedDataDict;
}

// Função auxiliar para extrair o valor de uma chave no JDT.json
function extractValueFromJdt(key, data) {
  const keys = key.split('.');
  let value = data;

  for (const k of keys) {
    value = value[k];
  }

  return value;
}
