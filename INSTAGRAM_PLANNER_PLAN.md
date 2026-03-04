# Instagram Planner - Feature Plan

> **Status:** Draft / Awaiting Approval
> **Date:** 2026-02-21
> **Author:** Product & Engineering Planning Session
> **Stakeholders:** Sharon Di Salvo (Owner), Engineering Lead

---

## 1. Executive Summary

The **Instagram Planner** is a new admin feature that provides a visual grid planner mimicking the Instagram profile layout. It enables Sharon to upload, organize, and preview how images will appear on her Instagram profile *before* publishing. The tool includes a media browser for previously uploaded assets, local file upload with drag-and-drop, a 3-column preview grid, and per-post metadata (caption, hashtags, scheduling).

This feature fills a real gap: right now there is no media management or social planning capability in the admin panel. It also lays the foundation for a proper media library that the rest of the site (blog, newsletters) can leverage.

---

## 2. Goals & Success Criteria

| Goal | Success Metric |
|------|---------------|
| Visually plan Instagram grid before posting | Admin can see an accurate 3-column preview of upcoming posts |
| Drag-and-drop workflow for arranging content | Images can be dragged from media browser/upload zone into grid cells and rearranged |
| Centralized media management | All uploaded images stored, browsable, and reusable across the admin |
| Post metadata management | Each grid cell supports caption, hashtags, and a planned date |
| Non-destructive workflow | Nothing is published to Instagram automatically; this is a planning tool |

---

## 3. User Stories

### P0 - Must Have (MVP)

1. **As an admin**, I want to see a 3-column grid preview that mimics my Instagram profile so I can visualize how my feed will look.

2. **As an admin**, I want to upload images from my local machine (drag files onto the page or use a file picker) so I can add new content to plan with.

3. **As an admin**, I want to browse previously uploaded images in a media browser panel so I can reuse existing assets.

4. **As an admin**, I want to drag and drop images from the media browser or upload zone into specific grid positions so I can arrange my feed.

5. **As an admin**, I want to drag and drop images between grid positions to rearrange the visual order of my planned posts.

6. **As an admin**, I want to add a caption and hashtags to each planned post so I can prepare the copy in advance.

7. **As an admin**, I want to set a planned/scheduled date for each post so I know when I intend to publish it.

8. **As an admin**, I want to save the grid state so it persists when I leave and come back.

9. **As an admin**, I want to remove an image from a grid cell (send it back to the media browser) without deleting the file.

### P1 - Should Have

10. **As an admin**, I want to see a status indicator on each grid cell (draft, planned, published) so I can track progress.

11. **As an admin**, I want to filter/search the media browser by upload date or filename.

12. **As an admin**, I want to see a larger preview of an image when I click on a grid cell, along with its metadata.

13. **As an admin**, I want image thumbnails generated automatically so the grid loads fast.

### P2 - Nice to Have (Future)

14. **As an admin**, I want to connect my Instagram account and publish directly from the planner.

15. **As an admin**, I want to pull my existing Instagram feed into the grid so I can plan around what's already posted.

16. **As an admin**, I want AI-assisted caption and hashtag suggestions.

---

