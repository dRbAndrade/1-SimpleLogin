export type MenuModule = {
    title: string,
    icon?: string,
    submodules?: MenuModule[],
    url?: string
}