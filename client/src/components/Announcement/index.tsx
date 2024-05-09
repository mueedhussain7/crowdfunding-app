import React, { FC } from 'react';

interface AnnouncementProps {
  message: string;
  url: string;
  cta: string;
}

const Announcement: FC<AnnouncementProps> = ({ message, url, cta }) => {
  return (
    <div className="bg-gradient-to-r from-primary to-secondary px-4 py-3 text-bg">
      <p className="text-center text-sm font-medium">
        {message}
      </p>
    </div>
  );
};

export {Announcement};
