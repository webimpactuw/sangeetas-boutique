"use client";

import { useEffect } from 'react';

export default function CalendlyEmbed() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  return (
    <div
      className="calendly-inline-widget"
      data-url="https://calendly.com/rockyz0516/new-meeting?hide_gdpr_banner=1&primary_color=1a237e"
      style={{ minWidth: '320px', height: '700px' }}
    />
  );
}