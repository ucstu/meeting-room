export default defineEventHandler(async (event) => {
  const drizzle = useDrizzle();
  const session = await requireUserSession(event);

  // 获取请求头
  const teamID = getHeader(event, "X-MR-Team-Id") as string | undefined;
  if (teamID) {
    const userTeam = await drizzle
      .select()
      .from(tables.userTeams)
      .where(
        and(
          eq(tables.userTeams.userId, session.user.githubId),
          eq(tables.userTeams.teamId, teamID),
        ),
      )
      .limit(1);

    // 如果没有找到，抛出错误
    if (userTeam.length === 0) {
      throw createError({
        statusCode: 403,
        message: "你不是该团队的成员",
      });
    }
  }
});
