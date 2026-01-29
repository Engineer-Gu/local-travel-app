export { };

declare global {
    interface Window {
        Capacitor?: {
            isNative?: boolean;
            [key: string]: any;
        };
    }
}
