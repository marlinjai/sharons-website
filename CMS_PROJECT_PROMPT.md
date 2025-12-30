# CMS Package - Initial Project Prompt

## Project Overview

Build a reusable, installable npm package that provides a content management system (CMS) for blog posts. This CMS should integrate seamlessly into Next.js applications and allow content creators to:

1. Create and edit blog posts using a rich text editor
2. Manage blog post metadata (title, subtitle, category, images, etc.)
3. Extract and reuse blog content for newsletters and other content types
4. Access via an admin interface with authentication

## Core Requirements

### Primary Goal

Create an npm package (`@yourcompany/cms` or similar) that can be installed into any Next.js project and provides:

- Admin UI routes (`/admin/*`)
- API endpoints for CRUD operations
- Rich text editor for content creation
- Database layer for storing blog posts
- Content extraction utilities for reuse in newsletters
- **Inline editing mode**: Edit content directly on frontend pages when admin is logged in

### Key Features

- **Rich Text Editing**: Use Quill or similar for WYSIWYG editing
- **Content Storage**: Store blog posts as structured data (JSON/rich text format) that can be rendered both on the website and in emails
- **Reusability**: Content should be extractable in chunks for newsletters
- **Authentication**: Simple admin authentication (session-based)
- **Inline Editing**: Edit content directly on the frontend when logged in as admin (no need to go to admin panel)
- **Type Safety**: Full TypeScript support
- **Next.js Integration**: Works seamlessly with Next.js App Router

## Technology Stack

### Core Technologies

- **TypeScript**: Primary language for type safety
- **Next.js 15+**: Framework for admin UI and API routes (App Router)
- **React 18+**: UI components
- **SQLite (better-sqlite3)**: Database for simplicity (can upgrade to PostgreSQL later)
- **Quill/React-Quill**: Rich text editor
- **bcryptjs**: Password hashing for authentication
- **next-auth**: Session management (optional, or simple custom solution)

### Styling

- **Tailwind CSS**: Utility-first CSS framework (matches the website using it)
- **CSS Modules**: For component-specific styles if needed

### Additional Packages

- **zod**: Runtime type validation
- **date-fns**: Date formatting utilities

## Architecture Decisions

### Package Structure

```
@yourcompany/cms/
├── src/
│   ├── components/          # React components
│   │   ├── admin/
│   │   │   ├── AdminLayout.tsx
│   │   │   ├── BlogEditor.tsx
│   │   │   ├── BlogList.tsx
│   │   │   └── RichTextEditor.tsx
│   │   ├── editing/         # Inline editing components
│   │   │   ├── EditableContent.tsx
│   │   │   ├── EditOverlay.tsx
│   │   │   ├── InlineEditor.tsx
│   │   │   └── EditIndicator.tsx
│   │   └── ui/              # Shared UI components
│   ├── lib/
│   │   ├── database.ts      # Database connection & queries
│   │   ├── auth.ts          # Authentication logic
│   │   ├── api.ts           # API utilities
│   │   └── content.ts       # Content extraction utilities
│   ├── app/                 # Next.js App Router routes
│   │   ├── admin/
│   │   │   ├── layout.tsx
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx        # Blog list
│   │   │   │   ├── new/page.tsx    # Create new post
│   │   │   │   └── [id]/page.tsx   # Edit post
│   │   │   └── login/page.tsx
│   │   └── api/
│   │       └── cms/
│   │           ├── blog/
│   │           │   ├── route.ts     # CRUD operations
│   │           │   └── [id]/route.ts
│   │           └── auth/route.ts
│   ├── types/
│   │   └── index.ts         # TypeScript types
│   └── utils/
│       └── content.ts       # Content parsing/extraction
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

### Database Schema

```sql
-- Blog Posts
CREATE TABLE blog_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  category TEXT,
  image_url TEXT,
  read_time TEXT,
  date TEXT NOT NULL,
  content TEXT NOT NULL,  -- JSON/rich text format
  excerpt TEXT,           -- For newsletters
  status TEXT DEFAULT 'draft',  -- draft, published, archived
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Admin Users
CREATE TABLE admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Content Blocks (for newsletter extraction)
CREATE TABLE content_blocks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL,
  block_type TEXT NOT NULL,  -- paragraph, heading, quote, etc.
  block_order INTEGER NOT NULL,
  content TEXT NOT NULL,
  metadata TEXT,  -- JSON for additional data
  FOREIGN KEY (post_id) REFERENCES blog_posts(id)
);
```

### Content Format

Store blog content as JSON (Delta format from Quill):

```typescript
interface BlogContent {
  ops: Array<{
    insert: string;
    attributes?: {
      bold?: boolean;
      italic?: boolean;
      header?: number;
      link?: string;
      // ... other Quill attributes
    };
  }>;
}
```

This allows:

- Rendering in HTML for web
- Rendering in plain text for emails
- Extracting specific sections for newsletters
- Maintaining formatting

## Integration Pattern

### Installation

```bash
npm install @yourcompany/cms
```

### Usage in Next.js App

```typescript
// app/layout.tsx - Add CMS admin routes
import { CMSProvider } from '@yourcompany/cms';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <CMSProvider>
          {children}
        </CMSProvider>
      </body>
    </html>
  );
}
```

### Inline Editing (Frontend Editing Mode)

When an admin is logged in, content becomes editable directly on the frontend:

```typescript
// components/BlogPost.tsx - Automatically becomes editable
import { EditableContent } from '@yourcompany/cms';

