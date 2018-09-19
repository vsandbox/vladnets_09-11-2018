export declare enum ELogLevel {
    ok = " | ok",
    info = "",
    warn = " | warn",
    error = " | error"
}
export declare const colorMap: {
    [ELogLevel.ok]: string;
    [ELogLevel.info]: string;
    [ELogLevel.warn]: string;
    [ELogLevel.error]: string;
};
export declare const logger: {
    ok: (...messages: any[]) => void;
    info: (...messages: any[]) => void;
    warn: (...messages: any[]) => void;
    error: (...messages: any[]) => void;
    log: (level: ELogLevel, ...messages: any[]) => void;
};
