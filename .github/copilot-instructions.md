# GitHub Copilot Instructions for Meeting Room Project

## Project Overview

This is an **Online Meeting Management System** (在线会议管理系统) built with Nuxt.js 3, using GitHub OAuth authentication and shadcn-vue components. The system is a modern remote collaboration platform designed for online meetings, providing meeting scheduling, team management, and participant link distribution.

## Technology Stack & Preferences

### Core Technologies

- **Framework**: Nuxt.js 3 (Vue.js) - Full-stack framework
- **TypeScript**: Always use TypeScript for type safety
- **UI Components**: shadcn-vue (auto-imported)
- **Styling**: Tailwind CSS - Utility-first CSS framework
- **Authentication**: GitHub OAuth via nuxt-auth-utils
- **Database**: Drizzle ORM with SQLite
- **Deployment**: Cloudflare platform
- **Package Manager**: pnpm
- **Icons**: Lucide Icons

### Code Style Preferences

#### Functions

- **ALWAYS use regular function declarations instead of arrow functions**
- ✅ Correct: `function handleSubmit() { ... }`
- ❌ Avoid: `const handleSubmit = () => { ... }`

#### Component Imports

- **shadcn-vue components are auto-imported, do NOT manually import them**
- ✅ Correct: `<Button>` (no import needed)
- ❌ Avoid: `import { Button } from '@/components/ui/button'`
- **Exception**: Form components require explicit imports for proper validation integration

#### Vue Composition API

- Use `<script lang="ts" setup>` for all Vue components
- Prefer composition API over options API
- Use `ref()` and `reactive()` for reactive state

#### Form Component Standards

- **MANDATORY: All forms MUST use shadcn Form components**
- ✅ Required: `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage`
- ✅ Use Zod schema validation with `toTypedSchema`
- ✅ Use `vee-validate` with `useForm` hook
- ❌ Avoid: Basic HTML forms or custom form validation

#### UI Component Priority

- **ALWAYS prioritize shadcn-vue components over custom styles**
- ✅ Use shadcn components whenever possible
- ✅ Follow shadcn design system patterns
- ❌ Minimize custom CSS classes
- ❌ Avoid reinventing existing shadcn functionality

#### Typography Standards

- **MANDATORY: Follow shadcn-vue typography classes**
- ✅ Use semantic HTML tags: `<h1>`, `<h2>`, `<p>`, `<small>`
- ✅ Use shadcn typography classes: `scroll-m-20`, `leading-7`, `text-muted-foreground`
- ✅ Maintain consistent text hierarchy and spacing
- ❌ Avoid custom text styling when shadcn classes exist

#### Internationalization

- **CURRENT POLICY: NO i18n support required**
- ✅ Use hardcoded Chinese text
- ✅ Keep interface simple and direct
- ❌ Do not implement language switching
- ❌ Do not add internationalization frameworks

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
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Define validation schema
const formSchema = toTypedSchema(
  z.object({
    field: z.string().min(1, "字段不能为空"),
  }),
);

// Setup form with validation
const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    field: "",
  },
});

// Handle form submission
const onSubmit = form.handleSubmit(async (values) => {
  // Form submission logic
  console.log(values);
});
</script>

<template>
  <form @submit="onSubmit" class="space-y-4">
    <FormField v-slot="{ componentField }" name="field">
      <FormItem>
        <FormLabel>字段标签</FormLabel>
        <FormControl>
          <Input placeholder="输入内容" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit" class="w-full">提交</Button>
  </form>
