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
import SubmitButton from "./SubmitButton";
import { Button } from "@/components/ui/button";
import { Volume2Icon } from "lucide-react";
import Recorder from "./Recorder";

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
    if (!input.trim()) return;

    const delayDebounceFn = setTimeout(() => {
      submitBtnReference.current?.click();
    }, 500);

    // Clear timeout to avoid duplicates
    return () => clearTimeout(delayDebounceFn);
  }, [input]);

  useEffect(() => {
    if (state.output) {
      setOutput(state.output);
    }
  }, [state]);

  const playAudio = () => {
    const synth = window.speechSynthesis;

    if (!output || !synth) return;

    const wordsToSay = new SpeechSynthesisUtterance(output);
    synth.speak(wordsToSay);
  };

  const uploadAudio = async (blob: Blob) => {
    const mineType = "audio/webm";

    const file = new File([blob], mineType, { type: mineType });

    const formData = new FormData();
    formData.append("audio", file);

    //Post request
    const response = await fetch("/transcribeAudio", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.text) {
      setInput(data.text);
    }
  };

  return (
    <div>
      <form action={formAction}>
        <div className="flex space-x-2">
          <div className="flex items-center group cursor-pointer border rounded-md w-fit px-3 py-2 bg-[#e7f0fe] mb-5">
            <Image src={translateLogo} alt="logo" width={30} height={30} />
            <p className="text-sm font-medium text-blue-500 group-hover:underline ml-2 mt-1">
              Text
            </p>
          </div>
          {/*  Record button here */}
          <Recorder uploadAudio={uploadAudio} />
        </div>

        <div className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-2">
          <div className="flex-1 space-y-2">
            <Select name="inputLanguage" defaultValue="auto">
              <SelectTrigger className="w-64 border-none text-blue-500 font-bold">
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
            <div className="flex items-center justify-between">
              <Select name="outputLanguage" defaultValue="fr">
                <SelectTrigger className="w-64 border-none text-blue-500 font-bold">
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
                    {Object.entries(languages.translation).map(
                      ([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value.name}
                        </SelectItem>
                      )
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Button
                variant="ghost"
                type="button"
                onClick={playAudio}
                disabled={!output}
                className="ml-2"
              >
                <Volume2Icon
                  size={24}
                  className=" text-blue-500 cursor-pointer disabled:cursor-not-allowed"
                />
              </Button>
            </div>
            <Textarea
              placeholder="Type your message here."
              className="min-h-32 text-xl"
              name="input"
              value={output}
              onChange={(e) => setOutput(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <button type="submit" ref={submitBtnReference} hidden />
          <SubmitButton disabled={!input} />
        </div>
      </form>
    </div>
  );
}
