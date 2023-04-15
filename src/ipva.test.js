const {ipva} = require('./ipva')
const {aliquota} = require('./config/aliquota')
const {values} = require('./config/values');
const { limits } = require('./config/limits');

describe("Conjunto de teste da função ipva()", () => {
  test(`deve retornar ${values.invalidParameter} para parâmetros inválidos da função`, () => {
    const primeiroVeiculo = Object.keys(aliquota)[0];

    expect(ipva()).toEqual(values.invalidParameter);
    expect(ipva(primeiroVeiculo, 1_000)).toEqual(values.invalidParameter);
    expect(ipva("c", 1_000)).toEqual(values.invalidParameter);
    expect(ipva(primeiroVeiculo, 1_000)).toEqual(values.invalidParameter);
    expect(ipva("*!#@", 1_000)).toEqual(values.invalidParameter);
    expect(ipva(-200)).toEqual(values.invalidParameter);
    expect(ipva(limits.minValue - 1)).toEqual(values.invalidParameter);
    expect(ipva(1_000, 10)).toEqual(values.invalidParameter);
    expect(ipva(1_000, "jacare")).toEqual(values.invalidParameter);
    expect(ipva(1_000, " ")).toEqual(values.invalidParameter);
    expect(ipva(1_000, primeiroVeiculo.toUpperCase())).toEqual(values.invalidParameter);
    expect(ipva(limits.minValue - 1, primeiroVeiculo)).toEqual(values.invalidParameter);
    expect(ipva(limits.maxValue + 1, primeiroVeiculo)).toEqual(values.invalidParameter);
  });
  
  const testValues = [100_000, 19.90, 45.70, 500, 1];

  Object.keys(aliquota).forEach(tipo => {
    test(`deve aplicar alíquota de ${aliquota[tipo]}% para ${tipo}`, () => {
      testValues.forEach(valor => {
        expect(ipva(valor, tipo)).toEqual(valor * aliquota[tipo] / 100);
      })
    });
  })
})