## 4. Feature Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    /admin/instagram-planner                      │
│                                                                  │
│  ┌──────────────────────────┐  ┌──────────────────────────────┐ │
│  │                          │  │                              │ │
│  │    MEDIA BROWSER PANEL   │  │     INSTAGRAM PREVIEW GRID   │ │
│  │                          │  │                              │ │
│  │  ┌────────────────────┐  │  │  ┌────┐ ┌────┐ ┌────┐      │ │
│  │  │  Upload Drop Zone  │  │  │  │ 1  │ │ 2  │ │ 3  │      │ │
│  │  │  (drag files here) │  │  │  └────┘ └────┘ └────┘      │ │
│  │  └────────────────────┘  │  │  ┌────┐ ┌────┐ ┌────┐      │ │
│  │                          │  │  │ 4  │ │ 5  │ │ 6  │      │ │
│  │  ┌────────────────────┐  │  │  └────┘ └────┘ └────┘      │ │
│  │  │  Search / Filter   │  │  │  ┌────┐ ┌────┐ ┌────┐      │ │
│  │  └────────────────────┘  │  │  │ 7  │ │ 8  │ │ 9  │      │ │
│  │                          │  │  └────┘ └────┘ └────┘      │ │
│  │  ┌──┐ ┌──┐ ┌──┐ ┌──┐   │  │         ...                 │ │
│  │  │  │ │  │ │  │ │  │   │  │                              │ │
│  │  └──┘ └──┘ └──┘ └──┘   │  │  [Load More Rows]           │ │
│  │  ┌──┐ ┌──┐ ┌──┐ ┌──┐   │  │                              │ │
│  │  │  │ │  │ │  │ │  │   │  └──────────────────────────────┘ │
│  │  └──┘ └──┘ └──┘ └──┘   │                                   │
│  │         ...              │  ┌──────────────────────────────┐ │
│  └──────────────────────────┘  │    POST DETAIL PANEL         │ │
│                                │  (appears on cell click)     │ │
│                                │  - Large image preview       │ │
│                                │  - Caption textarea          │ │
│                                │  - Hashtag input             │ │
│                                │  - Scheduled date picker     │ │
│                                │  - Status selector           │ │
│                                │  - Save / Remove buttons     │ │
│                                └──────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. Technical Architecture

### 5.1 New Dependencies

| Package | Purpose | Rationale |
|---------|---------|-----------|
| `@dnd-kit/core` | Drag-and-drop engine | Modern, accessible, performant. Industry standard replacement for deprecated `react-beautiful-dnd`. Works with React 18+, supports touch devices. |
| `@dnd-kit/sortable` | Sortable grid behavior | Built on @dnd-kit/core, provides sortable containers and reorder logic. |
| `@dnd-kit/utilities` | CSS transform helpers | Lightweight helpers for drag-and-drop transforms. |
| `sharp` | Server-side image processing | Thumbnail generation, image resizing, format conversion. Node.js standard. |

> **Engineering Note:** We do NOT need a state management library. React `useState` + Context is sufficient for the grid state. The existing codebase uses no external state manager, and adding one for this feature would be over-engineering.

### 5.2 Database Schema Changes

Two new tables added to the existing SQLite database (`/data/blog.db`):

```sql
-- Centralized media storage metadata
CREATE TABLE IF NOT EXISTS media (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  filename      TEXT NOT NULL,              -- Original filename
  stored_path   TEXT NOT NULL UNIQUE,       -- Path on disk or S3 key
  thumbnail_path TEXT,                      -- Generated thumbnail path
  mime_type     TEXT NOT NULL,              -- e.g., image/jpeg
  file_size     INTEGER NOT NULL,           -- Bytes
  width         INTEGER,                    -- Image width in px
  height        INTEGER,                    -- Image height in px
  alt_text      TEXT DEFAULT '',            -- Accessibility text
  created_at    TEXT DEFAULT (datetime('now')),
  updated_at    TEXT DEFAULT (datetime('now'))
);

CREATE INDEX idx_media_created_at ON media(created_at);

-- Instagram planner grid positions and post metadata
CREATE TABLE IF NOT EXISTS instagram_posts (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  media_id        INTEGER NOT NULL,           -- FK to media table
  grid_position   INTEGER NOT NULL,           -- 0-indexed position in grid
  caption         TEXT DEFAULT '',             -- Post caption text
  hashtags        TEXT DEFAULT '',             -- Comma-separated or space-separated
  status          TEXT DEFAULT 'draft'
                  CHECK(status IN ('draft', 'planned', 'published')),
  scheduled_date  TEXT,                       -- ISO date for planned publish
  created_at      TEXT DEFAULT (datetime('now')),
  updated_at      TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (media_id) REFERENCES media(id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX idx_instagram_posts_position ON instagram_posts(grid_position);
CREATE INDEX idx_instagram_posts_status ON instagram_posts(status);
CREATE INDEX idx_instagram_posts_scheduled ON instagram_posts(scheduled_date);
```

