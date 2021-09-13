export interface ServerData {
  f42e9fc96a44d66055794c1e7c5ba4b0a13a8196: {
    environment: {
      time: string;
      time_acceleration: {
        general: number;
        night: number;
      };
    };
    mods: {
      file_id: string;
      name: string;
    }[];
    name: string;
    offline: boolean;
    online: boolean;
    status: {
      players: number;
      queue: {
        active: boolean;
        size: number;
      };
      slots: number;
    };
    version: string;
    map: string;
    host: {
      address: string;
      game_port: number;
    };
  };
  errorMessage: string | null;
}
