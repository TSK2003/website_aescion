import React from 'react';

export function AnnouncementBar() {
  return (
    <div className="bg-primary-500 text-white px-4 py-2 text-center text-sm font-medium">
      <p>
        <span className="font-semibold">New:</span> Enterprise AI Solutions are now available. 
        <a href="/solutions/ai-solutions" className="ml-2 underline underline-offset-2 hover:text-primary-100 transition-colors">
          Learn more &rarr;
        </a>
      </p>
    </div>
  );
}
