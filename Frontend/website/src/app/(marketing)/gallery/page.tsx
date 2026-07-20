import React from 'react';
import { Metadata } from 'next';
import { PageHero } from '@/components/ui/page-hero';
import { MediaGallery, MediaItem } from '@/components/ui/media-gallery';

export const metadata: Metadata = {
  title: 'Media Gallery | AESCION',
  description: 'Explore our latest projects, workshops, and enterprise architecture visually.',
};

// Map all the copied files from public/gallery/
const mediaItems: MediaItem[] = [
  { id: 'v1', type: 'video', src: '/gallery/Video_1.mp4', title: 'Corporate Event & Tech Workshop' },
  { id: 'v2', type: 'video', src: '/gallery/Video_2.mp4', title: 'Enterprise Development Journey' },
  { id: 'img1', type: 'image', src: '/gallery/1.jpeg', title: 'Advanced Architecture Planning' },
  { id: 'img2', type: 'image', src: '/gallery/2.jpeg', title: 'Agile Team Collaboration' },
  { id: 'img3', type: 'image', src: '/gallery/3.jpeg', title: 'Tech Mentorship Program' },
  { id: 'img4', type: 'image', src: '/gallery/4.jpeg', title: 'Code Review Session' },
  { id: 'img5', type: 'image', src: '/gallery/5.jpeg', title: 'Campus Training Hub' },
  { id: 'img6', type: 'image', src: '/gallery/6.jpeg', title: 'Cloud Infrastructure Setup' },
  { id: 'img7', type: 'image', src: '/gallery/7.jpeg', title: 'AI & Data Pipeline Workshop' },
  { id: 'img8', type: 'image', src: '/gallery/8.jpeg', title: 'Internship Onboarding' },
  { id: 'img9', type: 'image', src: '/gallery/9.jpeg', title: 'Client Requirement Analysis' },
  { id: 'img10', type: 'image', src: '/gallery/10.jpeg', title: 'Product Launch Day' },
  { id: 'img11', type: 'image', src: '/gallery/11.jpeg', title: 'Engineering Brainstorming' },
];

export default function GalleryPage() {
  return (
    <>
      <PageHero 
        title="Our Gallery"
        description="A visual journey through our training programs, enterprise projects, and corporate culture."
        breadcrumbs={[{ label: 'Gallery' }]}
        bgClassName="bg-neutral-950 text-white"
      />
      
      <MediaGallery items={mediaItems} />
    </>
  );
}
