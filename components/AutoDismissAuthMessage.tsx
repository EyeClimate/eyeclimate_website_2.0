"use client";

import { useEffect, useState } from "react";
import AuthMessage from "@/components/AuthMessage";

export default function AutoDismissAuthMessage({
  error,
  message,
  duration = 3000,
}: {
  error?: string;
  message?: string;
  duration?: number;
}) {
  const contentKey = error || message || "";
  const [dismissedKey, setDismissedKey] = useState("");

  useEffect(() => {
    if (!contentKey) return;

    const timer = window.setTimeout(
      () => setDismissedKey(contentKey),
      duration,
    );
    return () => window.clearTimeout(timer);
  }, [contentKey, duration]);

  if (!contentKey || dismissedKey === contentKey) return null;
  return <AuthMessage error={error} message={message} />;
}
