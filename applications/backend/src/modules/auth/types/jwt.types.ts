export interface JWTValidatePayload {
    sub: string;
    email: string;
}

export interface JWTValidateResult {
    userId: string;
    email: string;
}
