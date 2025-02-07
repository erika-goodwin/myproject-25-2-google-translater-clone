import { ITranslation } from "@/mongodb/models/User";
import { auth } from "@clerk/nextjs/server";

const getLanguage = (code: string) => {
  const lang = new Intl.DisplayNames(["en"], { type: "language" });
  return lang.of(code);
};

async function TranslationHistory() {
  const { userId } = auth();

  const url = `${
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.VERCEL_URL
  }/translationHistory?userId=${userId}`;

  const response = await fetch(url, {
    next: {
      tags: ["translationHistory"],
    },
  });

  const { translations }: { translations: Array<ITranslation> } =
    await response.json();
  console.log(">>> translations:", translations);
  return (
    <div>
      <h1 className="text-exl my-5">History</h1>

      {translations.length === 0 && (
        <p className="mb-5 text-gray-400">No Translation History</p>
      )}

      <ul className="divide-y border rounded-md">
        {translations.map((translation) => (
          <li
            key={translation._id}
            className="flex justify-between items-center p-5 hover:bg-gray-50 relative"
          >
            <div>
              <p className="text-sm mb-5 text-gray-500">
                {getLanguage(translation.from)} {" => "}{" "}
                {getLanguage(translation.to)}
              </p>

              <div className="space-y-2 pr-5">
                <p>{translation.fromText}</p>
                <p className="text-gray-400">{translation.toText}</p>
              </div>
            </div>

            {/* time ago */}

            {/* delete */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TranslationHistory;
