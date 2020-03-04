import json5 from 'json5';
// const json5 = JSON;

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

function sendMessage (type: string, data: any = undefined, tag: string = ''): void {
  window.parent.postMessage({
    type,
    tag,
    data
  }, '*');
}

interface Request {
  event_type: string;
  tag: string;
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
}

const PluginApi = {
  listeners: { } as { [event_type: string]: (error: any, result: any, tag: string) => void },
  requests: [] as Request[],
  createRequest<T> (event_type: string, data = undefined as any, tag = '' as string): Promise<T> {
    const deferrer = new Promise<T>((resolve, reject) => {
      this.requests.push({
        event_type,
        tag,
        resolve,
        reject
      });
    });
    sendMessage(event_type, data, tag);
    return deferrer;
  },
  checkResponses (event_type: string, tag: string, error: any, result: any): void {
    const request_ind = this.requests.findIndex(deferrer => deferrer.event_type === event_type && deferrer.tag === tag);
    if (request_ind > -1) {
      if (error) {
        this.requests[request_ind].reject(error);
      } else {
        this.requests[request_ind].resolve(result);
      }
      this.requests.splice(request_ind, 1);
    }
  },
  checkListeners (event_type: string, tag: string, error: any, result: any): void {
    if (event_type in this.listeners) {
      this.listeners[event_type](error, result, tag);
    } else {
      this.checkResponses(event_type, tag, error, result);
    }
  },
  addListener (event_type: string, fn: (error: any, result: any, tag: string) => void): void {
    this.listeners[event_type] = fn;
  },
  getCurrentUser (): Promise<User> {
    return this.createRequest<User>('getCurrentUser');
  },
  sendNotifi (notifi: { text: string; state: string; title: string }): Promise<void> {
    return this.createRequest('notifi', notifi);
  },
  sendCommand (dev_id: string, command: string, argument?: number | string): Promise<void> {
    return this.createRequest<void>('sendCommand', {
      dev_id, command, argument
    }, dev_id + command + argument);
  },
  loadTextFile (filename: string): Promise<string> {
    return this.createRequest<string>('readFile', {
      filename
    }, filename);
  },
  saveTextFile (filename: string, content: string, is_overwrite = false): Promise<void> {
    return this.createRequest<void>('writeFile', {
      filename, is_overwrite, content
    }, filename);
  },
  loadJSONFile (filename: string): Promise<any> {
    return this.loadTextFile(filename)
      .then((text: string) => {
        return json5.parse(text);
      });
  },
  saveJSONFile (filename: string, content: any, is_overwrite = false): Promise<void> {
    return this.saveTextFile(filename, JSON.stringify(content, null, 4), is_overwrite);
  },
  loadDevicesDefinitions (): Promise<{[dev_id: string]: DeviceDefinition}> {
    return this.createRequest<{[dev_id: string]: DeviceDefinition}>('getDevicesDefinitions');
  },
  saveDeviceDefinition (dev_id: string, {
    title = dev_id, section = 'unsorted', status_variable = '', mnemo = '', url = '', bg_image = '', plugins = [] as string[]
  } = { }): Promise<void> {
    return this.createRequest<void>('saveDeviceDefinitionAdvanced', {
      dev_id, title, section, status_variable, mnemo, url, bg_image, plugins
    }, dev_id);
  },
  saveDeviceDescription (dev_id: string, {
    system = '', model = '', location = '', service = '', description = '', additional = ''
  }): Promise<void> {
    return this.createRequest<void>('saveDeviceDescription', {
      dev_id, system, model, location, service, description, additional
    }, dev_id);
  },
  loadDevicesData (): Promise<DeviceData[]> {
    return this.createRequest<DeviceData[]>('getDevicesData');
  },
  loadDeviceData (dev_id: string): Promise<DeviceData> {
    return this.createRequest<DeviceData>('getDeviceData', {
      dev_id
    });
  },
  updateCache (path: string = '', replace_history: boolean = false): Promise<void> {
    return this.createRequest<void>('updateCache', {
      path, replace_history
    });
  },
  saveSection ({
    id = '', old_id = '', title = '', subtitle = '', icon = '', mnemo = '', view = 'tiles_mnemo', linked_dev_id = '',
    use_dev_state = false, subtitle_prop = '_service', is_uncollapsed = true, is_mixed = false, is_hidden_sidebar = false,
    parents = ['root'], children = [], sorting = [], slideshow = [], owners = [], slideshow_width = 50
  } = { }): Promise<void> {
    return this.createRequest<void>('saveSection', {
      id, old_id, title, subtitle, icon, mnemo, view, linked_dev_id, use_dev_state, subtitle_prop, is_uncollapsed, is_mixed, is_hidden_sidebar, parents, children, sorting, slideshow, owners, slideshow_width
    }, id);
  },
  addSection ({
    id = '', title = '', subtitle = '', icon = '', mnemo = '', view = 'tiles_mnemo', linked_dev_id = '',
    use_dev_state = false, subtitle_prop = '_service', is_uncollapsed = true, is_mixed = false, is_hidden_sidebar = false,
    parents = ['root'], children = [], sorting = [], slideshow = [], owners = [], slideshow_width = 50
  } = { }): Promise<void> {
    return this.createRequest<void>('addSection', {
      id, title, subtitle, icon, mnemo, view, linked_dev_id, use_dev_state, subtitle_prop, is_uncollapsed, is_mixed, is_hidden_sidebar, parents, children, sorting, slideshow, owners, slideshow_width
    }, id);
  },
  removeSection (id: string): Promise<void> {
    return this.createRequest<void>('removeSection', {
      id
    }, id);
  },
  loadSections (): Promise<Section[]> {
    return this.createRequest<Section[]>('getSections');
  },
  navigateTo (path: string, { query = { } as any, replace_history = false } = { }): Promise<void> {
    return this.createRequest('navigateTo', {
      path, query, replace_history
    }, path);
  },
  addToMailing (mail_id: number, device_ids: string[]): Promise<void> {
    return this.createRequest('addToMailing', {
      mail_id, device_ids
    }, mail_id.toString());
  },
  removeFromMailing (mail_id: number, device_ids: string[]): Promise<void> {
    return this.createRequest('removeFromMailing', {
      mail_id, device_ids
    }, mail_id.toString());
  },
  isInIframe (): boolean {
    return window.location !== window.parent.location;
  }
};

window.addEventListener('message', e => {
  PluginApi.checkListeners(e.data.type, e.data.tag, e.data.error, e.data.result);
});

(window as any).PluginApi = PluginApi;

export default PluginApi;

