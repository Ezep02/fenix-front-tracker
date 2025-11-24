import { Journey } from "@/types/journey";
import { JourneyStatus } from "@/types/JourneyStatus";



export type JourneyFilterBy = "DESC" | "ASC"


export type JourneyHashmapItem = {
    item: Journey
    is_active: boolean
    item_status: JourneyStatus
    page: number
}
