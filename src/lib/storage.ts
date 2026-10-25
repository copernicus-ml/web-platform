import type { DataWindowOpt, FeatureGroupOpt } from "@/apis";

const localStorageKey = "copernicus";
const maxRecords = 20;
type SearchRecord = {
  ticker: string;
  window: DataWindowOpt;
  group: FeatureGroupOpt;
};

const addSearchHistory = (
  ticker: string,
  window: DataWindowOpt,
  group: FeatureGroupOpt,
) => {
  const newRecord: SearchRecord = { ticker, window, group };
  const localData = localStorage.getItem(localStorageKey);
  const storage = localData ? JSON.parse(localData) : undefined;
  if (storage === undefined) {
    localStorage.setItem(localStorageKey, JSON.stringify({ records: [newRecord] }));
    return;
  }
  let currRecords = (storage.records ?? []) as SearchRecord[];
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
  const localData = localStorage.getItem(localStorageKey);
  const storage = localData ? JSON.parse(localData) : undefined;
  if (!storage || !storage.records || storage.records.length === 0) return undefined;
  return storage.records.pop() as SearchRecord;
};

export { addSearchHistory, readLastSearch };
