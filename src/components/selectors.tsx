import * as React from "react";
import { Classes } from "@blueprintjs/core";

type Props<T extends string> = {
  value?: string;
  shown?: boolean;
  onChange: (value?: T) => void;
};

const makeSelector = <T extends string>(
  label: string,
  entries: [T, string][]
) => ({ value, shown, onChange }: Props<T>) => {
  if (shown === false) return null;
  return (
    <div className={`${Classes.SELECT} ${Classes.MINIMAL}`}>
      <select
        className={value === undefined ? Classes.INTENT_DANGER : ""}
        value={value}
        onChange={({ target: { value } }) => {
          if (value === label) {
            onChange();
          } else {
            onChange(value as T);
          }
        }}
      >
        <option>{label}</option>
        {entries.map(([k, v], i) => (
          <option key={i} value={k}>
            {v}
          </option>
        ))}
      </select>
    </div>
  );
};

export const PosSelector = makeSelector("品詞", [
  ["adjective", "形容詞"],
  ["adverb", "副詞"],
  ["article", "冠詞"],
  ["conjunction", "接続詞"],
  ["interjection", "間投詞"],
  ["noun", "名詞"],
  ["participle", "分詞"],
  ["particle", "小辞"],
  ["preposition", "前置詞"],
  ["pronoun", "代名詞"],
  ["verb", "動詞"]
]);

export const PersonSelector = makeSelector("人称", [
  ["first", "1人称"],
  ["second", "2人称"],
  ["third", "3人称"]
]);

export const NumberSelector = makeSelector("数", [
  ["singular", "単数"],
  ["dual", "双数"],
  ["plural", "複数"]
]);

export const TenseSelector = makeSelector("時制", [
  ["present", "現在"],
  ["imperfect", "未完了過去"],
  ["future", "未来"],
  ["aorist", "アオリスト"],
  ["perfect", "完了"],
  ["pluperfect", "過去完了"],
  ["future-perfect", "未来完了"]
]);

export const MoodSelector = makeSelector("法", [
  ["indicative", "直説法"],
  ["subjunctive", "接続法"],
  ["optative", "希求法"],
  ["infinitive", "不定法"]
]);

export const VoiceSelector = makeSelector("相", [
  ["active", "能動相"],
  ["middle", "中動相"],
  ["passive", "受動相"]
]);

export const GenderSelector = makeSelector("性", [
  ["masculine", "男性"],
  ["neuter", "中性"],
  ["feminine", "女性"]
]);

export const CaseSelector = makeSelector("格", [
  ["nominative", "主格"],
  ["vocative", "呼格"],
  ["genitive", "属格"],
  ["dative", "与格"],
  ["accusative", "対格"],
  ["ablative", "奪格"]
]);

// vim: set ts=2 sw=2 et:
