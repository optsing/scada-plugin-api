export interface User {
    id: number;
    username: string;
    privilege: string;
    position: string;
    email: string;
    phone: string;
    last_login: string;
    auth_type: string;
}
export interface BasicDeviceDefinition {
    title: string;
    section: string;
    mode: string;
    mnemo: string;
    url: string;
    bg_image: string;
    plugins: string[];
}
export interface DescriptionDeviceDefinition {
    system: string;
    model: string;
    location: string;
    service: string;
    description: string;
    additional: string;
}
export interface DeviceDefinition extends BasicDeviceDefinition, DescriptionDeviceDefinition {
    id: string;
    type: string;
    driver_type: string;
    address: string;
    config_path: string;
    commands: string[];
    commands_tile: string[];
    handler: string;
    variables_info: {
        [var_id: string]: any;
    };
    variables_tile: string[];
    comment: string;
    comment_author: string;
    comment_author_id: number;
    comment_date: Date | null;
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
export interface UrlButton {
    title: string;
    icon: string;
    url: string;
    url_mode?: 'external' | 'download';
}
export interface FunctionButton {
    title: string;
    icon: string;
    onClick: () => void;
}
export interface IdButton {
    title: string;
    icon: string;
    id: string;
}
export interface Separator {
    separator: true;
}
/**
 * Проверяет что страница загружена в iframe. Не гарантирует что страница загружена в cкаде!
 */
export declare function isInIframe(): boolean;
export declare function addListener(method: string, fn: (error: any, result: any, tag: string) => void): void;
/**
 *  Возвращает текущего пользователя
 */
export declare function getCurrentUser(): Promise<User>;
/**
 * Отображает всплывающее уведомление в системе
 * @param notifi Параметры всплывающего уведомления
 */
export declare function sendNotifi(notifi: {
    text: string;
    title: string;
    state?: 'success' | 'user' | 'warning' | 'message' | 'danger' | 'help';
}): Promise<void>;
export declare function openDevicePage(device_id: string, { tab }?: {
    tab?: 'info' | 'control' | 'vars';
}): Promise<void>;
/**
 * Отправляет команду в ядро
 * @param dev_id ID устройства
 * @param command ID команды
 * @param argument Передаваемое значение
 */
export declare function sendCommand(dev_id: string, command: string, argument?: number | string): Promise<void>;
/**
 * Возвращает содержимое текстового файла из папки Data
 * @param filename Путь к файлу
 */
export declare function loadTextFile(filename: string): Promise<string>;
/**
 * Сохраняет данные в текстовый файл в папке Data
 * @param filename Путь к файлу
 * @param content Данные для сохранения
 * @param is_overwrite Разрешение на перезапись
 */
export declare function saveTextFile(filename: string, content: string, is_overwrite?: boolean): Promise<void>;
export declare function loadJSONFile(filename: string, json_parser?: {
    parse: (text: string) => any;
}): Promise<any>;
export declare function saveJSONFile(filename: string, content: unknown, is_overwrite?: boolean): Promise<void>;
export declare function loadDevicesDefinitions(device_ids?: string[]): Promise<{
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
export declare function saveDeviceDescription(dev_id: string, { system, model, location, service, description, additional }?: {
    system?: string | undefined;
    model?: string | undefined;
    location?: string | undefined;
    service?: string | undefined;
    description?: string | undefined;
    additional?: string | undefined;
}): Promise<void>;
export declare function saveDeviceTileVariables(dev_id: string, variable_ids: string[]): Promise<void>;
export declare function saveDeviceCommands(dev_id: string, variable_ids: string[]): Promise<void>;
export declare function loadDevicesData(): Promise<DeviceData[]>;
export declare function loadDeviceData(dev_id: string): Promise<DeviceData>;
export declare function updateCache(): Promise<void>;
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
export declare function loadSection(id: string): Promise<Section>;
export declare function loadSections(): Promise<Section[]>;
export declare function navigateTo(path: string, { query, replace_history, update_cache }?: {
    query?: {
        [key: string]: any;
    } | undefined;
    replace_history?: boolean | undefined;
    update_cache?: boolean | undefined;
}): Promise<void>;
export declare function navigateToSection(id: string, { replace_history, update_cache }?: {
    replace_history?: boolean | undefined;
    update_cache?: boolean | undefined;
}): Promise<void>;
export declare function navigateToDevice(id: string, { show_device_page, replace_history, update_cache }?: {
    show_device_page?: boolean | undefined;
    replace_history?: boolean | undefined;
    update_cache?: boolean | undefined;
}): Promise<void>;
export declare function addToMailing(mail_id: number, device_ids: string[]): Promise<void>;
export declare function removeFromMailing(mail_id: number, device_ids: string[]): Promise<void>;
export declare function loadDeviceArchiveData(device_id: string, var_list: string[], date_from: string, date_to: string, { step }?: {
    step?: number | undefined;
}): Promise<{
    [var_id: string]: {
        x: number[];
        y: any[];
    };
}>;
export declare function identify(): Promise<void>;
export declare function getPosition(): Promise<string>;
/**
 * Получение подписанного JWT-токена
 */
export declare function getToken(): Promise<{
    token: string;
}>;
export declare function loadSettings(): Promise<any>;
export declare function updateUrl({ path, device_id }: {
    path?: string;
    device_id?: string;
}): Promise<void>;
export declare function updateTitle({ title, icon }: {
    title?: string;
    icon?: string;
}): Promise<void>;
export declare function resizeWindow(width: null | number, height: null | number, preserve_aspect_ratio?: boolean): Promise<void>;
export declare function addButtonListener(id: string, listener: () => void): void;
export declare function removeButtonListener(id: string): void;
export declare function registerButtons(buttons: (UrlButton | FunctionButton | Separator)[]): Promise<void>;
