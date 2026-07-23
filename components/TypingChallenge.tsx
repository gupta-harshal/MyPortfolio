"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { typingChallenge } from "@/lib/data";

const WORD_BANK = [
  "about", "after", "again", "almost", "always", "another", "around", "because",
  "before", "between", "bring", "build", "change", "close", "could", "create",
  "design", "during", "every", "follow", "found", "great", "group", "happen",
  "house", "however", "include", "inside", "just", "keep", "know", "large",
  "later", "learn", "leave", "light", "little", "local", "might", "money",
  "move", "never", "next", "night", "number", "often", "order", "other",
  "people", "place", "point", "power", "problem", "public", "right", "school",
  "should", "small", "sound", "start", "still", "system", "their", "there",
  "these", "thing", "think", "those", "through", "today", "under", "until",
  "value", "water", "where", "which", "while", "world", "would", "write",
  "young", "music", "code", "stack", "cloud", "model", "array", "string",
  "debug", "deploy", "query", "cache", "token", "server", "client", "route",
];

type Result = {
  wpm: number;
  accuracy: number;
  beat: boolean;
};

function pickWords(n: number) {
  const pool = [...WORD_BANK];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, n);
}

function scoreWord(attempt: string, expected: string, countSpace: boolean) {
  let ok = 0;
  let bad = 0;
  const len = Math.max(attempt.length, expected.length);
  for (let i = 0; i < len; i++) {
    if (attempt[i] === expected[i]) ok += 1;
    else bad += 1;
  }
  if (countSpace) {
    if (attempt === expected) ok += 1;
    else bad += 1;
  }
  return { ok, bad };
}

