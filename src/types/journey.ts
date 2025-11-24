import { Visit } from "@/types/visit";
import { JourneyStatus } from "./JourneyStatus";


export interface Journey {
  id: number;
  client_number: number;               // client_number en SQL
  name: string;                        // name
  surname?: string;                    // surname puede ser opcional si es nullable
  phone?: string;                      // phone puede ser opcional
  trade_name?: string;                 // trade_name
  address: string;                     // dirección original (raw)
  
  // Campos de dirección segmentada
  street_name?: string;                // street_name
  street_number?: number;              // street_number
  house_number?: string;               // house_number
  between_streets?: string;            // between_streets
  extra_info?: string;                 // extra_info

  fire_extinguisher_numbers: string[]; // JSON en SQL
  manufacture_years: string[];         // JSON en SQL
  types: string[];                     // JSON en SQL

  journey_status: JourneyStatus;       // ENUM en SQL
  quantity?: number;                   // quantity puede ser opcional
  created_at?: Date;                   // created_at
  updated_at?: Date;                   // updated_at

  visits?: Visit
}



