'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import MediaBrowser from './MediaBrowser';
import PreviewGrid from './PreviewGrid';
import PostDetailPanel from './PostDetailPanel';
import DragPreview from './DragPreview';

interface MediaItem {
  id: number;
  filename: string;
  stored_path: string;
  thumbnail_path: string | null;
  mime_type: string;
  file_size: number;
  width: number | null;
  height: number | null;
  alt_text: string;
  created_at: string;
  updated_at: string;
}

interface InstagramPost {
  id: number;
  media_id: number;
  grid_position: number;
  caption: string;
  hashtags: string;
  status: 'draft' | 'planned' | 'published';
  scheduled_date: string | null;
  created_at: string;
  updated_at: string;
  media: MediaItem;
}

export default function InstagramPlanner() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [gridPosts, setGridPosts] = useState<InstagramPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeMediaItem, setActiveMediaItem] = useState<MediaItem | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  // Fetch media items
  const fetchMedia = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/instagram/media?page=1&limit=50');
      if (res.ok) {
        const data = await res.json();
        setMediaItems(data.items);
      }
    } catch (err) {
      console.error('Failed to load media:', err);
    }
  }, []);

  // Fetch grid posts
  const fetchGrid = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/instagram/grid');
      if (res.ok) {
        const data = await res.json();
        setGridPosts(data.posts);
      }
    } catch (err) {
      console.error('Failed to load grid:', err);
    }
  }, []);

  // Initial data load
  useEffect(() => {
    async function init() {
      setIsLoading(true);
      await Promise.all([fetchMedia(), fetchGrid()]);
      setIsLoading(false);
    }
    init();
  }, [fetchMedia, fetchGrid]);

  // Delete media
  const handleMediaDelete = useCallback(
    async (id: number) => {
      try {
        const res = await fetch(`/api/admin/instagram/media/${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          await fetchMedia();
          await fetchGrid();
        }
      } catch (err) {
        console.error('Failed to delete media:', err);
      }
    },
    [fetchMedia, fetchGrid]
  );

  // Remove post from grid
  const handleRemovePost = useCallback(
    async (postId: number) => {
      try {
        const res = await fetch(`/api/admin/instagram/grid/posts/${postId}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          if (selectedPost?.id === postId) setSelectedPost(null);
          await fetchGrid();
        }
      } catch (err) {
        console.error('Failed to remove post:', err);
      }
    },
    [fetchGrid, selectedPost]
  );

  // Update post
  const handleUpdatePost = useCallback(
    async (
      id: number,
      data: {
        caption?: string;
        hashtags?: string;
        status?: string;
        scheduled_date?: string | null;
      }
    ) => {
      try {
        const res = await fetch(`/api/admin/instagram/grid/posts/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          await fetchGrid();
        }
      } catch (err) {
        console.error('Failed to update post:', err);
      }
    },
    [fetchGrid]
  );

  // DnD handlers
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const data = active.data.current;
    if (data?.type === 'media-item') {
      setActiveMediaItem(data.item as MediaItem);
    } else if (data?.type === 'grid-post') {
      setActiveMediaItem((data.post as InstagramPost).media);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveMediaItem(null);

    if (!over) return;

    const activeData = active.data.current;
    const overId = String(over.id);

    // Dropping a media item onto a grid cell
    if (activeData?.type === 'media-item' && overId.startsWith('grid-')) {
      const position = parseInt(overId.replace('grid-', ''), 10);
      const item = activeData.item as MediaItem;

      try {
        const res = await fetch('/api/admin/instagram/grid/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ media_id: item.id, grid_position: position }),
        });
        if (res.ok) {
          await fetchGrid();
        }
      } catch (err) {
        console.error('Failed to add to grid:', err);
      }
      return;
    }

    // Reordering grid posts
    if (activeData?.type === 'grid-post' && overId.startsWith('grid-')) {
      const post = activeData.post as InstagramPost;
      const newPosition = parseInt(overId.replace('grid-', ''), 10);

      if (post.grid_position === newPosition) return;

      try {
        const res = await fetch('/api/admin/instagram/grid/reorder', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            moves: [{ id: post.id, newPosition }],
          }),
        });
        if (res.ok) {
          await fetchGrid();
        }
      } catch (err) {
        console.error('Failed to reorder:', err);
      }
    }
  };

  // Update selectedPost reference when gridPosts refresh
  useEffect(() => {
    if (selectedPost) {
      const updated = gridPosts.find((p) => p.id === selectedPost.id);
      if (updated) {
        setSelectedPost(updated);
      } else {
        setSelectedPost(null);
      }
    }
  }, [gridPosts]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-3" />
          <p className="text-gray-400">Loading planner...</p>
        </div>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 min-h-[calc(100vh-10rem)]">
        <MediaBrowser
          mediaItems={mediaItems}
          gridPosts={gridPosts}
          onUploadComplete={fetchMedia}
          onMediaDelete={handleMediaDelete}
        />

        <PreviewGrid
          posts={gridPosts}
          selectedPostId={selectedPost?.id ?? null}
          onSelectPost={setSelectedPost}
          onRemovePost={handleRemovePost}
        />

        {selectedPost && (
          <PostDetailPanel
            post={selectedPost}
            onUpdate={handleUpdatePost}
            onRemove={handleRemovePost}
            onClose={() => setSelectedPost(null)}
          />
        )}
      </div>

      <DragOverlay dropAnimation={null}>
        {activeMediaItem ? <DragPreview item={activeMediaItem} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
