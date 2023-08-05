import { env } from "@/env.mjs";
import { SubmitButton } from "./components";

export default async function Home() {
  const note = await fetch(
    `${env.SUPABASE_URL}/storage/v1/object/public/notes/notes.txt`,
    { cache: "no-store" }
  ).then((r) => r.text());

  async function editNotes(formData: FormData) {
    "use server";

    const newNoteContent = formData.get("note");

    if (typeof newNoteContent !== "string") return;

    const txtBlob = new Blob([newNoteContent], { type: "text/plain" });

    await fetch(`${env.SUPABASE_URL}/storage/v1/object/notes/notes.txt`, {
      method: "PUT",
      body: txtBlob,
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${env.SUPABASE_API_SECRET}`,
      },
    });
  }

  return (
    <main className="h-full w-full flex items-center justify-center">
      <form
        action={editNotes}
        className="mb-4 w-full max-w-2xl rounded-lg bg-slate-50"
      >
        <label htmlFor={"note"} className="sr-only">
          Update notepad
        </label>
        <textarea
          defaultValue={note}
          id={"note"}
          name={"note"}
          rows={8}
          className="min-h-[10rem] max-h-[30rem] outline-none focus:ring-4 focus:ring-blue-200  w-full rounded-lg rounded-b-none border-slate-300 px-2 py-2 border-0 bg-slate-50 text-base text-slate-900"
          placeholder="Update notepad"
        />
        <div className="flex items-center ml-2 py-2">
          <SubmitButton />
        </div>
      </form>
    </main>
  );
}
