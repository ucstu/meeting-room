export default defineEventHandler(async (event) => {
  const drizzle = useDrizzle();
  const session = await requireUserSession(event);

  // 获取用户所在的团队
  const userTeams = await drizzle
    .select()
    .from(tables.userTeams)
    .where(eq(tables.userTeams.userId, session.user.githubId));

  // 获取用户创建的房间
  const userRooms = await drizzle
    .select()
    .from(tables.userRooms)
    .where(eq(tables.userRooms.userId, session.user.githubId))
    .fullJoin(tables.rooms, eq(tables.userRooms.roomId, tables.rooms.id));

  // 获取用户所在的团队的房间
  const teamRooms = await drizzle
    .select()
    .from(tables.teamRooms)
    .where(
      or(...userTeams.map((team) => eq(tables.teamRooms.teamId, team.teamId))),
    )
    .fullJoin(tables.rooms, eq(tables.teamRooms.roomId, tables.rooms.id))
    .fullJoin(tables.teams, eq(tables.teamRooms.teamId, tables.teams.id));

  // 合并用户房间和团队房间
  const rooms = [
    ...userRooms.map((ur) => ({
      ...ur,
      team: null,
    })),
    ...teamRooms.map((tr) => ({
      ...tr,
      team: tr.teams,
    })),
  ];

  return rooms;
});
