# GitHub Copilot Instructions for Meeting Room Project

## Project Overview

This is a **Meeting Room Management System** built with Nuxt.js 3, using GitHub OAuth authentication and shadcn-vue components. The system allows users to book and manage meeting rooms.

## Technology Stack & Preferences

### Core Technologies

- **Framework**: Nuxt.js 3 (Vue.js)
- **TypeScript**: Always use TypeScript
- **UI Components**: shadcn-vue (auto-imported)
- **Styling**: Tailwind CSS
- **Authentication**: GitHub OAuth
- **Database**: Drizzle ORM
- **Package Manager**: pnpm

### Code Style Preferences

#### Functions

- **ALWAYS use regular function declarations instead of arrow functions**
- ✅ Correct: `function handleSubmit() { ... }`
- ❌ Avoid: `const handleSubmit = () => { ... }`

#### Component Imports

- **shadcn-vue components are auto-imported, do NOT manually import them**
- ✅ Correct: `<Button>` (no import needed)
- ❌ Avoid: `import { Button } from '@/components/ui/button'`

#### Vue Composition API

- Use `<script lang="ts" setup>` for all Vue components
- Prefer composition API over options API
- Use `ref()` and `reactive()` for reactive state

## File Structure Patterns

### Page Components

```vue
<script lang="ts" setup>
// SEO configuration
useHead({
  title: "Page Title - Meeting Room",
  meta: [{ name: "description", content: "Page description" }],
});

// Page functions (use regular functions)
function handleAction() {
  // Implementation
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <div class="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Page Title</CardTitle>
        </CardHeader>
        <CardContent>
          <!-- Page content -->
        </CardContent>
      </Card>
    </div>
  </div>
</template>
```

### Form Components

```vue
<script lang="ts" setup>
const formData = ref({
  // Form fields
});

function handleSubmit() {
  // Form submission logic
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <Label for="field">Field Label</Label>
      <Input id="field" v-model="formData.field" />
    </div>
    <Button type="submit" class="w-full">Submit</Button>
  </form>
</template>
```

## Available shadcn-vue Components

### Currently Installed

- `Button` (with variants: default, secondary, destructive, outline, ghost, link)
- `Card`, `CardContent`, `CardDescription`, `CardHeader`, `CardTitle`
- `Input`
- `Label`
- `Select`

### Installation Command

When suggesting new components, always mention:

```bash
pnpm dlx shadcn-vue@latest add <component-name>
```

## Styling Guidelines

### Preferred Classes

- **Layout**: `min-h-screen`, `container mx-auto`, `px-4 py-8`
- **Spacing**: `space-y-4`, `space-x-4`, `mb-4`, `mt-2`
- **Colors**: `bg-background`, `text-foreground`, `text-muted-foreground`, `text-primary`
- **Typography**: `text-2xl font-bold`, `text-sm text-muted-foreground`

### Responsive Design

- Use mobile-first approach
- Apply responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`
- Test across different screen sizes

## Navigation & Routing

### Internal Links

- **ALWAYS use `NuxtLink` for internal navigation**
- ✅ Correct: `<NuxtLink to="/dashboard">Dashboard</NuxtLink>`
- ❌ Avoid: `<a href="/dashboard">Dashboard</a>`

### Route Structure

- Pages in `app/pages/` directory
- Use file-based routing
- Dynamic routes with `[param].vue` syntax

## Authentication Patterns

### Protected Pages

```vue
<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
});
</script>
```

### GitHub OAuth

- Login redirect: `/auth/github`
- Use server-side session management
- Check auth state with composables

## API Integration

### Data Fetching

```vue
<script lang="ts" setup>
// Use Nuxt's $fetch for API calls
const { data, error } = await $fetch("/api/meetings");

// Error handling
function handleError(error: any) {
  console.error("API Error:", error);
  // Show user-friendly error message
}
</script>
```

### Server API Routes

- Place in `server/api/` directory
- Use proper HTTP methods (GET, POST, PUT, DELETE)
- Return consistent response formats

## Database Patterns

### Drizzle ORM

- Define schemas in `server/database/schema.ts`
- Use typed queries
- Handle database connections properly

### Common Queries

```typescript
// Example meeting room query
const meetings = await db
  .select()
  .from(meetingsTable)
  .where(eq(meetingsTable.userId, user.id));
```

## Component Development

### Reusable Components

- Keep components small and focused
- Use proper TypeScript interfaces for props
- Implement proper error boundaries

### Props & Emits

```vue
<script lang="ts" setup>
interface Props {
  title: string;
  description?: string;
}

interface Emits {
  submit: [data: FormData];
  cancel: [];
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
</script>
```

## State Management

### Local State

- Use `ref()` for primitive values
- Use `reactive()` for objects
- Use `computed()` for derived state

### Global State

- Create composables in `composables/` directory
- Use Pinia for complex state management
- Keep state minimal and focused

## Performance Optimization

### Lazy Loading

```vue
<script lang="ts" setup>
// Lazy load non-critical components
const LazyComponent = defineAsyncComponent(
  () => import("~/components/HeavyComponent.vue"),
);
</script>
```

### Images

- Use `<nuxt-img>` for optimized images
- Provide proper alt text for accessibility

## Error Handling

### Try-Catch Patterns

```vue
<script lang="ts" setup>
function handleAsyncAction() {
  try {
    // Async operation
  } catch (error) {
    console.error("Error:", error);
    // Show user notification
  }
}
</script>
```

## SEO & Meta

### Page Meta

```vue
<script lang="ts" setup>
useHead({
  title: "Page Title - Meeting Room",
  meta: [
    { name: "description", content: "Page description" },
    { property: "og:title", content: "Page Title" },
    { property: "og:description", content: "Page description" },
  ],
});
</script>
```

## Common Patterns to Suggest

### Loading States

```vue
<script lang="ts" setup>
const isLoading = ref(false);

async function loadData() {
  isLoading.value = true;
  try {
    // Load data
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <Button :disabled="isLoading">
    {{ isLoading ? "Loading..." : "Submit" }}
  </Button>
</template>
```

### Form Validation

```vue
<script lang="ts" setup>
const errors = ref<Record<string, string>>({});

function validateForm() {
  errors.value = {};
  // Validation logic
  return Object.keys(errors.value).length === 0;
}
</script>
```

## Accessibility Guidelines

- Use semantic HTML elements
- Provide proper ARIA labels
- Ensure keyboard navigation works
- Maintain proper color contrast
- Test with screen readers

## Testing Suggestions

### Unit Tests

- Test composables and utility functions
- Mock external dependencies
- Use descriptive test names

### E2E Tests

- Test critical user flows
- Test authentication flows
- Test form submissions

## Development Workflow

### Before Suggesting Code

1. Check if shadcn-vue component exists for the use case
2. Use regular functions instead of arrow functions
3. Don't import shadcn-vue components manually
4. Use proper TypeScript types
5. Follow the established file structure

### Code Review Checklist

- [ ] Uses regular function declarations
- [ ] No manual shadcn-vue component imports
- [ ] Proper TypeScript types
- [ ] Follows Tailwind CSS patterns
- [ ] Includes proper error handling
- [ ] Has accessibility considerations
- [ ] Uses NuxtLink for internal navigation

## Project-Specific Context

This is a **meeting room management system** where:

- Users authenticate via GitHub OAuth
- Users can book meeting rooms
- System manages room availability
- Users can view their bookings
- Admin users can manage rooms and users

When suggesting features or code, keep this domain context in mind and suggest relevant functionality for meeting room management.
