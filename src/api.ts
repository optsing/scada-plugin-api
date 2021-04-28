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
  status_variable: string;
  mnemo: string;
  url: string;
  bg_image: string;
  plugins: string[];
}

export interface DescriptionDeviceDefinition {
  doc_system: string;
  doc_model: string;
  doc_location_room: string;
  doc_service_room: string;
  doc_info: string;
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
  mode: string;
  room: string;
  service: string[];
  variables_info: { [var_id: string]: any };
  variables_tile: string[];
  comment: string;
  comment_author: string;
  comment_author_id: number;
  comment_date: Date | null;
}

export interface DeviceData {
  id: string;
  vars: { [var_id: string]: any };
}

export interface Section {
  id: string;
  parents: string[];
}

interface UrlButton {
  title: string;
  icon: string;
  url: string;
  url_mode?: 'external' | 'download';
}

interface FunctionButton {
  title: string;
  icon: string;
  onClick: () => void;
}

interface IdButton {
  title: string;
  icon: string;
  id: string;
}

interface Separator {
  separator: true;
}

interface Request {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
}

type Listener = (error: any, result: any, tag: string) => void;

const MESSAGE_TYPE = 'PluginApi';
const IS_IN_IFRAME = window.location !== window.parent.location;

const listeners: { [method: string]: Listener } = { };
const requests: { [tag: string]: Request } = { };

let identify_token: string;
let position: string;
let identify_promise: Promise<{ identify_token: string; position: string }>;

function sendMessage (method: string, data: any = undefined, tag: string = ''): void {
  window.parent.postMessage({
    type: MESSAGE_TYPE,
    method,
    tag,
    data,
  }, '*');
}

/**
 * Проверяет что страница загружена в iframe. Не гарантирует что страница загружена в cкаде!
 */
export function isInIframe (): boolean {
  return IS_IN_IFRAME;
}

function createRandomString (): string {
  return Math.random().toString(36).substring(2);
}

function createRequest<T> (method: string, data = undefined as any): Promise<T> {
  if (IS_IN_IFRAME) {
    const tag = method + createRandomString();
    const deferrer = new Promise<T>((resolve, reject) => {
      requests[tag] = {
        resolve,
        reject,
      };
    });
    sendMessage(method, data, tag);
    return deferrer;
  }
  return Promise.reject(new Error('Plugin Api: Not in iframe'));
}

function checkResponses (tag: string, error: any, result: any): void {
  if (tag in requests) {
    if (error) {
      requests[tag].reject(error);
    } else {
      requests[tag].resolve(result);
    }
    delete requests[tag];
  }
}

function checkListeners (method: string, tag: string, error: any, result: any): void {
  if (method in listeners) {
    listeners[method](error, result, tag);
  } else {
    checkResponses(tag, error, result);
  }
}

export function addListener (method: string, fn: (error: any, result: any, tag: string) => void): void {
  listeners[method] = fn;
}

/**
 *  Возвращает текущего пользователя
 */
export function getCurrentUser (): Promise<User> {
  return createRequest('getCurrentUser');
}

/**
 * Отображает всплывающее уведомление в системе
 * @param notifi Параметры всплывающего уведомления
 */
export function sendNotifi (notifi: { text: string; title: string; state?: 'success' | 'user' | 'warning' | 'message' | 'danger' | 'help' }): Promise<void> {
  return createRequest('notifi', notifi);
}

export function openDevicePage (device_id: string, { tab = 'info' }: { tab?: 'info' | 'control' | 'vars'; } = { }): Promise<void> {
  return createRequest('openDevicePage', {
    device_id,
    tab,
  });
}

/**
 * Отправляет команду в ядро
 * @param dev_id ID устройства
 * @param command ID команды
 * @param argument Передаваемое значение
 */
export function sendCommand (dev_id: string, command: string, argument?: number | string): Promise<void> {
  return createRequest('sendCommand', {
    dev_id,
    command,
    argument,
  });
}

/**
 * Возвращает содержимое текстового файла из папки Data
 * @param filename Путь к файлу
 */
export function loadTextFile (filename: string): Promise<string> {
  return createRequest('readFile', {
    filename,
  });
}

