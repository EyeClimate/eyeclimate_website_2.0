"use client";

import { useEffect, useState } from "react";

export default function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const feedbackTimer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(feedbackTimer);
  }, [copied]);

  async function copyCurrentLink() {
    const currentUrl = window.location.href;
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(currentUrl);
    } else {
      const temporaryField = document.createElement("textarea");
      temporaryField.value = currentUrl;
      temporaryField.setAttribute("readonly", "");
      temporaryField.style.position = "fixed";
      temporaryField.style.opacity = "0";
      document.body.appendChild(temporaryField);
      temporaryField.select();
      document.execCommand("copy");
      temporaryField.remove();
    }
    setCopied(true);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={copyCurrentLink}
        aria-label="Copy article link"
        className="flex size-10 items-center justify-center rounded-full border border-divider text-text-muted transition-colors hover:text-text-primary"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="18" cy="5" r="2.25" />
          <circle cx="6" cy="12" r="2.25" />
          <circle cx="18" cy="19" r="2.25" />
          <path d="m8 11 7.8-4.6M8 13l7.8 4.6" />
        </svg>
      </button>
      {copied && (
        <span
          role="status"
          className="absolute right-0 top-12 z-10 whitespace-nowrap rounded-lg border border-divider bg-bg-card px-3 py-2 text-body-xs text-text-primary shadow-xl"
        >
          Link copied
        </span>
      )}
    </div>
  );
}
