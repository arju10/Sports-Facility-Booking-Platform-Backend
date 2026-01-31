import { IFacility } from "./facility.interface";
export declare const FacilityService: {
    createFacility: (payload: IFacility) => Promise<IFacility>;
    getAllFacilities: (query: Record<string, unknown>) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
        data: (import("mongoose").Document<unknown, {}, IFacility, {}, {}> & IFacility & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
    getFacilityById: (id: string) => Promise<IFacility>;
    updateFacility: (id: string, payload: Partial<IFacility>) => Promise<IFacility>;
    deleteFacility: (id: string) => Promise<IFacility>;
};
//# sourceMappingURL=facility.service.d.ts.map