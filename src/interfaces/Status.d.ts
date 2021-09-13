export interface Status {
  players: number;
  queue: {
    active: boolean;
    size: number;
  };
  slots: number;
}
