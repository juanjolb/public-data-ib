export interface Contractes {
  rgan_contractaci: string;
  data_darrer_anunci_plataforma: Date;
  expedient: string;
  enlla: Enlla;
  t_tol: string;
  tipus_contracte: TipusContracte;
  procediment_contractaci: ProcedimentContractaci;
  pressupost_expedient: string;
  pressupost_expedient_sense: string;
  modificacions_import: string;
  modificacions_termini: string;
  pr_rroga_d_un_altre_expedient: string;
  resultat_adjudicaci: ResultatAdjudicaci;
  data_acord_adjudicaci: Date;
  data_formalitzaci: Date;
  cif_adjudicatari?: string;
  nom_adjudicatari?: string;
  import_adjudicaci: string;
  import_adjudicaci_sense_iva: string;
  ofertes_rebudes: string;
  tipus_tramitaci_: TipusTramitaci;
  financiaci_ue?: string;
  fons_que_el_financia?: string;
  lot?: string;
  pressupost_lot?: string;
  pressupost_lot_sense_imposts?: string;
}

export interface ContractesData {
  Títol: string;
  Data_acord: Date;
  Resultat_adjudicacio: ResultatAdjudicaci;
  Adjudicatari: string | undefined;
  Pressupost: Number;
  Import_adjudicació: Number;
}

export interface Enlla {
  url: string;
}

export enum ProcedimentContractaci {
  ConcursDeProjectes = 'Concurs de projectes',
  ContracteMenor = 'Contracte menor',
  DerivatDAcordMarc = "Derivat d'acord marc",
  NegociatAmbPublicitat = 'Negociat amb publicitat',
  NegociatSensePublicitat = 'Negociat sense publicitat',
  Obert = 'Obert',
  ObertSimplificat = 'Obert simplificat',
  Restringit = 'Restringit',
}

export enum ResultatAdjudicaci {
  Adjudicat = 'Adjudicat',
  Desert = 'Desert',
  Desistiment = 'Desistiment',
  Formalitzat = 'Formalitzat',
}

export enum TipusContracte {
  AdministratiuEspecial = 'Administratiu especial',
  Empty = '-',
  GestióDeServeisPúblics = 'Gestió de serveis públics',
  Obres = 'Obres',
  Privat = 'Privat',
  Serveis = 'Serveis',
  Subministraments = 'Subministraments',
}

export enum TipusTramitaci {
  Emergència = 'Emergència',
  Ordinària = 'Ordinària',
  Urgència = 'Urgència',
}
