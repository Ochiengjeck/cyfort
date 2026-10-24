"use client";

type ConfirmDeleteButtonProps = {
  action: (formData: FormData) => void;
  confirmMessage?: string;
  label?: string;
};

export function ConfirmDeleteButton({
  action,
  confirmMessage = "Delete this item? This cannot be undone.",
  label = "Delete",
}: ConfirmDeleteButtonProps) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!window.confirm(confirmMessage)) {
          event.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="text-sm text-red-400 transition-colors hover:text-red-300"
      >
        {label}
      </button>
    </form>
  );
}
