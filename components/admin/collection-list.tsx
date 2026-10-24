import Link from "next/link";
import { ConfirmDeleteButton } from "./confirm-delete-button";

export type CollectionColumn<T> = {
  header: string;
  render: (item: T) => React.ReactNode;
};

type CollectionListProps<T extends { id: string }> = {
  items: T[];
  columns: CollectionColumn<T>[];
  basePath: string;
  deleteAction: (id: string, formData: FormData) => void;
  emptyMessage?: string;
};

export function CollectionList<T extends { id: string }>({
  items,
  columns,
  basePath,
  deleteAction,
  emptyMessage = "Nothing here yet.",
}: CollectionListProps<T>) {
  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-white/15 px-6 py-10 text-center text-sm text-white/40">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-white/10">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/[0.03] text-left text-xs uppercase tracking-wider text-white/40">
            {columns.map((column) => (
              <th key={column.header} className="px-4 py-3 font-medium">
                {column.header}
              </th>
            ))}
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b border-white/5 last:border-0">
              {columns.map((column) => (
                <td key={column.header} className="px-4 py-3 align-top text-white/80">
                  {column.render(item)}
                </td>
              ))}
              <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end gap-3">
                  <Link
                    href={`${basePath}/${item.id}/edit`}
                    className="text-sm text-brand-gold hover:underline"
                  >
                    Edit
                  </Link>
                  <ConfirmDeleteButton action={deleteAction.bind(null, item.id)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
