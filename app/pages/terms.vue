<script lang="ts" setup>
definePageMeta({
  auth: false,
});

useHead({
  title: "服务条款 - Meeting Room",
  meta: [
    { name: "description", content: "Meeting Room 会议室管理系统服务条款" },
  ],
});

function goBack() {
  window.history.back();
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
        <h1 class="text-4xl font-bold tracking-tight">服务条款</h1>
        <p class="text-muted-foreground mt-2">最后更新：2025年7月10日</p>
      </div>

      <!-- Content -->
      <Card>
        <CardContent class="prose prose-slate dark:prose-invert max-w-none p-8">
          <section class="mb-8">
            <h2 class="text-2xl font-semibold mb-4">1. 服务说明</h2>
            <p class="mb-4">
              Meeting Room
              是一个会议室管理系统，为用户提供会议室预订、管理和相关服务。通过使用我们的服务，您同意受本服务条款的约束。
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold mb-4">2. 用户账户</h2>
            <ul class="list-disc pl-6 space-y-2">
              <li>您需要通过 GitHub 账户进行身份验证</li>
              <li>您有责任保护您的账户安全</li>
              <li>您对使用您账户进行的所有活动负责</li>
              <li>如发现账户被盗用，请立即联系我们</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold mb-4">3. 服务使用规则</h2>
            <p class="mb-4">在使用我们的服务时，您同意：</p>
            <ul class="list-disc pl-6 space-y-2">
              <li>遵守所有适用的法律法规</li>
              <li>不进行任何可能损害系统的活动</li>
              <li>不滥用会议室预订功能</li>
              <li>及时取消不需要的预订</li>
              <li>尊重其他用户的权利</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold mb-4">4. 会议室预订政策</h2>
            <ul class="list-disc pl-6 space-y-2">
              <li>预订必须提前至少 30 分钟</li>
              <li>如需取消，请提前 15 分钟取消预订</li>
              <li>重复无故缺席可能导致预订权限受限</li>
              <li>会议室使用需遵守相关规章制度</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold mb-4">5. 隐私保护</h2>
            <p class="mb-4">
              我们重视您的隐私。详细的隐私处理方式请参阅我们的
              <NuxtLink to="/privacy" class="text-primary underline"
                >隐私政策</NuxtLink
              >。
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold mb-4">6. 服务变更</h2>
            <p class="mb-4">
              我们保留随时修改或终止服务的权利。重大变更将提前通知用户。
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold mb-4">7. 免责声明</h2>
            <p class="mb-4">
              本服务按"现状"提供，我们不对服务的可用性、准确性或完整性做出保证。
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold mb-4">8. 联系我们</h2>
            <p class="mb-4">
              如果您对本服务条款有任何疑问，请通过以下方式联系我们：
            </p>
            <ul class="list-disc pl-6 space-y-2">
              <li>邮箱：support@meetingroom.com</li>
              <li>电话：400-000-0000</li>
            </ul>
          </section>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
