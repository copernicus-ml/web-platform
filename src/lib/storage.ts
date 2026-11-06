import type { DataWindowOpt, FeatureGroupOpt } from "@/apis";
import type { AppLanguage } from "@/i18n/i18n";

const localStorageKey = "copernicus";
const maxRecords = 10;

type SearchRecord = {
  ticker: string;
  window: DataWindowOpt;
  group: FeatureGroupOpt;
};

type Preference = {
  language: AppLanguage;
};

const readLocalStorage = () => {
  const localData = localStorage.getItem(localStorageKey);
  const storage = localData ? JSON.parse(localData) : undefined;
  return storage;
};

const addSearchHistory = (
  ticker: string,
  window: DataWindowOpt,
  group: FeatureGroupOpt,
) => {
  const newRecord: SearchRecord = { ticker, window, group };
  const storage = readLocalStorage();
  if (storage === undefined) {
    localStorage.setItem(localStorageKey, JSON.stringify({ records: [newRecord] }));
    return;
  }
  let currRecords = storage.records as SearchRecord[];
  currRecords = currRecords.filter((record) => record.ticker !== ticker);
  currRecords.push(newRecord);
  if (currRecords.length > maxRecords) {
    currRecords = currRecords.slice(-maxRecords);
  }
  localStorage.setItem(
    localStorageKey,
    JSON.stringify({ ...storage, records: currRecords }),
  );
};

const readLastSearch = () => {
  const storage = readLocalStorage();
  if (!storage || !storage.records || storage.records.length === 0) return undefined;
  const record = storage.records.pop() as SearchRecord;
  localStorage.setItem(localStorageKey, JSON.stringify({ ...storage }));
  return record;
};

export const readPreference = () => {
  const storage = readLocalStorage();
  if (!storage || !storage.preference) return undefined;
  const preference = storage.preference as Preference;
  return preference;
};

const setLanguagePreference = (language: string) => {
  const storage = readLocalStorage();
  const preference =
    storage && storage.preference
      ? { ...storage.preference, language }
      : ({ language } as Preference);
  localStorage.setItem(localStorageKey, JSON.stringify({ ...storage, preference }));
};

export type { SearchRecord };
export { maxRecords, addSearchHistory, readLastSearch, setLanguagePreference };