export default function TypingChallenge() {
  const { words: wordCount, targetWpm, profileUrl, username } = typingChallenge;
  const [words, setWords] = useState<string[]>([]);
  const [wordIndex, setWordIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [liveMs, setLiveMs] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);
  const [result, setResult] = useState<Result | null>(null);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const doneRef = useRef(false);

  const reset = useCallback(() => {
    doneRef.current = false;
    setWords(pickWords(wordCount));
    setWordIndex(0);
    setTyped("");
    setStartedAt(null);
    setLiveMs(0);
    setCorrectChars(0);
    setIncorrectChars(0);
    setResult(null);
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [wordCount]);

  useEffect(() => {
    setWords(pickWords(wordCount));
  }, [wordCount]);

  useEffect(() => {
    if (!startedAt || result) return;
    const id = window.setInterval(() => {
      setLiveMs(Date.now() - startedAt);
    }, 50);
    return () => window.clearInterval(id);
  }, [startedAt, result]);

  const finish = useCallback(
    (okChars: number, badChars: number, start: number) => {
      if (doneRef.current) return;
      doneRef.current = true;
      const minutes = Math.max((Date.now() - start) / 60000, 1 / 60000);
      const wpm = Math.round(okChars / 5 / minutes);
      const total = okChars + badChars;
      const accuracy = total === 0 ? 100 : Math.round((okChars / total) * 100);
      setLiveMs(Date.now() - start);
      setResult({
        wpm,
        accuracy,
        beat: wpm > targetWpm,
      });
    },
    [targetWpm]
  );

  const completeWord = (
    attempt: string,
    expected: string,
    nextIndex: number,
    start: number,
    countSpace: boolean
  ) => {
    const { ok, bad } = scoreWord(attempt, expected, countSpace);
    const nextOk = correctChars + ok;
    const nextBad = incorrectChars + bad;
    setCorrectChars(nextOk);
    setIncorrectChars(nextBad);
    setTyped("");

    if (nextIndex >= words.length) {
      finish(nextOk, nextBad, start);
    } else {
      setWordIndex(nextIndex);
    }
  };

  const onChange = (value: string) => {
    if (result || doneRef.current || words.length === 0) return;

    let start = startedAt;
    if (!start) {
      start = Date.now();
      setStartedAt(start);
    }

    const current = words[wordIndex];
    const isLast = wordIndex === words.length - 1;

    if (value.endsWith(" ")) {
      completeWord(value.slice(0, -1), current, wordIndex + 1, start, true);
      return;
    }

    setTyped(value);

    // Finish on exact last word without needing a trailing space
    if (isLast && value === current) {
      completeWord(value, current, wordIndex + 1, start, false);
    }
  };

  const liveWpm = useMemo(() => {
    if (!startedAt || liveMs < 200) return 0;
    const minutes = liveMs / 60000;
    const current = words[wordIndex] ?? "";
    let extra = 0;
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] === current[i]) extra += 1;
    }
    return Math.round((correctChars + extra) / 5 / minutes);
  }, [startedAt, liveMs, correctChars, typed, words, wordIndex]);

  const renderWord = (word: string, i: number) => {
    if (i < wordIndex) {
      return (
        <span key={i} className="text-parchment-300/35">
          {word}{" "}
        </span>
      );
    }
    if (i > wordIndex) {
      return (
        <span key={i} className="text-parchment-200/80">
          {word}{" "}
        </span>
      );
    }

    return (
      <span key={i} className="relative">
        {word.split("").map((ch, ci) => {
          let color = "text-parchment-200/80";
          if (ci < typed.length) {
            color = typed[ci] === ch ? "text-amber-brand" : "text-rose-brand";
          }
          const isCaret = focused && !result && ci === typed.length;
          return (
            <span key={ci} className={`relative ${color}`}>
              {isCaret && (
                <span className="absolute bottom-0 left-0 top-0 w-[2px] animate-pulse bg-amber-brand" />
              )}
              {ch}
            </span>
          );
        })}
        {focused && !result && typed.length >= word.length && (
          <span className="inline-block h-[1.1em] w-[2px] animate-pulse bg-amber-brand align-middle" />
        )}{" "}
      </span>
    );
  };

  return (
    <div id="typing" className="glass scroll-mt-28 overflow-hidden rounded-3xl p-6 md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-brand/70">
            Challenge · Monkeytype
          </p>
          <h3 className="mt-2 font-display text-3xl text-parchment-100 md:text-4xl">
            Beat {targetWpm} WPM.
          </h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-parchment-300/65">
            Same format as my best: {wordCount} words. My score is{" "}
            <span className="text-amber-brand">{targetWpm} WPM</span> at 100%
            accuracy. Click in and type.
          </p>
        </div>
        <div className="text-right">
          <div className="font-display text-4xl text-amber-brand md:text-5xl">
            {targetWpm}
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-parchment-300/50">
            my best · {wordCount} words
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-6 border-y border-amber-brand/10 py-4 font-mono text-xs uppercase tracking-[0.18em] text-parchment-300/55">
        <span>
          wpm{" "}
          <span className="text-parchment-100">
            {result ? result.wpm : liveWpm || "—"}
          </span>
        </span>
        <span>
          target <span className="text-amber-brand">{targetWpm}</span>
        </span>
        <span>
          words{" "}
          <span className="text-parchment-100">
            {result ? wordCount : wordIndex}/{wordCount}
          </span>
        </span>
        {result && (
          <span>
            acc <span className="text-parchment-100">{result.accuracy}%</span>
          </span>
        )}
      </div>

      <div
        role="presentation"
        onClick={() => {
          setFocused(true);
          inputRef.current?.focus();
        }}
        className="relative mt-6 w-full cursor-text rounded-2xl border border-amber-brand/15 bg-ink-950/55 px-5 py-8 text-left transition-colors hover:border-amber-brand/30"
      >
        {!focused && !result && (
          <span className="pointer-events-none absolute inset-0 grid place-items-center font-mono text-[10px] uppercase tracking-[0.25em] text-parchment-300/40">
            Click here to start
          </span>
        )}
        <p
          className={`font-mono text-lg leading-relaxed tracking-wide md:text-xl ${
            !focused && !result ? "opacity-25" : ""
          }`}
        >
          {words.map(renderWord)}
        </p>
        <input
          ref={inputRef}
          value={typed}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={!!result}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label="Typing challenge input"
          className="absolute inset-0 cursor-text opacity-0"
        />
      </div>

      {result && (
        <div className="mt-6 rounded-2xl border border-amber-brand/15 bg-ink-900/50 px-5 py-5">
          <p className="font-display text-2xl text-parchment-100">
            {result.beat
              ? `You got me. ${result.wpm} WPM.`
              : result.wpm === targetWpm
              ? `Tie at ${result.wpm} WPM. Rematch?`
              : `${result.wpm} WPM. Close, but ${targetWpm} still stands.`}
          </p>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.15em] text-parchment-300/55">
            Accuracy {result.accuracy}%
          </p>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full border border-amber-brand/40 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-amber-brand transition-all hover:bg-amber-brand hover:text-ink-950"
        >
          {result ? "Try again" : "New words"}
        </button>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline font-mono text-[10px] uppercase tracking-[0.2em] text-parchment-300/70 hover:text-amber-brand"
        >
          Monkeytype · @{username} →
        </a>
      </div>
    </div>
  );
}
