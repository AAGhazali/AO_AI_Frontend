import { Ao } from "@/types/AO";
import { AoDto } from "@/types/AO-dto";
import { AoState } from "@/types/AOState";

export class AOAssembler {
  static fromDto(dto: AoDto): Ao {
    return {
      id: dto.id,
      date: new Date(dto.date + "Z"),
      name: dto.name,
      state: this.AOStateFromKey(dto.state),
      aoUrl: dto.aoUrl,
      reportUrl: "/" + dto.id,
      report: dto.report,
    };
  }

  static AOStateFromKey(key: "DONE" | "PENDING" | "IN_PROGRESS"): AoState {
    switch (key) {
      case "DONE":
        return AoState.DONE;
      case "PENDING":
        return AoState.PENDING;
      case "IN_PROGRESS":
        return AoState.IN_PROGRESS;
    }
  }
}
