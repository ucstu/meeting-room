<script lang="ts" setup>
function redirectToGithub() {
  window.location.href = "/auth/github";
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-background p-4">
    <div class="w-full max-w-md space-y-6">
      <!-- Logo/Brand section -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold tracking-tight">Meeting Room</h1>
        <p class="text-muted-foreground mt-2">管理您的会议室预订</p>
      </div>

      <!-- Login Card -->
      <Card class="w-full">
        <CardHeader class="text-center space-y-1">
          <CardTitle class="text-2xl font-bold">欢迎回来</CardTitle>
          <CardDescription> 使用您的 GitHub 账户登录以继续 </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <Button
            class="w-full"
            size="lg"
            variant="default"
            @click="redirectToGithub"
          >
            <icon name="i-simple-icons-github" class="w-5 h-5 mr-2" />
            通过 GitHub 登录
          </Button>

          <!-- Additional info -->
          <div class="text-center">
            <p class="text-sm text-muted-foreground">
              登录即表示您同意我们的
              <NuxtLink to="/terms" class="underline hover:text-primary"
                >服务条款</NuxtLink
              >
              和
              <NuxtLink to="/privacy" class="underline hover:text-primary"
                >隐私政策</NuxtLink
              >
            </p>
          </div>
        </CardContent>
      </Card>

      <!-- Footer -->
      <div class="text-center text-sm text-muted-foreground">
        <p>© 2025 UCSTU. 保留所有权利。</p>
      </div>
    </div>
  </div>
</template>
