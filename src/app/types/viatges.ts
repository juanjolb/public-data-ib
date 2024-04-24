export interface Viatges {
  unitat_org_nica: string;
  responsable?: string;
  data_inici: Date;
  data_fi: Date;
  dest: string;
  despesa_total: string;
  despesa_allotjament: string;
  despesa_manutenci: string;
  despesa_transport: string;
  altres_despeses_generals: string;
  motivaci: string;
}

export interface ViatgesData {
  Data_inici: Date;
  Data_fi: Date;
  Responsable?: string;
  Destí: string;
  Despesa_total: Number;
  Motivació: string;
}
