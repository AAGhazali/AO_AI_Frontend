import { AOReport } from "./AOReport";
import { AoState } from "./AOState";

export interface Ao {
  id: string;
  date: Date;
  name: string;
  state: AoState;
  aoUrl: string;
  reportUrl: string;
  report: AOReport;
}
