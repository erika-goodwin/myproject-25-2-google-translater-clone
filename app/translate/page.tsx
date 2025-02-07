import { auth } from "@clerk/nextjs/server";
import TranslationForm from "../components/TranslationForm";
import TranslationHistory from "../components/TranslationHistory";

export type TranslationLanguage = {
  translation: {
    [key: string]: {
      name: string;
      nativeName: string;
      dir: "ltr" | "rtl";
    };
  };
};

async function TranslatePage() {
  const { userId } = auth();

  // == For not login user
  if (!userId) throw new Error("User not login yet!");

  // == For everybody else
  const languagesEndpoint =
    "https://api.cognitive.microsofttranslator.com/languages?api-version=3.0";
  // const languagesEndpoint ="https://api.cognitive.microsofttranslator.com/translate?api-version=3.0";

  const response = await fetch(languagesEndpoint, {
    next: {
      revalidate: 60 * 60 * 24, // Cash the response for 24 hours
    },
  });

  const languages = (await response.json()) as TranslationLanguage;

  return (
    <div className="px-10 xl:px-10 mb-20">
      {/* Translation form */}
      <TranslationForm languages={languages} />

      {/* Translation History */}
      <TranslationHistory />
    </div>
  );
}

export default TranslatePage;
