"use client";
import { TranslationLanguage } from "../translate/page";
import translate from "../actions/translate";
import translateLogo from "../assets/images/translate_icon.png";

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
import { useEffect, useState, useRef } from "react";
import { useFormState } from "react-dom";
import Image from "next/image";

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
  const submitBtnReference = useRef<HTMLButtonElement>(null);

  console.log(state);

  // Submission every 500ms
  useEffect(() => {
    if(!input.trim()) return

    const delayDebounceFn = setTimeout(() => {
      submitBtnReference.current?.click();
    }, 500);

    // Clear timeout to avoid duplicates
    return () => clearTimeout(delayDebounceFn);

  }, [input])

  useEffect(() => {
    if (state.output) {
      setOutput(state.output);
    }
  }, [state]);

  return (
    <div>
      <div className="flex space-x-2">
        <div className="flex items-center group cursor-pointer border rounded-md w-fit px-3 py-2 bg-[#e7f0fe] mb-5">
          <Image src={translateLogo} alt="logo" width={30} height={30} />
          <p className="text-sm font-medium text-blue-500 group-hover:underline ml-2 mt-1">
            Text
          </p>
        </div>
      </div>
      <form action={formAction}>
        <div className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-2">
          <div className="flex-1 space-y-2">
            <Select name="inputLamguage" defaultValue="auto">
              <SelectTrigger className="w-[280px] border-non text-blue-500 font-bold">
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

          <div className="flex-1 space-y-2">
            <Select name="outputLanguage" defaultValue="fr">
              <SelectTrigger className="w-[280px] border-non text-blue-500 font-bold">
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
        </div>
        <div>
          <button type="submit" ref={submitBtnReference}>Submit</button>
        </div>
      </form>
    </div>
  );
}
