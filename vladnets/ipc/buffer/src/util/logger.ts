export enum ELogLevel {
    ok = " | ok",
    info = "",
    warn = " | warn",
    error = " | error",
}

export const colorMap = {
    [ELogLevel.ok]: "\x1b[32m",
    [ELogLevel.info]: "\x1b[0m",
    [ELogLevel.warn]: "\x1b[33m",
    [ELogLevel.error]: "\x1b[31m",
};

const log = (level: ELogLevel, ...messages: any[]) => {
    console.log(colorMap[level], `[vladnet${level}]`, ...messages);
};

export const logger = {
    ok: (...messages: any[]) => log(ELogLevel.ok, ...messages),
    info: (...messages: any[]) => log(ELogLevel.info, ...messages),
    warn: (...messages: any[]) => log(ELogLevel.warn, ...messages),
    error: (...messages: any[]) => log(ELogLevel.error, ...messages),
    log: (level: ELogLevel, ...messages: any[]) => log(level, ...messages),
};
