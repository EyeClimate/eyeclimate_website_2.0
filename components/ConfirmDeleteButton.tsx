"use client";

import { useEffect, useState, useTransition } from "react";

type DeleteAction = (formData: FormData) => void | Promise<void>;

export default function ConfirmDeleteButton({
  action,
  resourceId,
  resourceName,
}: {
  action: DeleteAction;
  resourceId: string;
  resourceName: string;
}) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-full border border-red-500/50 px-5 py-3 text-body-sm text-red-300 transition-colors hover:border-red-400 hover:text-red-200"
      >
        Delete
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-dialog-title"
            aria-describedby="delete-dialog-description"
            className="w-full max-w-lg rounded-xl border border-divider bg-bg-card p-6 shadow-2xl md:p-8"
          >
            <p className="text-label uppercase tracking-label text-red-300">
              Permanent action
            </p>
            <h2 id="delete-dialog-title" className="mt-3 text-h4 font-normal">
              Delete “{resourceName}”?
            </h2>
            <p
              id="delete-dialog-description"
              className="mt-4 text-body-sm leading-body text-text-muted"
            >
              This permanently removes the record from the portal and public
              website. This action cannot be undone.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={pending}
                className="inline-flex h-11 items-center rounded-full border border-divider px-6 text-body-sm text-text-muted"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={pending}
                onClick={() => {
                  const formData = new FormData();
                  formData.set("id", resourceId);
                  startTransition(() => action(formData));
                }}
                className="inline-flex h-11 items-center rounded-full bg-red-500 px-6 text-body-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {pending ? "Deleting…" : "Delete permanently"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
