export interface Despeses {
  unitat_org_nica: string;
  responsable: string;
  tipus_de_despesa: TipusDeDespesa;
  data: Date;
  import: string;
  motivaci?: string;
  assistents?: string;
  observacions?: string;
}

export interface DespesesData {
  Data: Date;
  Responsable: string;
  Assistents?: string;
  Unitat_organica: string;
  Tipus_despesa: TipusDeDespesa;
  Motivació?: string;
  Import: Number;
  Observacions?: string;
}

export enum TipusDeDespesa {
  Altres = 'Altres',
  Aparcament = 'Aparcament',
  Berenar = 'Berenar',
  Cafè = 'Cafè',
  Dinar = 'Dinar',
  QuilometratgeCotxe = 'Quilometratge cotxe',
  Sopar = 'Sopar',
  Taxi = 'Taxi',
  TrajecteCotxe = 'Trajecte cotxe',
}