</template>
```

## Available shadcn-vue Components

### Currently Installed

- `Button` (with variants: default, secondary, destructive, outline, ghost, link)
- `Card`, `CardContent`, `CardDescription`, `CardHeader`, `CardTitle`
- `Input`, `Textarea`
- `Label`
- `Select`, `SelectContent`, `SelectItem`, `SelectTrigger`, `SelectValue`, `SelectGroup`
- `Dialog`, `DialogContent`, `DialogDescription`, `DialogHeader`, `DialogTitle`, `DialogFooter`
- `Avatar`, `AvatarFallback`, `AvatarImage`
- `Badge`
- `Progress`
- `Skeleton`
- `Separator`
- `Alert`, `AlertDescription`, `AlertTitle`
- **Form Components**: `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage`

### Form Validation Dependencies

- `zod` - Schema validation library
- `@vee-validate/zod` - Zod integration for vee-validate
- `vee-validate` - Vue form validation library

## Design System Standards

### Color and Spacing Guidelines

- **MANDATORY: Follow shadcn color system**
- Use CSS variables: `hsl(var(--primary))`, `hsl(var(--muted))`
- Apply consistent spacing using Tailwind classes
- Maintain proper contrast ratios
- Use semantic color naming: `primary`, `secondary`, `muted`, `destructive`

### Typography Hierarchy

- **H1**: `scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl`
- **H2**: `scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0`
- **H3**: `scroll-m-20 text-2xl font-semibold tracking-tight`
- **H4**: `scroll-m-20 text-xl font-semibold tracking-tight`
- **Paragraph**: `leading-7 [&:not(:first-child)]:mt-6`
- **Large Text**: `text-lg font-semibold`
- **Small Text**: `text-sm text-muted-foreground`
- **Muted Text**: `text-sm text-muted-foreground`

### Component Usage Priorities

1. **First Priority**: Use existing shadcn-vue components
2. **Second Priority**: Combine shadcn components for complex UI
3. **Last Resort**: Create custom components only if shadcn doesn't provide the functionality

### Available for Installation

All shadcn-vue components are available for use in this project. Key components include:

#### Layout & Navigation

- `Sidebar` - For application navigation and sidebars
- `Navigation Menu` - For top navigation bars
- `Breadcrumb` - For page navigation hierarchy
- `Tabs` - For tabbed interfaces
- `Menubar` - For menu bars
- `Separator` - For visual dividers

#### Data Display

- `Table` - For tabular data display
- `Data Table` - For advanced data tables with sorting/filtering
- `Avatar` - For user profile images
- `Badge` - For status indicators and labels
- `Progress` - For progress indicators
- `Skeleton` - For loading states

#### Form Controls

- `Checkbox` - For checkboxes
- `Radio Group` - For radio button groups
- `Switch` - For toggle switches
- `Textarea` - For multi-line text input
- `Number Field` - For numeric input
- `PIN Input` - For PIN/code input
- `Tags Input` - For tag selection
- `Slider` - For range selection
- `Calendar` - For date selection
- `Date Picker` - For date/time picking
- `Range Calendar` - For date range selection
- `Form` - For form validation and structure

#### Feedback & Interaction

- `Dialog` - For modal dialogs
- `Sheet` - For slide-out panels
- `Drawer` - For mobile-friendly drawers
- `Popover` - For floating content
- `Tooltip` - For helpful hints
- `Alert` - For notifications and alerts
- `Alert Dialog` - For confirmation dialogs
- `Toast` - For temporary notifications
- `Sonner` - For toast notifications
- `Hover Card` - For contextual information

#### Selection & Search

- `Combobox` - For searchable dropdowns
- `Command` - For command palette interfaces
- `Dropdown Menu` - For dropdown menus
- `Context Menu` - For right-click menus
- `Pagination` - For page navigation

#### Layout Helpers

- `Aspect Ratio` - For maintaining aspect ratios
- `Scroll Area` - For custom scrollbars
- `Resizable` - For resizable panels
- `Carousel` - For image/content carousels
- `Collapsible` - For expandable content
- `Toggle` - For toggle buttons
- `Toggle Group` - For toggle button groups
- `Stepper` - For step-by-step workflows

### Installation Command

When suggesting new components, always mention:

```bash
pnpm dlx shadcn-vue@latest add <component-name>
```

### Recommended Components for Meeting Management Features

For different online meeting management features, prioritize these components:

#### 📅 Meeting Scheduling & Calendar

- **Meeting Creation**: `Calendar`, `Date Picker`, `Range Calendar`, `Time Picker`, `Form`, `Input`, `Textarea`
- **Recurring Meetings**: `Checkbox`, `Radio Group`, `Select`, `Switch`
- **Meeting Details**: `Card`, `Input`, `Textarea`, `Select`, `Combobox`

#### 👥 Team Management

- **Team Creation**: `Form`, `Input`, `Textarea`, `Avatar`, `Badge`
- **Member Management**: `Data Table`, `Avatar`, `Badge`, `Dropdown Menu`, `Dialog`
- **Role Assignment**: `Select`, `Badge`, `Toggle Group`, `Alert Dialog`
- **Member Invitations**: `Dialog`, `Input`, `Button`, `Alert`

#### 🏠 Dashboard & Analytics

- **Personal Dashboard**: `Tabs`, `Card`, `Progress`, `Badge`, `Separator`, `Chart`
- **Meeting Statistics**: `Progress`, `Badge`, `Card`, `Data Table`
- **Calendar Views**: `Calendar`, `Tabs`, `Card`, `Badge`

#### 🔍 Search & Filtering

- **Meeting Search**: `Command`, `Combobox`, `Input`, `Badge`
- **Advanced Filters**: `Popover`, `Checkbox`, `Select`, `Date Picker`
- **Quick Actions**: `Command`, `Dialog`, `Sheet`

#### ⚙️ Admin & Settings

- **Admin Panel**: `Data Table`, `Dialog`, `Alert Dialog`, `Dropdown Menu`, `Sheet`
- **System Settings**: `Form`, `Switch`, `Select`, `Input`, `Separator`
- **User Management**: `Data Table`, `Avatar`, `Badge`, `Dialog`

#### 📱 Mobile & Responsive

- **Mobile Navigation**: `Sheet`, `Drawer`, `Navigation Menu`
- **Mobile Forms**: `Dialog`, `Sheet`, `Input`, `Button`
- **Touch-friendly**: `Card`, `Button`, `Badge`

#### 🔔 Notifications & Alerts

- **Real-time Notifications**: `Toast`, `Sonner`, `Alert`, `Badge`
- **System Messages**: `Alert`, `Alert Dialog`, `Card`
- **Status Updates**: `Badge`, `Progress`, `Alert`

## Styling Guidelines

### Preferred Classes

- **Layout**: `min-h-screen`, `container mx-auto`, `px-4 py-8`, `max-w-4xl`
- **Spacing**: `space-y-4`, `space-x-4`, `mb-4`, `mt-2`, `gap-4`
- **Colors**: `bg-background`, `text-foreground`, `text-muted-foreground`, `text-primary`
- **Typography**: `text-2xl font-bold`, `text-sm text-muted-foreground`, `text-4xl font-bold tracking-tight`
- **Interactive**: `hover:text-primary`, `underline`, `cursor-pointer`

### Responsive Design

- Use mobile-first approach
- Apply responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`
- Test across different screen sizes
- Consider touch interfaces for mobile

