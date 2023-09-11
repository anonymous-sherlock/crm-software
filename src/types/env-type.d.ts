declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;
    DATABASE_URL: string;
    EMAIL_SERVER_HOST: string;
    EMAIL_SERVER_USER: string;
    EMAIL_SERVER_PASSWORD: string;
    EMAIL_SERVER_PORT: number;
    EMAIL_FROM: string;
    BASE_URL: string;
    FTP_HOST: string;
    FTP_PORT: number;
    FTP_USER: string;
    FTP_PASS: string;
    CDN_Domain: string;
  }
}
