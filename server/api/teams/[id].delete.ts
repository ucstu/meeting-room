export default defineEventHandler(async (event) => {
  const drizzle = useDrizzle();
  const session = await requireUserSession(event);

  // 判断是否传入团队 ID
  const teamId = getQuery(event).teamId as string | undefined;
  if (teamId) {
    // 查询用户是否在该团队中通过count
    const userTeam = await drizzle
      .select()
      .from(tables.userTeams)
      .where(
        and(
          eq(tables.userTeams.userId, session.user.githubId),
          eq(tables.userTeams.teamId, teamId),
        ),
      )
      .limit(1);
    // 如果没有找到，抛出错误
    if (userTeam.length === 0) {
      throw createError({
        statusCode: 403,
        message: "You are not a member of this team.",
      });
    }
  } else {
    // 创建房间并关联房间与用户
    // 通过事务进行提交
  }
});
