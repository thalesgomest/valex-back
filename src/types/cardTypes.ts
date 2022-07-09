import { Card } from "../interfaces/cardInterface.js";

export type CardInsertData = Omit<Card, "id">;
export type CardUpdateData = Partial<Card>;
