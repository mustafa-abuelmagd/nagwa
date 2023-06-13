// Defining file configurations
export type configType = {
    app: { version: string, is_mandatory: boolean, name: string },
    port: number,
    NODE_ENV: string,
}

export const development: configType = {
    app: {
        version: "0.0.0",
        is_mandatory: false,
        name: "Javascript simple app",
    },
    port: 3000,
    NODE_ENV: "development",


};