> **Engineering Note:** `grid_position` uses a unique index to enforce one post per cell. When reordering, positions are swapped in a transaction. The `media` table is intentionally generic so the blog and newsletter features can later reference it too.

### 5.3 File Storage Strategy

**Phase 1 (MVP):** Local filesystem storage
- Uploaded images stored at: `/data/uploads/instagram/originals/`
- Generated thumbnails at: `/data/uploads/instagram/thumbnails/`
- The `/data/` directory is already gitignored and used for the SQLite database
- Served via a new API route that streams the file (not from `/public/` to keep it protected)

**Phase 2 (Future):** S3 migration
- The existing S3 upload placeholder at `/api/admin/upload` will be completed
- `stored_path` in the database will switch from local paths to S3 keys
- A storage abstraction layer will make this swap transparent

> **Engineering Note:** Starting with local storage is the right call. It avoids the AWS configuration dependency for MVP, and the `media` table schema already supports both local paths and S3 keys. The abstraction boundary is the `stored_path` column.

### 5.4 Image Processing Pipeline

```
Upload Flow:
  File selected/dropped
    → Client validates (type: jpg/png/webp, max size: 10MB)
    → Upload via POST /api/admin/instagram/upload (multipart/form-data)
    → Server validates (re-check type, size, dimensions)
    → Save original to /data/uploads/instagram/originals/{uuid}.{ext}
    → Generate thumbnail (400x400, cover crop) via sharp
    → Save thumbnail to /data/uploads/instagram/thumbnails/{uuid}.{ext}
    → Insert row into media table
    → Return media object to client
```

### 5.5 API Routes

All new routes are under `/api/admin/instagram/` and protected by the existing `isAuthenticated()` middleware.

| Method | Route | Purpose |
|--------|-------|---------|
| `POST` | `/api/admin/instagram/upload` | Upload image(s), generate thumbnails, insert into media |
| `GET` | `/api/admin/instagram/media` | List media (paginated, filterable by date) |
| `DELETE` | `/api/admin/instagram/media/[id]` | Delete a media item and its files |
| `GET` | `/api/admin/instagram/media/[id]/file` | Serve original image file |
| `GET` | `/api/admin/instagram/media/[id]/thumbnail` | Serve thumbnail image file |
| `GET` | `/api/admin/instagram/grid` | Get all instagram_posts with their media, ordered by grid_position |
| `PUT` | `/api/admin/instagram/grid` | Bulk update grid (save full grid state: positions, captions, etc.) |
| `POST` | `/api/admin/instagram/grid/posts` | Add a new post to the grid (assign media to a position) |
| `PUT` | `/api/admin/instagram/grid/posts/[id]` | Update a single post (caption, hashtags, status, date) |
| `DELETE` | `/api/admin/instagram/grid/posts/[id]` | Remove a post from the grid (media stays in library) |
| `PUT` | `/api/admin/instagram/grid/reorder` | Swap/reorder grid positions (accepts array of {id, newPosition}) |

### 5.6 Component Architecture

```
/app/admin/instagram-planner/
  page.tsx                          ← Main page (fetches grid + media data)

/components/admin/instagram/
  InstagramPlanner.tsx              ← Main layout: media panel + grid + detail panel
  ├── MediaBrowser.tsx              ← Left panel: upload zone + media grid
  │   ├── UploadDropZone.tsx        ← File drop area + file picker button
  │   ├── MediaGrid.tsx             ← Thumbnail grid of uploaded media
  │   └── MediaItem.tsx             ← Single draggable thumbnail in media browser
  ├── PreviewGrid.tsx               ← Center: the 3-column Instagram grid
  │   ├── GridCell.tsx              ← Single droppable cell (empty or filled)
  │   └── DragOverlay.tsx           ← Visual ghost that follows cursor during drag
  └── PostDetailPanel.tsx           ← Right/bottom panel: edit caption, hashtags, etc.
      ├── CaptionEditor.tsx         ← Textarea with character count (2,200 char limit)
      ├── HashtagInput.tsx          ← Tag-style input for hashtags
      └── ScheduleDatePicker.tsx    ← Date picker for planned publish date
```

