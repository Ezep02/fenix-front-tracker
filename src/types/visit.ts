export type Visit = {
  id: number;
  journey_id: number;
  visited: boolean;
  fire_extinguishers_left: boolean;
  fire_extinguishers_left_count: number;
  note: string;
  visited_by: number;
  visited_at: Date;
  updated_at: Date;
};
