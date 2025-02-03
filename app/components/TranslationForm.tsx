"use client";
import { TranslationLanguage } from "../translate/page";
import translate from "../actions/translate";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

const initialState = {
  inputLanguage: "auto",
  outputLanguage: "fr",
  input: "",
  output: "",
};

export type State = typeof initialState;

export default function TranslationForm({
  languages,
}: {
  languages: TranslationLanguage;
}) {
  const [state, formAction] = useFormState(translate, initialState);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  console.log(state);

  useEffect(() => {
    if (state.output) {
      setOutput(state.output);
    }
  }, [state]);

  return (
    <div>
      <form action={formAction}>
        <div>
          <Select name="inputLamguage" defaultValue="auto">
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>What us to figure it out?</SelectLabel>
                <SelectItem key="auto" value="auto">
                  Auto-Detection
                </SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Language</SelectLabel>
                {Object.entries(languages.translation).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Textarea
            placeholder="Type your message here."
            className="min-h-32 text-xl"
            name="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div>
          <Select name="outputLanguage" defaultValue="fr">
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>What us to figure it out?</SelectLabel>
                <SelectItem key="auto" value="auto">
                  Auto-Detection
                </SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Language</SelectLabel>
                {Object.entries(languages.translation).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Textarea
            placeholder="Type your message here."
            className="min-h-32 text-xl"
            name="input"
            value={output}
            onChange={(e) => setOutput(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