> **Engineering Note:** This mirrors the existing component organization pattern (e.g., `components/admin/PostEditor.tsx`, `components/admin/EmailPreview.tsx`). Each component has a single responsibility. The DnD context wraps the entire planner.

### 5.7 Drag-and-Drop Implementation Strategy

```tsx
// Conceptual DnD architecture using @dnd-kit

<DndContext onDragStart={...} onDragEnd={...} onDragOver={...}>
  {/* Source: Media Browser */}
  <MediaBrowser>
    {mediaItems.map(item => (
      <Draggable key={item.id} id={`media-${item.id}`}>
        <MediaItem item={item} />
      </Draggable>
    ))}
  </MediaBrowser>

  {/* Target: Instagram Grid */}
  <SortableContext items={gridPositions} strategy={rectSortingStrategy}>
    <PreviewGrid>
      {gridCells.map(cell => (
        <SortableGridCell key={cell.position} id={`cell-${cell.position}`}>
          <GridCell cell={cell} />
        </SortableGridCell>
      ))}
    </PreviewGrid>
  </SortableContext>

  {/* Floating drag preview */}
  <DragOverlay>
    {activeItem && <DragPreview item={activeItem} />}
  </DragOverlay>
</DndContext>
```

**Supported interactions:**
1. **Media Browser → Grid Cell:** Drops a media item into an empty cell, creating a new instagram_post
2. **Grid Cell → Grid Cell:** Reorders/swaps positions between two cells
3. **Grid Cell → Media Browser (or trash):** Removes the post from the grid (media stays in library)

### 5.8 State Management Approach

```
┌─────────────────────────────────────┐
│     InstagramPlannerContext          │
│                                     │
│  gridPosts: InstagramPost[]         │  ← Posts currently in the grid
│  mediaLibrary: MediaItem[]          │  ← Available media items
│  selectedPostId: number | null      │  ← Currently selected grid cell
│  isDirty: boolean                   │  ← Unsaved changes indicator
│                                     │
│  actions:                           │
│    addToGrid(mediaId, position)     │
│    removeFromGrid(postId)           │
│    reorderGrid(fromPos, toPos)      │
│    updatePost(postId, data)         │
│    uploadMedia(files)               │
│    deleteMedia(mediaId)             │
│    saveGrid()                       │
│    loadGrid()                       │
│    loadMedia(page, filters)         │
│                                     │
└─────────────────────────────────────┘
```

A single React Context wraps the planner page. All API calls go through this context's actions. The `isDirty` flag enables a "You have unsaved changes" warning. Debounced auto-save is a P1 enhancement.

---

## 6. UI/UX Design Specification

### 6.1 Layout

- **Desktop (>= 1280px):** Three-panel layout. Media browser (300px left sidebar) | Preview grid (flexible center) | Post detail panel (350px right sidebar, visible when a cell is selected).
- **Tablet (768px-1279px):** Two-panel. Media browser collapses to a toggleable drawer. Grid takes full width. Post detail appears as a bottom sheet overlay.
- **Mobile:** Not a priority. Admin is used on desktop. Gracefully degrade with a "best viewed on desktop" notice.

### 6.2 Grid Appearance