export function BlogPost({ post }) {
  return (
    <article>
      <EditableContent
        contentId={post.id}
        type="blog-post"
        field="title"
      >
        <h1>{post.title}</h1>
      </EditableContent>

      <EditableContent
        contentId={post.id}
        type="blog-post"
        field="content"
      >
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </EditableContent>
    </article>
  );
}
```

**How it works:**

1. **CMSProvider** checks if user is logged in as admin
2. If admin: Wraps content with editable overlay/hover states
3. Click to edit: Shows inline rich text editor
4. Save: Updates via API, refreshes content
5. Visual indicators: Shows "Edit" buttons/hover effects only for admins

**User Experience:**

- Regular visitors: See normal content (no editing UI)
- Admin users: See subtle edit indicators, click to edit inline
- No redirect: Editing happens on the same page
- Auto-save: Optional auto-save or manual save button

**Security:**

- Only renders editing UI if authenticated admin session exists
- All edits go through authenticated API endpoints
- Client-side checks are for UX only, server validates all requests

### Configuration

```typescript
// cms.config.ts
export const cmsConfig = {
  databasePath: './cms.db',
  adminRoute: '/admin',
  authRequired: true,
};
```

## Best Practices & Rules

### Code Quality

- **TypeScript First**: Strict mode enabled, no `any` types
- **Small Functions**: Keep functions under 50 lines, files under 200 lines
- **Modular Design**: Each component/utility should have a single responsibility
- **Error Handling**: Always handle errors gracefully with proper messages
- **Validation**: Validate all inputs using Zod schemas

### Documentation

- **Comments**: Add explanatory comments, especially for complex logic
- **File Headers**: Include file path/name as comment at top
- **README**: Comprehensive setup and usage documentation
- **Type Definitions**: Export all types for consumers to use

### Security

- **Password Hashing**: Always hash passwords with bcrypt
- **SQL Injection**: Use parameterized queries, never string concatenation
- **Input Validation**: Validate and sanitize all user inputs
- **Authentication**: Protect admin routes with session checks
- **Rate Limiting**: Consider rate limiting on API endpoints

### Performance

- **Database Indexing**: Index frequently queried fields (slug, date)
- **Lazy Loading**: Load content on demand, not all at once
- **Caching**: Consider caching for read-heavy operations
- **Bundle Size**: Keep package size minimal, avoid heavy dependencies

### Developer Experience

- **Clear Errors**: Provide helpful error messages
- **Type Exports**: Export all types for TypeScript users
- **Configuration**: Make it easy to customize behavior
- **Migration Path**: Consider migration utilities for database updates

## Content Reusability Strategy

### Newsletter Extraction

Provide utilities to extract content from blog posts:

```typescript
import { extractContentForNewsletter } from '@yourcompany/cms/utils';

const newsletterContent = extractContentForNewsletter(blogPost, {
  maxLength: 500,
  includeImages: true,
  format: 'email', // 'email' | 'plain' | 'html'
});
```

### Content Blocks

Allow marking sections as reusable:

- Extract paragraphs
- Extract quotes
- Extract images with captions
- Extract CTA sections

## Testing Strategy

### Unit Tests

- Test utility functions
- Test content extraction logic
- Test database queries

### Integration Tests

- Test API endpoints
- Test authentication flow
- Test admin UI components

### Manual Testing

- Test rich text editor functionality
- Test blog post creation/editing
- Test newsletter content extraction

## Development Phases

### Phase 1: Core Infrastructure

1. Set up package structure
2. Database schema and migrations
3. Basic authentication
4. API routes for CRUD operations

### Phase 2: Admin UI

1. Admin layout and navigation
2. Blog list page
3. Rich text editor integration
4. Create/edit blog post pages

### Phase 3: Content Features

1. Image upload handling
2. Slug generation
3. Content preview
4. Draft/publish workflow

### Phase 4: Newsletter Integration

1. Content extraction utilities
2. Format conversion (HTML/plain text)
3. Content block management
4. Newsletter content builder

### Phase 5: Polish & Documentation

1. Error handling improvements
2. Loading states
3. Comprehensive documentation
4. Example integrations

## Success Criteria

- ✅ Can be installed via npm
- ✅ Provides admin UI at `/admin`
- ✅ Supports rich text editing with Quill
- ✅ Stores content in structured format
- ✅ Can extract content for newsletters
- ✅ Type-safe with TypeScript
- ✅ Simple authentication
- ✅ Well documented
- ✅ Easy to customize

## Initial Setup Tasks

1. Initialize npm package with TypeScript
2. Set up Next.js structure for admin routes
3. Configure Tailwind CSS
4. Set up database with better-sqlite3
5. Create basic authentication system
6. Build admin layout component
7. Integrate Quill editor
8. Create blog post CRUD API
9. Build blog list and editor pages
10. Add content extraction utilities

## Next Steps

Start by:

1. Creating the package.json with proper dependencies
2. Setting up TypeScript configuration
3. Creating the database schema
4. Building the basic admin authentication
5. Creating the first admin route

---

**Note**: This CMS should be designed to be simple, focused, and extensible. It's a POC that could become a product, so keep it clean and well-structured from the start.
