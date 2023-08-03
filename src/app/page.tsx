import { SubmitButton } from "./components";
import fs from "fs";

const NOTE = "note";
const filePath = "notes.txt";

const getNotesFromFs = async () => {
  try {
    const notes = fs.readFileSync(filePath, "utf8");
    return notes;
  } catch (err) {
    fs.writeFileSync(filePath, "", "utf8");
  }
};

export default async function Home() {
  const notes = await getNotesFromFs();

  async function editNotes(formData: FormData) {
    "use server";

    const newNoteContent = formData.get(NOTE);

    if (typeof newNoteContent !== "string") return;

    fs.writeFileSync("notes.txt", newNoteContent);
  }

  return (
    <main className="h-full w-full flex items-center justify-center">
      <form
        action={editNotes}
        className="mb-4 w-full max-w-2xl rounded-lg bg-slate-50 dark:bg-slate-900"
      >
        <label htmlFor={NOTE} className="sr-only">
          Update notepad
        </label>
        <textarea
          defaultValue={notes}
          id={NOTE}
          name={NOTE}
          rows={8}
          className="min-h-[10rem] max-h-[30rem] outline-none focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 w-full rounded-lg rounded-b-none border-slate-300 px-2 py-2 dark:border-slate-700 border-0 bg-slate-50 text-base text-slate-900 dark:bg-slate-800 dark:text-slate-200 dark:placeholder-slate-400"
          placeholder="Update notepad"
        />
        <div className="flex items-center ml-2 py-2">
          <SubmitButton />
        </div>
      </form>
    </main>
  );
}
