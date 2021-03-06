export type Color =
  | "BLACK"
  | "BLUE"
  | "GREEN"
  | "NEUTRAL"
  | "PURPLE"
  | "RED"
  | "WHITE"
  ;

export type Spec =
  | "BASHING" | "FINESSE"
  | "ANARCHY" | "BLOOD" | "FIRE"
  | "BALANCE" | "FERAL" | "GROWTH"
  | "LAW" | "PEACE" | "TRUTH"
  | "DEMONOLOGY" | "DISEASE" | "NECROMANCY"
  | "DISCIPLINE" | "NINJUTSU" | "STRENGTH"
  | "FUTURE" | "PAST" | "PRESENT"
  ;

export type Addon =
  | "HEROES'_HALL"
  | "SURPLUS"
  | "TECH_LAB"
  | "TOWER"
  ;

export interface GameState {
  activePlayer: PlayerID;
  instances: Record<InstanceID, Instance>;
  nextID: number;
  players: Record<PlayerID, PlayerState>;
}

export type CardID = string;
export type PlayerID = string;
export type InstanceID = string;

export interface PlayerState {
  base: {
    damage: number;
  };
  specs: [Spec, Spec, Spec];
  addon: {
    type: Addon;
    damage: number;
    techLabSpec?: Spec;
  } | null;
  gold: number;
  hand: Array<CardID>;
  deck: Array<CardID>;
  discard: Array<CardID>;
  codex: Array<CardID>;
  patrol: {
    squadLeader: InstanceID | null;
    elite: InstanceID | null;
    scavenger: InstanceID | null;
    technician: InstanceID | null;
    lookout: InstanceID | null;
  };
  techBuildings: [TechBuildingState, TechBuildingState, TechBuildingState];
  mainSpec: Spec | null;
}

export interface Instance {
  id: InstanceID;
  owner: PlayerID;
  controller: PlayerID;
  card: CardID;
  damage: number;
  plusMinusTokens: number;
  specialTokens: Array<string>;
  attachments: Array<Instance>;
  level: number;
  readyState: "READY" | "EXHAUSTED" | "DISABLED";
  arrivalFatigue: boolean;
  armorDamage: number;
}

export interface TechBuildingState {
  purchased: boolean;
  damage: number;
  ready: boolean;
}

export type Card =
  | UnitCard
  | OngoingSpellCard
  | BuildingCard
  | AttachmentSpellCard
  | InstantSpellCard
  | UpgradeCard
  | HeroCard
  ;

interface CardBase {
  color: Color;
  cost: number;
  name: string;
  tags: Array<string>;
  spec: Spec | null;
  boostCost: number | null;
}

export interface UnitCard extends CardBase {
  type: "UNIT";
  attack: number;
  health: number;
  tech: number;
  legendary: boolean;
  token: boolean;
  abilities: Array<Ability>;
}

export interface BuildingCard extends CardBase {
  type: "BUILDING";
  health: number;
  tech: number;
  legendary: boolean;
  abilities: Array<Ability>;
}

export interface UpgradeCard extends CardBase {
  type: "UPGRADE";
  abilities: Array<Ability>;
  legendary: boolean;
}

export interface InstantSpellCard extends CardBase {
  type: "INSTANT_SPELL";
  ultimate: boolean;
  effects: Array<Effect>;
}

export interface OngoingSpellCard extends CardBase {
  type: "ONGOING_SPELL";
  channeling: boolean;
  ultimate: boolean;
  abilities: Array<Ability>;
}

export interface AttachmentSpellCard extends CardBase {
  type: "ATTACHMENT_SPELL";
  ultimate: boolean;
  abilities: Array<Ability>;
}

export interface HeroCard extends CardBase {
  type: "HERO";
  bands: [HeroCardBand, HeroCardBand, HeroCardBand];
}

interface HeroCardBand {
  nextLevel: number | null;
  health: number;
  attack: number;
  abilities: Array<Ability>;
}

export type Ability = "TODO";
export type Effect = "TODO";
