import Link from "next/link";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { CollectionList } from "@/components/admin/collection-list";
import { OrderEditor } from "@/components/admin/order-editor";
import { deleteHeroSlideAction, reorderHeroSlidesAction } from "./actions";

export const instant = false;

export default async function AdminHomeHeroPage() {
  await connection();
  const slides = await prisma.heroSlide.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Home Hero</h1>
          <p className="mt-1 text-sm text-white/50">
            The headline carousel at the top of the homepage. Only the eyebrow, headline,
            description, and CTAs rotate between slides — add more than one to enable the
            carousel.
          </p>
        </div>
        <Link
          href="/admin/home/new"
          className="rounded-md bg-brand-gold px-4 py-2 text-sm font-semibold text-brand-dark hover:opacity-90"
        >
          New Slide
        </Link>
      </div>

      <div className="mt-8">
        <OrderEditor
          items={slides.map((slide) => ({ id: slide.id, label: slide.headlineEmphasis, order: slide.order }))}
          reorderAction={reorderHeroSlidesAction}
        />
        <CollectionList
          items={slides}
          basePath="/admin/home"
          deleteAction={deleteHeroSlideAction}
          emptyMessage="No hero slides yet — add at least one so the homepage has a headline."
          columns={[
            { header: "Eyebrow", render: (item) => item.eyebrow },
            { header: "Headline", render: (item) => `${item.headlineLead} ${item.headlineEmphasis}` },
          ]}
        />
      </div>
    </div>
  );
}