/**
 * Сохраняет данные в текстовый файл в папке Data
 * @param filename Путь к файлу
 * @param content Данные для сохранения
 * @param is_overwrite Разрешение на перезапись
 */
export function saveTextFile (filename: string, content: string, is_overwrite = false): Promise<void> {
  return createRequest('writeFile', {
    filename,
    is_overwrite,
    content,
  });
}

export async function loadJSONFile (filename: string, json_parser: { parse: (text: string) => any } = JSON): Promise<any> {
  const text = await loadTextFile(filename);
  return json_parser.parse(text);
}

export function saveJSONFile (filename: string, content: unknown, is_overwrite = false): Promise<void> {
  return saveTextFile(filename, JSON.stringify(content, null, 4), is_overwrite);
}

export function loadDevicesDefinitions (device_ids?: string[]): Promise<{ [dev_id: string]: DeviceDefinition }> {
  return createRequest('getDevicesDefinitions', {
    device_ids,
  });
}

export function saveDeviceDefinition (dev_id: string, {
  title = dev_id, section = 'unsorted', status_variable = '', mnemo = '', url = '', bg_image = '', plugins = [] as string[]
} = {}): Promise<void> {
  return createRequest('saveDeviceDefinitionAdvanced', {
    dev_id, title, section, status_variable, mnemo, url, bg_image, plugins
  });
}

export function saveDeviceDescription (dev_id: string, {
  system = '', model = '', location = '', service = '', description = '', additional = ''
} = {}): Promise<void> {
  return createRequest('saveDeviceDescription', {
    dev_id, system, model, location, service, description, additional,
  });
}

export function saveDeviceTileVariables (dev_id: string, variable_ids: string[]): Promise<void> {
  return createRequest('saveDeviceTileVariables', {
    dev_id,
    variable_ids,
  });
}

export function saveDeviceCommands (dev_id: string, variable_ids: string[]): Promise<void> {
  return createRequest('saveDeviceCommands', {
    dev_id,
    variable_ids,
  });
}

export function loadDevicesData (): Promise<DeviceData[]> {
  return createRequest('getDevicesData');
}

export function loadDeviceData (dev_id: string): Promise<DeviceData > {
  return createRequest('getDeviceData', {
    dev_id,
  });
}

export function updateCache (): Promise<void> {
  return createRequest('updateCache');
}

export function saveSection ({
  id = '', old_id = '', title = '', subtitle = '', icon = '', mnemo = '', view = 'tiles_mnemo', linked_dev_id = '',
  use_dev_state = false, subtitle_prop = '_service', is_uncollapsed = true, is_mixed = false, is_hidden_sidebar = false,
  parents =['root'], children =[], sorting =[], slideshow =[], owners =[], slideshow_width = 50
} = {}): Promise<void> {
  return createRequest('saveSection', {
    id, old_id, title, subtitle, icon, mnemo, view, linked_dev_id, use_dev_state, subtitle_prop, is_uncollapsed, is_mixed, is_hidden_sidebar, parents, children, sorting, slideshow, owners, slideshow_width
  });
}

export function addSection ({
  id = '', title = '', subtitle = '', icon = '', mnemo = '', view = 'tiles_mnemo', linked_dev_id = '',
  use_dev_state = false, subtitle_prop = '_service', is_uncollapsed = true, is_mixed = false, is_hidden_sidebar = false,
  parents =['root'], children =[], sorting =[], slideshow =[], owners =[], slideshow_width = 50
} = {}): Promise<void> {
  return createRequest('addSection', {
    id, title, subtitle, icon, mnemo, view, linked_dev_id, use_dev_state, subtitle_prop, is_uncollapsed, is_mixed, is_hidden_sidebar, parents, children, sorting, slideshow, owners, slideshow_width
  });
}

export function removeSection (id: string): Promise<void> {
  return createRequest('removeSection', {
    id,
  });
}

export function loadSection (id: string): Promise<Section> {
  return createRequest('getSection', {
    id,
  });
}

export function loadSections (): Promise<Section[] > {
  return createRequest('getSections');
}

export function navigateTo (path: string, { query = {} as { [key: string]: any }, replace_history = false, update_cache = false } = {}): Promise<void> {
  return createRequest('navigateTo', {
    path,
    query,
    replace_history,
    update_cache,
  });
}

