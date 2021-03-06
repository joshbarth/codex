import { GameState } from "../types";

import { discardHand, playCard } from "./hand";
import { endTurn } from "./turn";

export type Action = {
  type: "DISCARD_HAND";
} | {
  type: "PLAY_CARD";
  cardID: string;
  boost: boolean;
} | {
  type: "END_TURN";
}
export const performAction = (
  $: GameState,
  action: Action,
): void => {
  switch (action.type) {
  case "DISCARD_HAND":
    discardHand($);
    break;
  case "END_TURN":
    endTurn($);
    break;
  case "PLAY_CARD":
    playCard($, action.cardID, action.boost);
    break;
  default:
    throw new Error(
      `Unrecognized action type: ${(action as { type: unknown }).type}`,
    );
  }
};
