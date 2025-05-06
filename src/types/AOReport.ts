export class Nullable<T> {
  constructor(public value: T | null) {}

  isNull(): boolean {
    return this.value === null;
  }
}

export type BudgetClient = {
  min: Nullable<number>;
  max: Nullable<number>;
};

export type RessourceExigence = {
  titre_professionnel: Nullable<string>;
  experiences_requises: string[];
  necessites_ressources: Nullable<string>;
};

export type ExigencesAppelOffre = {
  "exigences générales": string[];
  "exigences des ressources": RessourceExigence[];
};

export type Garantie = {
  garantie_soumission: Nullable<string>;
  garantie_execution: Nullable<string>;
  police_assurance: Nullable<string>;
};

export type Penalite = {
  montant: Nullable<string>;
  description: Nullable<string>;
};

export type CriteresEvaluationAO = {
  description: Nullable<string>;
  nom_critere: Nullable<string>;
  ponderation: Nullable<number>;
  eliminatoire: Nullable<boolean>;
};

export type AOReport = {
  titre_ao: Nullable<string>;
  numero_ao: Nullable<string>;
  date_depot: Nullable<string>;
  clauses_de_limitation: Nullable<string>;
  type_de_contrat: Nullable<string>;
  qualifications_requises: string[];
  marge_preferentielle: Nullable<string>;
  besoins_attentes_client: Nullable<string>;
  client: Nullable<string>;
  departement_client: Nullable<string>;
  mode_travail: Nullable<string>;
  evaluation_efforts_client: Nullable<string>;
  periode: Nullable<string>;
  budget_client: BudgetClient;
  journee_travail_heures: Nullable<number>;
  type_facturation: Nullable<string>;
  technologies_requises: string[];

  exigences_des_ressources: RessourceExigence[];

  poste_travail_a_fournir: Nullable<string>;
  garanties_requises: Garantie;
  penalites: Penalite[];
  penalites_particulieres: Nullable<string>;
  renouvellement_ressources_strategiques: Nullable<string>;
  clause_remplacement_ressources_strategiques: {
    [clause: string]: Nullable<string>;
  }[];

  conditions_paiement_particulieres: Nullable<string>;
  deplacements_prevus: Nullable<string>;
  equipements_logiciels_specifiques: string[];
  travail_lieu: Nullable<string>;
  residence_lieu: Nullable<string>;

  criteres_evaluation_ao: CriteresEvaluationAO[];
  facteur_K: Nullable<number>;
};
