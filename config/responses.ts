export default interface GeneralResponse {
    success: boolean;
    error?: string;
    message?: string;
    data?: any;
}

export interface TokenData {
    Token: string,
    ExpiresIn: number,
}
