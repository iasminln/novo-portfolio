export type PeriodoMes = {
  mes: number; // 1-12
  ano: number;
};

/** `null` = emprego atual (fim = hoje) */
export type PeriodoFim = PeriodoMes | null;

const MESES_ABREV = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
] as const;

function formatarMesAno({ mes, ano }: PeriodoMes): string {
  return `${MESES_ABREV[mes - 1]} de ${ano}`;
}

/** Contagem inclusiva de meses (ex.: set/2025 → mai/2026 = 9 meses). */
export function calcularMesesTotais(inicio: PeriodoMes, fim: PeriodoMes): number {
  return (fim.ano - inicio.ano) * 12 + (fim.mes - inicio.mes) + 1;
}

export function formatarDuracao(totalMeses: number): string {
  if (totalMeses <= 0) return "menos de 1 mês";

  const anos = Math.floor(totalMeses / 12);
  const meses = totalMeses % 12;

  const parteAnos =
    anos === 0 ? "" : anos === 1 ? "1 ano" : `${anos} anos`;
  const parteMeses =
    meses === 0 ? "" : meses === 1 ? "1 mês" : `${meses} meses`;

  if (parteAnos && parteMeses) return `${parteAnos} e ${parteMeses}`;
  return parteAnos || parteMeses;
}

export function formatarPeriodo(inicio: PeriodoMes, fim: PeriodoFim): string {
  const inicioFmt = formatarMesAno(inicio);
  if (!fim) return `${inicioFmt} - atual`;
  return `${inicioFmt} - ${formatarMesAno(fim)}`;
}

export function calcularDuracao(
  inicio: PeriodoMes,
  fim: PeriodoFim,
  referencia: Date = new Date()
): string {
  const fimEfetivo: PeriodoMes = fim ?? {
    mes: referencia.getMonth() + 1,
    ano: referencia.getFullYear(),
  };

  return formatarDuracao(calcularMesesTotais(inicio, fimEfetivo));
}

export function isEmpregoAtual(fim: PeriodoFim): boolean {
  return fim === null;
}
