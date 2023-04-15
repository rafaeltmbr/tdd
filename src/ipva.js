const {aliquota} = require('./config/aliquota')
const {values} = require('./config/values')
const {limits} = require('./config/limits')

/**
 * Função para cálculo de IPVA baseado na alícota de
 * veículos do estado de São Paulo.
 * @param {number} valor Valor de tabela do veículo (vide Tabela Fipe).
 * @param {string} tipo Tipo do veículo de acordo com a tabela de alícota.
 * @returns Valor do IPVA baseado na alícota do estado de São Paulo.
 */
function ipva(valor, tipo) {
  if (typeof valor !== 'number' || valor < limits.minValue || valor > limits.maxValue) return values.invalidParameter;

  if (typeof tipo !== 'string' || !Object.keys(aliquota).includes(tipo)) return values.invalidParameter;

  return valor * aliquota[tipo] / 100;
}

module.exports = {ipva}