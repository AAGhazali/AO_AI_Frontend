import { AOReport } from "./AOReport";

export interface AoDto {
  id: string;
  date: string;
  name: string;
  state: "DONE" | "PENDING" | "IN_PROGRESS";
  aoUrl: string;
  reportUrl: string;
  report: AOReport;
}
