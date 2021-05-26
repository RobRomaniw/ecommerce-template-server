export const __prod__ = process.env.NODE_ENV === "production";

export default {
    __PROD__: process.env.NODE_ENV === "production",
    __PORT__: "4000"
} as const;