import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Cell {
    value: Value;
    name: string;
}
export type Error_ = {
    __kind__: "FrontendOriginsNotConfigured";
    FrontendOriginsNotConfigured: null;
} | {
    __kind__: "MixedSsoSources";
    MixedSsoSources: {
        otherKeys: Array<string>;
        ssoKeys: Array<string>;
    };
} | {
    __kind__: "Stale";
    Stale: {
        ageNs: bigint;
    };
} | {
    __kind__: "MalformedCandid";
    MalformedCandid: null;
} | {
    __kind__: "AmbiguousAttribute";
    AmbiguousAttribute: {
        field: string;
        sources: Array<string>;
    };
} | {
    __kind__: "NoAttributes";
    NoAttributes: null;
} | {
    __kind__: "UnknownNonce";
    UnknownNonce: null;
} | {
    __kind__: "UntrustedSsoSource";
    UntrustedSsoSource: {
        domain: string;
    };
} | {
    __kind__: "MissingField";
    MissingField: string;
} | {
    __kind__: "FrontendOriginMismatch";
    FrontendOriginMismatch: {
        got: string;
        expected: Array<string>;
    };
};
export interface Inquiry {
    id: InquiryId;
    projectType: ProjectType;
    name: string;
    createdAt: bigint;
    email: string;
    message: string;
}
export type InquiryId = bigint;
export interface InquiryInput {
    projectType: ProjectType;
    name: string;
    email: string;
    message: string;
}
export type Result = {
    __kind__: "ok";
    ok: Inquiry;
} | {
    __kind__: "err";
    err: InquiryError;
};
export type Result_1 = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: Error_;
};
export interface Result__1 {
    hasMore: boolean;
    rows: Array<Array<Cell>>;
}
export type Value = {
    __kind__: "int";
    int: bigint;
} | {
    __kind__: "nat";
    nat: bigint;
} | {
    __kind__: "float";
    float: number;
} | {
    __kind__: "bool";
    bool: boolean;
} | {
    __kind__: "null";
    null: null;
} | {
    __kind__: "text";
    text: string;
};
export enum InquiryError {
    invalidEmail = "invalidEmail",
    invalidMessage = "invalidMessage",
    invalidName = "invalidName"
}
export enum ProjectType {
    fullTrackProduction = "fullTrackProduction",
    other = "other",
    videoEditing = "videoEditing",
    mixingMastering = "mixingMastering",
    posterDesign = "posterDesign",
    devotionalSpiritual = "devotionalSpiritual",
    customComposition = "customComposition"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    execute(qJson: string): Promise<Result__1>;
    getApiDoc(): Promise<string>;
    getCallerUserRole(): Promise<UserRole>;
    isCallerAdmin(): Promise<boolean>;
    listInquiries(): Promise<Array<Inquiry>>;
    schema(): Promise<string>;
    submitInquiry(input: InquiryInput): Promise<Result>;
}
