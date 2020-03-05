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
  vars: { [var_id: string]: any };
}

export interface Section {
  id: string;
  parents: string[];
}

interface Request {
  event_type: string;
  tag: string;
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
}

const listeners: { [event_type: string]: (error: any, result: any, tag: string) => void } = { };
const requests: Request[] = [];
let json: JSON = JSON;

function sendMessage (type: string, data: any = undefined, tag: string = ''): void {
  window.parent.postMessage({
    type,
    tag,
    data
  }, '*');
}

function createRequest<T> (event_type: string, data = undefined as any, tag = '' as string): Promise<T> {
  const deferrer = new Promise<T>((resolve, reject) => {
    requests.push({
      event_type,
      tag,
      resolve,
      reject
    });
  });
  sendMessage(event_type, data, tag);
  return deferrer;
}

function checkResponses (event_type: string, tag: string, error: any, result: any): void {
  const request_ind = requests.findIndex(deferrer => deferrer.event_type === event_type && deferrer.tag === tag);
  if (request_ind > -1) {
    if (error) {
      requests[request_ind].reject(error);
    } else {
      requests[request_ind].resolve(result);
    }
    requests.splice(request_ind, 1);
  }
}

function checkListeners (event_type: string, tag: string, error: any, result: any): void {
  if (event_type in listeners) {
    listeners[event_type](error, result, tag);
  } else {
    checkResponses(event_type, tag, error, result);
  }
}

export function addListener (event_type: string, fn: (error: any, result: any, tag: string) => void): void {
  listeners[event_type] = fn;
}

export function setJSONParser (json_parser: JSON): void {
  json = json_parser;
}

export function getCurrentUser (): Promise<User> {
  return createRequest<User>('getCurrentUser');
}

export function sendNotifi (notifi: { text: string; state: string; title: string }): Promise<void> {
  return createRequest('notifi', notifi);
}

export function sendCommand (dev_id: string, command: string, argument?: number | string): Promise<void> {
  return createRequest<void>('sendCommand', {
    dev_id, command, argument
  }, dev_id + command + argument);
}

export function loadTextFile (filename: string): Promise<string> {
  return createRequest<string>('readFile', {
    filename
  }, filename);
}

export function saveTextFile (filename: string, content: string, is_overwrite = false): Promise<void> {
  return createRequest<void>('writeFile', {
    filename, is_overwrite, content
  }, filename);
}

export async function loadJSONFile (filename: string): Promise<any> {
  const text = await loadTextFile(filename);
  return json.parse(text);
}

export function saveJSONFile (filename: string, content: any, is_overwrite = false): Promise<void> {
  return saveTextFile(filename, JSON.stringify(content, null, 4), is_overwrite);
}

export function loadDevicesDefinitions (): Promise<{ [dev_id: string]: DeviceDefinition }> {
  return createRequest<{ [dev_id: string]: DeviceDefinition }>('getDevicesDefinitions');
}

export function saveDeviceDefinition (dev_id: string, {
  title = dev_id, section = 'unsorted', status_variable = '', mnemo = '', url = '', bg_image = '', plugins =[] as string[]
} = {}): Promise<void> {
  return createRequest<void>('saveDeviceDefinitionAdvanced', {
    dev_id, title, section, status_variable, mnemo, url, bg_image, plugins
  }, dev_id);
}

export function saveDeviceDescription (dev_id: string, {
  system = '', model = '', location = '', service = '', description = '', additional = ''
}): Promise<void> {
  return createRequest<void>('saveDeviceDescription', {
    dev_id, system, model, location, service, description, additional
  }, dev_id);
}

export function loadDevicesData (): Promise<DeviceData[]> {
  return createRequest<DeviceData[]>('getDevicesData');
}

export function loadDeviceData (dev_id: string): Promise<DeviceData > {
  return createRequest<DeviceData>('getDeviceData', {
    dev_id
  });
}

export function updateCache (path: string = '', replace_history: boolean = false): Promise<void> {
  return createRequest<void>('updateCache', {
    path, replace_history
  });
}

export function saveSection ({
  id = '', old_id = '', title = '', subtitle = '', icon = '', mnemo = '', view = 'tiles_mnemo', linked_dev_id = '',
  use_dev_state = false, subtitle_prop = '_service', is_uncollapsed = true, is_mixed = false, is_hidden_sidebar = false,
  parents =['root'], children =[], sorting =[], slideshow =[], owners =[], slideshow_width = 50
} = {}): Promise<void> {
  return createRequest<void>('saveSection', {
    id, old_id, title, subtitle, icon, mnemo, view, linked_dev_id, use_dev_state, subtitle_prop, is_uncollapsed, is_mixed, is_hidden_sidebar, parents, children, sorting, slideshow, owners, slideshow_width
  }, id);
}

export function addSection ({
  id = '', title = '', subtitle = '', icon = '', mnemo = '', view = 'tiles_mnemo', linked_dev_id = '',
  use_dev_state = false, subtitle_prop = '_service', is_uncollapsed = true, is_mixed = false, is_hidden_sidebar = false,
  parents =['root'], children =[], sorting =[], slideshow =[], owners =[], slideshow_width = 50
} = {}): Promise<void> {
  return createRequest<void>('addSection', {
    id, title, subtitle, icon, mnemo, view, linked_dev_id, use_dev_state, subtitle_prop, is_uncollapsed, is_mixed, is_hidden_sidebar, parents, children, sorting, slideshow, owners, slideshow_width
  }, id);
}

export function removeSection (id: string): Promise<void> {
  return createRequest<void>('removeSection', { id }, id);
}

export function loadSections (): Promise<Section[] > {
  return createRequest<Section[]>('getSections');
}

export function navigateTo (path: string, { query = {} as any, replace_history = false } = {}): Promise<void> {
  return createRequest('navigateTo', {
    path, query, replace_history
  }, path);
}

export function addToMailing (mail_id: number, device_ids: string[]): Promise<void> {
  return createRequest('addToMailing', {
    mail_id, device_ids
  }, mail_id.toString());
}

export function removeFromMailing (mail_id: number, device_ids: string[]): Promise<void> {
  return createRequest('removeFromMailing', {
    mail_id, device_ids
  }, mail_id.toString());
}

export function isInIframe (): boolean {
  return window.location !== window.parent.location;
}

window.addEventListener('message', e => {
  checkListeners(e.data.type, e.data.tag, e.data.error, e.data.result);
});