## Navigation & Routing

### Internal Links

- **ALWAYS use `NuxtLink` for internal navigation**
- ✅ Correct: `<NuxtLink to="/dashboard">Dashboard</NuxtLink>`
- ❌ Avoid: `<a href="/dashboard">Dashboard</a>`

### Route Structure

- Pages in `app/pages/` directory
- Use file-based routing
- Dynamic routes with `[param].vue` syntax
- Auth pages like `/auth`, `/terms`, `/privacy`

## Authentication Patterns

### Protected Pages

```vue
<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
});
</script>
```

### Public Pages

```vue
<script lang="ts" setup>
definePageMeta({
  auth: false,
});
</script>
```

### GitHub OAuth

- Login redirect: `/auth/github`
- Use nuxt-auth-utils for session management
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
- SQLite as database engine

### Common Queries

```typescript
// Example meeting query
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

### Back Navigation

```vue
<script lang="ts" setup>
function goBack() {
  window.history.back();
}
</script>

<template>
  <Button variant="ghost" size="sm" @click="goBack">
    <icon name="i-lucide-arrow-left" class="w-4 h-4 mr-2" />
    返回
  </Button>
</template>
```

## Accessibility Guidelines

- Use semantic HTML elements
- Provide proper ARIA labels
- Ensure keyboard navigation works
- Maintain proper color contrast
- Test with screen readers

## Internationalization

- Primary language: Chinese (zh-cn)
- Use appropriate Chinese text for labels and messages
- Consider future English support
- Use proper date/time formatting for locale

## Testing Suggestions

### Unit Tests

- Test composables and utility functions
- Mock external dependencies
- Use descriptive test names

### E2E Tests

- Test critical user flows
- Test authentication flows
- Test form submissions
- Test meeting scheduling workflows

## Development Workflow

### Before Suggesting Code

1. Check if shadcn-vue component exists for the use case
2. Use regular functions instead of arrow functions
3. Don't import shadcn-vue components manually
4. Use proper TypeScript types
5. Follow the established file structure
6. Consider mobile responsiveness
7. Use Chinese text for user-facing content

### Code Review Checklist

- [ ] Uses regular function declarations
- [ ] No manual shadcn-vue component imports
- [ ] Proper TypeScript types
- [ ] Follows Tailwind CSS patterns
- [ ] Includes proper error handling
- [ ] Has accessibility considerations
- [ ] Uses NuxtLink for internal navigation
- [ ] Mobile-responsive design
- [ ] Chinese text for UI elements

## Project-Specific Context

This is an **Online Meeting Management System** where:

### Core Features

#### 🔐 User Authentication & Authorization

- GitHub OAuth authentication via nuxt-auth-utils
- Secure session management
- Basic permission control for authenticated users

#### 📅 Online Meeting Scheduling

- Smart calendar interface for intuitive meeting arrangement
- Meeting conflict detection to avoid duplicate bookings
- Support for recurring meetings and meeting series
- Meeting link management with automatic generation and distribution
- Participant invitation system with email notifications

#### 👥 Team Collaboration Management

- Team workspace creation and management
- Three-tier permission system: Owner, Administrator, Member
- Unified team meeting scheduling and management
- Email-based member invitation system
- Shared team calendar

#### 🛠️ Meeting Management Features

- Meeting templates for preset configurations
- Meeting notes and document management
- Attendance statistics and meeting effectiveness analysis
- Multi-channel meeting reminder notifications

#### 📱 User Experience

- Responsive design for mobile, tablet, and desktop
- Real-time notifications for meeting status updates
- Personal dashboard with meeting records and statistics
- Quick search for historical meetings and contacts

#### 🔗 Third-party Integration

- Multi-channel notifications (email, SMS, WeChat Work, etc.)
- Future: Video conferencing platform integration (Zoom, Teams, etc.)

### Business Rules

- Users authenticate via GitHub OAuth
- Users can create and manage personal meetings
- Users can join teams and participate in team meetings
- Team owners/admins can manage team members and permissions
- System manages meeting availability and prevents conflicts
- Users can view their booking history and statistics
- Meeting rooms represent virtual meeting spaces
- System tracks attendance and meeting effectiveness

### Development Priorities

1. **Meeting Scheduling** - Core booking and calendar functionality
2. **Team Management** - Team creation, member management, permissions
3. **User Dashboard** - Personal meeting overview and statistics
4. **Notifications** - Email and in-app notification system
5. **Mobile Experience** - Touch-friendly responsive design
6. **Third-party Integration** - External calendar and video platform support

When suggesting features or code, keep this domain context in mind and suggest relevant functionality for online meeting management and team collaboration.

## ⚠️ CRITICAL DEVELOPMENT STANDARDS

### 🎨 UI/UX Requirements (MANDATORY)

#### Form Implementation Standards

- **ALL forms MUST use shadcn Form components with proper validation**
- Required imports: `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage`
- Use Zod schema validation with `toTypedSchema` and `vee-validate`
- Form submission MUST use `form.handleSubmit()` pattern
- ❌ **NEVER use basic HTML forms or custom validation**

#### Typography Standards (MANDATORY)

- **MUST follow shadcn-vue typography guidelines**
- Use semantic HTML: `<h1>`, `<h2>`, `<h3>`, `<p>`, `<small>`
- Apply shadcn typography classes: `scroll-m-20`, `leading-7`, `text-muted-foreground`
- Maintain consistent text hierarchy and proper spacing
- ❌ **AVOID custom text styling when shadcn classes exist**

#### Component Usage Policy (MANDATORY)

- **shadcn-vue components take absolute priority over custom styles**
- Only create custom components when shadcn doesn't provide the functionality
- Minimize custom CSS classes - use shadcn design tokens
- Follow shadcn color system and spacing guidelines
- ❌ **DO NOT reinvent existing shadcn functionality**

### 🌐 Internationalization Policy

#### Current Language Standards

- **NO i18n framework implementation required**
- Use hardcoded Chinese text throughout the application
- Keep user interface simple and direct
- Focus on functionality over multilingual support
- ❌ **DO NOT implement language switching or i18n libraries**

### 🔧 Code Quality Standards

#### Form Validation Pattern

```typescript
// REQUIRED pattern for all forms
const schema = toTypedSchema(
  z.object({
    field: z.string().min(1, "错误信息"),
  }),
);

const form = useForm({
  validationSchema: schema,
  initialValues: { field: "" },
});

const onSubmit = form.handleSubmit(async (values) => {
  // Handle submission
});
```

#### Typography Implementation

```vue
<!-- REQUIRED semantic structure -->
<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
  主标题
</h1>
<p class="leading-7 [&:not(:first-child)]:mt-6">
  正文内容
</p>
<small class="text-sm text-muted-foreground">
  辅助文字
</small>
```

### 📋 Pre-Development Checklist

Before implementing any feature, ensure:

- [ ] Forms use shadcn Form components with Zod validation
- [ ] Typography follows shadcn standards with semantic HTML
- [ ] Components prioritize shadcn over custom styles
- [ ] Text content is in Chinese (no i18n needed)
- [ ] Regular function declarations (not arrow functions)
- [ ] TypeScript types are properly defined
- [ ] Responsive design principles are applied

**⚠️ These standards are non-negotiable and must be followed in all development work.**
