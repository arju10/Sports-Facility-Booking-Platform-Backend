interface Config {
    NODE_ENV: string;
    port: number;
    database_url: string;
    bcrypt_salt_rounds: number;
    jwt_access_secret: string;
    jwt_refresh_secret: string;
    jwt_access_expires_in: string;
    jwt_refresh_expires_in: string;
    default_admin_password: string;
}
declare const config: Config;
export default config;
//# sourceMappingURL=index.d.ts.map