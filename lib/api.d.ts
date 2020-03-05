interface User {
    id: number;
    username: string;
    privilege: string;
    position: string;
    email: string;
    phone: string;
    last_login: string;
    auth_type: string;
}
export interface DeviceDefinition {
    title: string;
    type: string;
    section: string;
    address: string;
    additional: string;
    config_path: string;
    doc_info: string;
    doc_system: string;
    pdu_poses?: string[];
    rack_type_title?: string;
}
export interface DeviceData {
    id: string;
    vars: {
        [var_id: string]: any;
    };
}
export interface Section {
    id: string;
    parents: string[];
}
export declare function addListener(event_type: string, fn: (error: any, result: any, tag: string) => void): void;
export declare function setJSONParser(json_parser: {
    parse: (text: string) => any;
}): void;
export declare function getCurrentUser(): Promise<User>;
export declare function sendNotifi(notifi: {
    text: string;
    state: string;
    title: string;
}): Promise<void>;
export declare function sendCommand(dev_id: string, command: string, argument?: number | string): Promise<void>;
export declare function loadTextFile(filename: string): Promise<string>;
export declare function saveTextFile(filename: string, content: string, is_overwrite?: boolean): Promise<void>;
export declare function loadJSONFile(filename: string): Promise<any>;
export declare function saveJSONFile(filename: string, content: any, is_overwrite?: boolean): Promise<void>;
export declare function loadDevicesDefinitions(): Promise<{
    [dev_id: string]: DeviceDefinition;
}>;
export declare function saveDeviceDefinition(dev_id: string, { title, section, status_variable, mnemo, url, bg_image, plugins }?: {
    title?: string | undefined;
    section?: string | undefined;
    status_variable?: string | undefined;
    mnemo?: string | undefined;
    url?: string | undefined;
    bg_image?: string | undefined;
    plugins?: string[] | undefined;
}): Promise<void>;
export declare function saveDeviceDescription(dev_id: string, { system, model, location, service, description, additional }: {
    system?: string | undefined;
    model?: string | undefined;
    location?: string | undefined;
    service?: string | undefined;
    description?: string | undefined;
    additional?: string | undefined;
}): Promise<void>;
export declare function loadDevicesData(): Promise<DeviceData[]>;
export declare function loadDeviceData(dev_id: string): Promise<DeviceData>;
export declare function updateCache(path?: string, replace_history?: boolean): Promise<void>;
export declare function saveSection({ id, old_id, title, subtitle, icon, mnemo, view, linked_dev_id, use_dev_state, subtitle_prop, is_uncollapsed, is_mixed, is_hidden_sidebar, parents, children, sorting, slideshow, owners, slideshow_width }?: {
    id?: string | undefined;
    old_id?: string | undefined;
    title?: string | undefined;
    subtitle?: string | undefined;
    icon?: string | undefined;
    mnemo?: string | undefined;
    view?: string | undefined;
    linked_dev_id?: string | undefined;
    use_dev_state?: boolean | undefined;
    subtitle_prop?: string | undefined;
    is_uncollapsed?: boolean | undefined;
    is_mixed?: boolean | undefined;
    is_hidden_sidebar?: boolean | undefined;
    parents?: string[] | undefined;
    children?: never[] | undefined;
    sorting?: never[] | undefined;
    slideshow?: never[] | undefined;
    owners?: never[] | undefined;
    slideshow_width?: number | undefined;
}): Promise<void>;
export declare function addSection({ id, title, subtitle, icon, mnemo, view, linked_dev_id, use_dev_state, subtitle_prop, is_uncollapsed, is_mixed, is_hidden_sidebar, parents, children, sorting, slideshow, owners, slideshow_width }?: {
    id?: string | undefined;
    title?: string | undefined;
    subtitle?: string | undefined;
    icon?: string | undefined;
    mnemo?: string | undefined;
    view?: string | undefined;
    linked_dev_id?: string | undefined;
    use_dev_state?: boolean | undefined;
    subtitle_prop?: string | undefined;
    is_uncollapsed?: boolean | undefined;
    is_mixed?: boolean | undefined;
    is_hidden_sidebar?: boolean | undefined;
    parents?: string[] | undefined;
    children?: never[] | undefined;
    sorting?: never[] | undefined;
    slideshow?: never[] | undefined;
    owners?: never[] | undefined;
    slideshow_width?: number | undefined;
}): Promise<void>;
export declare function removeSection(id: string): Promise<void>;
export declare function loadSections(): Promise<Section[]>;
export declare function navigateTo(path: string, { query, replace_history }?: {
    query?: any;
    replace_history?: boolean | undefined;
}): Promise<void>;
export declare function addToMailing(mail_id: number, device_ids: string[]): Promise<void>;
export declare function removeFromMailing(mail_id: number, device_ids: string[]): Promise<void>;
export declare function isInIframe(): boolean;
export {};
