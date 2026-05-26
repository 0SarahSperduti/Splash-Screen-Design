export interface PenaData {
  anos: number;
  meses: number;
  dias: number;
  dataInicio: string;
  detracao: number;
  tipoAtual: 'comum' | 'hediondo';
  status: 'primario' | 'reincidente';
}

export interface ResultadoCalculo {
  progressaoSemiaberto: string;
  progressaoAberto: string;
  livramentoCondicional: string;
}

export function calcularPena(data: PenaData): ResultadoCalculo {
  // Converter pena total para dias
  const penaTotalDias = (data.anos * 365) + (data.meses * 30) + data.dias;

  // Aplicar detração
  const penaEfetivaDias = penaTotalDias - data.detracao;

  // Data de início
  const dataInicio = new Date(data.dataInicio);

  // Percentuais baseados no tipo de crime e status
  let percentualSemiaberto: number;
  let percentualAberto: number;
  let percentualLivramento: number;

  if (data.tipoAtual === 'hediondo') {
    percentualSemiaberto = data.status === 'primario' ? 0.40 : 0.50;
    percentualAberto = data.status === 'primario' ? 0.60 : 0.70;
    percentualLivramento = data.status === 'primario' ? 0.66 : 0.80;
  } else {
    percentualSemiaberto = data.status === 'primario' ? 0.16 : 0.25;
    percentualAberto = data.status === 'primario' ? 0.33 : 0.50;
    percentualLivramento = data.status === 'primario' ? 0.50 : 0.66;
  }

  // Calcular datas
  const diasSemiaberto = Math.floor(penaEfetivaDias * percentualSemiaberto);
  const diasAberto = Math.floor(penaEfetivaDias * percentualAberto);
  const diasLivramento = Math.floor(penaEfetivaDias * percentualLivramento);

  const dataSemiaberto = new Date(dataInicio);
  dataSemiaberto.setDate(dataSemiaberto.getDate() + diasSemiaberto);

  const dataAberto = new Date(dataInicio);
  dataAberto.setDate(dataAberto.getDate() + diasAberto);

  const dataLivramento = new Date(dataInicio);
  dataLivramento.setDate(dataLivramento.getDate() + diasLivramento);

  return {
    progressaoSemiaberto: dataSemiaberto.toLocaleDateString('pt-BR'),
    progressaoAberto: dataAberto.toLocaleDateString('pt-BR'),
    livramentoCondicional: dataLivramento.toLocaleDateString('pt-BR'),
  };
}
