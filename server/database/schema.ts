import { sqliteTable, text } from "drizzle-orm/sqlite-core";

/**
 * 团队
 */
export const teams = sqliteTable("teams", {
  /**
   * 团队 ID
   */
  id: text("id").primaryKey(),
  /**
   * 团队名称
   */
  name: text("name").notNull(),
  /**
   * 团队创建者
   */
  owner: text("owner").notNull(),
  /**
   * 团队成员列表
   * 存储为 JSON 字符串
   */
  members: text("members").notNull().default("[]"),
});

/**
 * 房间
 */
export const rooms = sqliteTable("rooms", {
  /**
   * 房间 ID
   */
  id: text("id").primaryKey(),
  /**
   * 房间名称
   */
  name: text("name").notNull(),
  /**
   * 房间成员列表
   * 存储为 JSON 字符串
   */
  members: text("members").notNull().default("[]"),
});

/**
 * 用户-房间关联
 */
export const userRooms = sqliteTable("user_rooms", {
  /**
   * 用户 ID
   */
  userId: text("user_id").notNull(),
  /**
   * 房间 ID
   */
  roomId: text("room_id").notNull(),
});

/**
 * 用户-团队关联
 */
export const userTeams = sqliteTable("user_teams", {
  /**
   * 用户 ID
   */
  userId: text("user_id").notNull(),
  /**
   * 团队 ID
   */
  teamId: text("team_id").notNull(),
});

/**
 * 团队-房间关联
 */
export const teamRooms = sqliteTable("team_rooms", {
  /**
   * 团队 ID
   */
  teamId: text("team_id").notNull(),
  /**
   * 房间 ID
   */
  roomId: text("room_id").notNull(),
});
