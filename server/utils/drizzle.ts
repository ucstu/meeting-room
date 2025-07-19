import { drizzle } from "drizzle-orm/d1";

import * as schema from "../database/schema";
export { and, eq, or, sql } from "drizzle-orm";

export const tables = schema;

export function useDrizzle() {
  return drizzle(hubDatabase(), { schema });
}

export type Room = typeof schema.rooms.$inferSelect;
export type Team = typeof schema.teams.$inferSelect;
export type UserRooms = typeof schema.userRooms.$inferSelect;
export type UserTeams = typeof schema.userTeams.$inferSelect;
export type TeamRooms = typeof schema.teamRooms.$inferSelect;