export function navigateToSection (id: string, { replace_history = false, update_cache = false } = { }): Promise<void> {
  return createRequest('navigateToSection', {
    id,
    replace_history,
    update_cache,
  });
}

export function navigateToDevice (id: string, { show_device_page = true, replace_history = false, update_cache = false } = { }): Promise<void> {
  return createRequest('navigateToDevice', {
    id,
    show_device_page,
    replace_history,
    update_cache,
  });
}

export function addToMailing (mail_id: number, device_ids: string[]): Promise<void> {
  return createRequest('addToMailing', {
    mail_id,
    device_ids,
  });
}

export function removeFromMailing (mail_id: number, device_ids: string[]): Promise<void> {
  return createRequest('removeFromMailing', {
    mail_id,
    device_ids,
  });
}

export function loadDeviceArchiveData (device_id: string, var_list: string[], date_from: string, date_to: string, { step = 60 } = { }): Promise<{ [var_id: string]: { x: number[], y: any[] } }> {
  return createRequest('getDeviceArchiveData', {
    device_id,
    var_list,
    date_from,
    date_to,
    step,
  });
}

export async function identify (): Promise<void> {
  if (!identify_promise) {
    identify_promise = createRequest('identify');
  }
  const response = await identify_promise;
  identify_token = response.identify_token;
  position = response.position;
}

export async function getPosition (): Promise<string> {
  if (!position) {
    await identify();
  }
  return position;
}

/**
 * Получение подписанного JWT-токена
 */
export async function getToken (): Promise<{ token: string }> {
  if (!identify_token) {
    await identify();
  }
  return createRequest('getToken', {
    identify_token,
  });
}

export async function loadSettings (): Promise<any> {
  if (!identify_token) {
    await identify();
  }
  return createRequest('loadSettings', {
    identify_token,
  });
}

export async function updateUrl ({ path, device_id }: { path?: string; device_id?: string }): Promise<void> {
  if (!identify_token) {
    await identify();
  }
  return createRequest('updateUrl', {
    path,
    device_id,
    identify_token,
  });
}

export async function updateTitle ({ title, icon }: { title?: string; icon?: string }): Promise<void> {
  if (!identify_token) {
    await identify();
  }
  return createRequest('updateTitle', {
    title,
    icon,
    identify_token,
  });
}

export async function resizeWindow (width: null | number, height: null | number, preserve_aspect_ratio: boolean = false): Promise<void> {
  if (!identify_token) {
    await identify();
  }
  return createRequest('resizeWindow', {
    width,
    height,
    preserve_aspect_ratio,
    identify_token,
  });
}

let button_id_to_listeners: { [id: string]: () => void } = { };

export function addButtonListener (id: string, listener: () => void): void {
  button_id_to_listeners[id] = listener;
}

export function removeButtonListener (id: string): void {
  delete button_id_to_listeners[id];
}

addListener('buttonClicked', (_, { id }) => {
  if (id in button_id_to_listeners) {
    button_id_to_listeners[id]();
  }
});

export async function registerButtons (buttons: (UrlButton | FunctionButton | Separator)[]): Promise<void> {
  if (!identify_token) {
    await identify();
  }
  button_id_to_listeners = { };
  const request_buttons: (UrlButton | IdButton | Separator)[] = [];
  buttons.forEach(btn => {
    if ('url' in btn) {
      const urlButton: UrlButton = {
        title: btn.title,
        icon: btn.icon,
        url: btn.url,
      };
      if (btn.url_mode) {
        urlButton.url_mode = btn.url_mode;
      }
      request_buttons.push(urlButton);
    } else if ('onClick' in btn) {
      const id = createRandomString();
      addButtonListener(id, btn.onClick);
      const idButton: IdButton = {
        title: btn.title,
        icon: btn.icon,
        id,
      };
      request_buttons.push(idButton);
    } else if (btn.separator) {
      request_buttons.push({
        separator: true,
      });
    }
  });
  return createRequest('registerButtons', {
    buttons: request_buttons,
    identify_token,
  });
}

window.addEventListener('message', e => {
  if (e.data.type === MESSAGE_TYPE && e.data.response) {
    checkListeners(e.data.method, e.data.tag, e.data.error, e.data.result);
  }
});