import { notFound } from "next/navigation";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { FormField } from "@/components/admin/form-field";
import { TextareaField } from "@/components/admin/textarea-field";
import { ToggleField } from "@/components/admin/toggle-field";
import { MediaPicker } from "@/components/admin/media-picker";
import { SubmitButton } from "@/components/admin/submit-button";
import { updateInsightPostAction } from "../../actions";

export const instant = false;

export default async function EditInsightPostPage({ params }: { params: Promise<{ id: string }> }) {
  await connection();
  const { id } = await params;
  const post = await prisma.insightPost.findUnique({ where: { id } });
  if (!post) notFound();

  const action = updateInsightPostAction.bind(null, id);

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold text-white">Edit Insight Post</h1>
      <form action={action} className="mt-8 flex flex-col gap-5">
        <FormField label="Title" name="title" defaultValue={post.title} required />
        <FormField label="Slug" name="slug" defaultValue={post.slug} required />
        <TextareaField label="Excerpt" name="excerpt" defaultValue={post.excerpt} rows={2} required />
        <TextareaField label="Body (Markdown)" name="body" defaultValue={post.body} rows={12} required />
        <MediaPicker label="Cover Image" name="coverMediaId" defaultValue={post.coverMediaId} />
        <FormField label="Author Name" name="authorName" defaultValue={post.authorName} />
        <FormField label="Author Role" name="authorRole" defaultValue={post.authorRole} />
        <FormField label="Category" name="category" defaultValue={post.category} />
        <FormField
          label="Tags"
          name="tags"
          defaultValue={post.tags}
          hint="Comma-separated, e.g. Cybersecurity, Risk Management."
        />
        <ToggleField label="Published" name="published" defaultChecked={post.published} />
        <div>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