- **3 columns**, square aspect-ratio cells (1:1) — matches Instagram's profile grid
- **Gap:** 4px between cells (matches Instagram's 3px gap)
- **Default grid size:** 4 rows (12 cells), with a "Show more rows" button
- **Empty cells:** Dashed border with a "+" icon and "Drop image here" text
- **Filled cells:** Image fills the cell (object-fit: cover), with a subtle status dot in the corner
- **Hover state:** Slight overlay with position number and quick-action icons (edit, remove)
- **Active drag:** Drop target cells highlight with a colored border

### 6.3 Media Browser Appearance

- **Upload zone** at the top: dashed border area with cloud icon, "Drop files or click to upload"
- **Grid below:** 3-4 column thumbnail grid, scrollable
- **Each thumbnail:** Shows filename on hover, checkmark if already used in grid
- **Loading state:** Skeleton placeholders during upload

### 6.4 Post Detail Panel

- **Image preview:** Large preview of the selected cell's image
- **Caption:** Textarea with character counter (0/2,200) and line counter
- **Hashtags:** Tag-style chips input (type and press Enter to add)
- **Schedule:** Date picker input
- **Status:** Dropdown (Draft / Planned / Published)
- **Actions:** Save button, Remove from grid button

### 6.5 Visual Style

Follow the existing admin UI patterns:
- Dark background consistent with dashboard (`bg-gray-900`, `text-white`)
- Card-based panels with `bg-gray-800` and rounded corners
- Accent colors from the existing theme
- Use `framer-motion` for panel transitions (already in the project)
- Loading states consistent with dashboard pattern

---

## 7. Implementation Phases

### Phase 1: Foundation (Media Library + Storage)

**Scope:** Build the media upload and storage infrastructure that the grid planner depends on.

**Tasks:**
1. Add `sharp` dependency for image processing
2. Create the `media` database table (migration in `lib/db.ts`)
3. Create `/data/uploads/instagram/originals/` and `/thumbnails/` directories
4. Build the upload API route (`POST /api/admin/instagram/upload`)
   - Multipart form handling
   - File validation (type, size)
   - Save original + generate thumbnail via sharp
   - Insert media record into database
5. Build the media listing API (`GET /api/admin/instagram/media`)
6. Build the media delete API (`DELETE /api/admin/instagram/media/[id]`)
7. Build the file serving APIs (original + thumbnail)
8. Create the `MediaBrowser` component with `UploadDropZone`
9. Create a standalone test page to verify uploads work end-to-end

**Deliverable:** Admin can upload images, see them in a media browser, and delete them.

### Phase 2: Instagram Grid + Drag-and-Drop

**Scope:** Build the core grid planner with drag-and-drop interactions.

**Tasks:**
1. Add `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities` dependencies
2. Create the `instagram_posts` database table (migration in `lib/db.ts`)
3. Build grid API routes (GET grid, PUT grid, POST/PUT/DELETE posts, PUT reorder)
4. Create the `InstagramPlannerContext` for state management
5. Build the `PreviewGrid` component with `GridCell`
6. Build the `DragOverlay` component
7. Implement drag-and-drop: media browser → grid cell
8. Implement drag-and-drop: grid cell → grid cell (reorder)
9. Implement remove from grid (grid cell → back to media browser)
10. Wire up save/load grid state via API
11. Add unsaved changes warning

**Deliverable:** Full visual grid planner with drag-and-drop working.

### Phase 3: Post Metadata + Polish

**Scope:** Add caption/hashtag editing, scheduling, and UX polish.

**Tasks:**
1. Build the `PostDetailPanel` with `CaptionEditor`, `HashtagInput`, `ScheduleDatePicker`
2. Implement per-post save (caption, hashtags, status, date)
3. Add status indicators on grid cells (draft/planned/published dots)
4. Add the Instagram Planner link to the admin dashboard navigation
5. Add loading states, error handling, and empty states
6. Add confirmation dialogs for destructive actions (delete media, remove from grid)
7. Responsive layout adjustments
8. Keyboard accessibility for drag-and-drop operations

**Deliverable:** Complete, polished Instagram Planner feature ready for daily use.

---

## 8. File Manifest (New/Modified Files)

### New Files

```
app/admin/instagram-planner/
  page.tsx                                    ← Admin page

app/api/admin/instagram/
  upload/route.ts                             ← Image upload endpoint
  media/route.ts                              ← Media listing endpoint
  media/[id]/route.ts                         ← Single media delete endpoint
  media/[id]/file/route.ts                    ← Serve original image
  media/[id]/thumbnail/route.ts               ← Serve thumbnail image
  grid/route.ts                               ← Grid state (GET/PUT)
  grid/posts/route.ts                         ← Add post to grid
  grid/posts/[id]/route.ts                    ← Update/delete single post
  grid/reorder/route.ts                       ← Reorder grid positions

components/admin/instagram/
  InstagramPlanner.tsx                        ← Main planner layout
  MediaBrowser.tsx                            ← Media browser panel
  UploadDropZone.tsx                          ← File upload drop area
  MediaGrid.tsx                               ← Media thumbnail grid
  MediaItem.tsx                               ← Single draggable media item
  PreviewGrid.tsx                             ← 3-column Instagram grid
  GridCell.tsx                                ← Single grid cell
  DragOverlay.tsx                             ← Drag preview overlay
  PostDetailPanel.tsx                         ← Post editing sidebar
  CaptionEditor.tsx                           ← Caption textarea
  HashtagInput.tsx                            ← Hashtag chips input
  ScheduleDatePicker.tsx                      ← Date picker

lib/
  media.ts                                    ← Media storage utilities
  instagram.ts                                ← Instagram planner DB operations
```

### Modified Files

```
lib/db.ts                                     ← Add media + instagram_posts table creation
app/admin/dashboard/page.tsx                  ← Add nav link to Instagram Planner
next.config.js                                ← Add sharp configuration if needed
package.json                                  ← New dependencies
```

---

## 9. Risk Assessment & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Large file uploads causing memory issues | High | Medium | Stream uploads, enforce 10MB limit client + server, use sharp's streaming API |
| SQLite write contention during grid reorder | Medium | Low | Use transactions for position swaps, WAL mode already enabled |
| Disk space growth from uploaded images | Medium | Medium | Track total storage used, add a dashboard indicator, plan S3 migration |
| Browser memory with many thumbnails | Medium | Low | Paginate media browser, use lazy loading, serve properly sized thumbnails |
| @dnd-kit compatibility with Next.js 16 SSR | Medium | Low | Wrap DnD components in `'use client'` boundaries, lazy-load if needed |
| User accidentally reorders published posts | Low | Medium | Status indicators + confirmation dialog for published post moves |

---

## 10. Out of Scope (Explicitly)

These are NOT part of this plan and should be separate future initiatives:

- **Instagram API publishing** - Requires Facebook Business account, Graph API review, OAuth flow. This is a major separate feature.
- **Instagram feed import** - Pulling existing posts from Instagram into the grid.
- **Multi-account support** - Only planning for one Instagram account.
- **Video support** - MVP is images only. Video (Reels) can be added later.
- **Carousel/album posts** - MVP is single-image posts. Multi-image carousel support is a future enhancement.
- **AI caption generation** - Future enhancement leveraging an LLM API.
- **Analytics integration** - Tracking post performance after publishing.

---

## 11. Open Questions for Discussion

1. **Grid row count:** Should the default grid show 3 rows (9 cells) or 4 rows (12 cells)? Instagram shows 3 rows on a profile by default.

2. **Published post handling:** When a post is marked as "published", should it become locked in the grid (non-draggable) or should it always remain movable?

3. **Media reuse:** Should the same image be allowed in multiple grid positions, or should it be 1:1 (one media item → one grid cell)?

4. **Auto-save vs manual save:** Should the grid state auto-save on every change, or require an explicit "Save" button press? Auto-save is more modern but manual save gives more control.

5. **Storage preference:** Start with local filesystem storage (simpler, no AWS needed) or go straight to S3 (the placeholder route already exists)?

---

## 12. Summary

This is a **3-phase feature** that builds up from a media library foundation, through the core drag-and-drop grid, to a polished planning tool. The architecture stays consistent with the existing codebase patterns (SQLite, Next.js App Router, Tailwind, component-per-concern). The only new dependencies are `@dnd-kit` for drag-and-drop and `sharp` for image processing — both are industry-standard, well-maintained libraries.

The feature is scoped as a **local planning tool** — it does not publish to Instagram. This keeps the MVP focused and avoids the complexity of the Instagram Graph API. That can be a separate initiative once the planner proves useful.

**Estimated new files:** ~25
**Estimated modified files:** ~4
**New dependencies:** 4 (`@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`, `sharp`)
