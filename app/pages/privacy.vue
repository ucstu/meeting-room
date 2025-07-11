<script lang="ts" setup>
definePageMeta({
  auth: false,
});

useSeoMeta({
  title: "隐私政策 - Meeting Room",
  description: "Meeting Room 在线会议平台隐私政策",
  ogTitle: "隐私政策 - Meeting Room",
  ogDescription: "Meeting Room 在线会议平台隐私政策",
});

function goBack() {
  history.back();
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="sm" @click="goBack">
            <icon name="i-lucide-arrow-left" class="w-4 h-4 mr-2" />
            返回
          </Button>
        </div>
        <h1 class="text-4xl font-bold tracking-tight">隐私政策</h1>
        <p class="text-muted-foreground mt-2">最后更新：2025年7月10日</p>
      </div>

      <!-- Content -->
      <Card>
        <CardContent class="prose prose-slate dark:prose-invert max-w-none p-8">
          <section class="mb-8">
            <h2 class="text-2xl font-semibold mb-4">1. 信息收集</h2>
            <p class="mb-4">我们收集以下类型的信息：</p>
            <h3 class="text-xl font-semibold mb-3">1.1 账户信息</h3>
            <ul class="list-disc pl-6 space-y-2 mb-4">
              <li>GitHub 用户名和基本资料信息</li>
              <li>邮箱地址（如果公开）</li>
              <li>头像信息</li>
            </ul>

            <h3 class="text-xl font-semibold mb-3">1.2 使用数据</h3>
            <ul class="list-disc pl-6 space-y-2">
              <li>在线会议预订记录</li>
              <li>登录时间和频率</li>
              <li>系统使用日志</li>
              <li>设备和浏览器信息</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold mb-4">2. 信息使用</h2>
            <p class="mb-4">我们使用收集的信息用于：</p>
            <ul class="list-disc pl-6 space-y-2">
              <li>提供和维护在线会议服务</li>
              <li>处理会议预订请求</li>
              <li>发送服务相关通知</li>
              <li>改进系统功能和用户体验</li>
              <li>防止滥用和维护系统安全</li>
              <li>遵守法律要求</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold mb-4">3. 信息共享</h2>
            <p class="mb-4">
              我们不会出售、交易或出租您的个人信息。我们可能在以下情况下共享信息：
            </p>
            <ul class="list-disc pl-6 space-y-2">
              <li>获得您的明确同意</li>
              <li>遵守法律要求或司法程序</li>
              <li>保护我们的权利、财产或安全</li>
              <li>与服务提供商共享（仅限于提供服务所需）</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold mb-4">4. 数据安全</h2>
            <p class="mb-4">我们采取多种安全措施保护您的信息：</p>
            <ul class="list-disc pl-6 space-y-2">
              <li>使用 HTTPS 加密传输</li>
              <li>定期安全审计和更新</li>
              <li>访问控制和权限管理</li>
              <li>数据备份和恢复机制</li>
              <li>员工隐私培训</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold mb-4">5. Cookie 使用</h2>
            <p class="mb-4">我们使用 Cookie 和类似技术来：</p>
            <ul class="list-disc pl-6 space-y-2">
              <li>记住您的登录状态</li>
              <li>保存您的偏好设置</li>
              <li>分析网站使用情况</li>
              <li>提供个性化体验</li>
            </ul>
            <p class="mt-4">
              您可以通过浏览器设置管理 Cookie，但这可能影响某些功能的使用。
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold mb-4">6. 数据保留</h2>
            <p class="mb-4">我们只在必要期间保留您的信息：</p>
            <ul class="list-disc pl-6 space-y-2">
              <li>账户信息：直到您删除账户</li>
              <li>预订记录：保留 2 年用于审计</li>
              <li>日志数据：保留 90 天</li>
              <li>备份数据：保留 1 年</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold mb-4">7. 您的权利</h2>
            <p class="mb-4">您有权：</p>
            <ul class="list-disc pl-6 space-y-2">
              <li>访问您的个人信息</li>
              <li>更正不准确的信息</li>
              <li>删除您的账户和相关数据</li>
              <li>限制信息处理</li>
              <li>数据可携带性</li>
              <li>撤回同意</li>
            </ul>
            <p class="mt-4">要行使这些权利，请联系我们的支持团队。</p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold mb-4">8. 第三方服务</h2>
            <p class="mb-4">
              我们使用 GitHub OAuth 进行身份验证。请查阅
              <a
                href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
                target="_blank"
                rel="noopener noreferrer"
                class="text-primary underline"
              >
                GitHub 隐私政策
              </a>
              了解 GitHub 如何处理您的信息。
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold mb-4">9. 未成年人隐私</h2>
            <p class="mb-4">
              我们的服务不面向 13 岁以下的儿童。如果您未满 18
              岁，请在使用我们的服务前获得监护人同意。
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold mb-4">10. 政策变更</h2>
            <p class="mb-4">
              我们可能会更新本隐私政策。重大变更将通过以下方式通知您：
            </p>
            <ul class="list-disc pl-6 space-y-2">
              <li>在网站上发布显著通知</li>
              <li>通过邮箱发送通知（如果有）</li>
              <li>在系统内推送通知</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold mb-4">11. 联系我们</h2>
            <p class="mb-4">
              如果您对本隐私政策有任何疑问或需要行使您的权利，请联系我们：
            </p>
            <ul class="list-disc pl-6 space-y-2">
              <li>邮箱：privacy@meetingroom.com</li>
              <li>电话：400-000-0000</li>
              <li>地址：北京市朝阳区 XXX 街道 XXX 号</li>
            </ul>
          </section>

          <div class="mt-8 p-4 bg-muted rounded-lg">
            <p class="text-sm text-muted-foreground">
              <strong>注意：</strong
              >本隐私政策是我们承诺保护您隐私的重要文件。我们建议您定期查看以了解任何更新。
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
