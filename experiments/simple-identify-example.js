/* eslint-disable */

function postMessage (method, data) {
    window.parent.postMessage({
      type: 'PluginApi',
      method: method,
      data: data
    }, '*');
}

window.addEventListener('message', function (e) {
  const method = e.data.method;
  if (method === 'identify') {
    postMessage('updateUrl', {
      path: mw.config.get('wgRelevantPageName'),
      identify_token: e.data.result.identify_token
    });
  }
});

postMessage('identify');