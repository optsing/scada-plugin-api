/* eslint-disable */

function sendMessage (method, data) {
  window.parent.postMessage({
    type: 'PluginApi',
    method: method,
    data: data
  }, '*');
}

window.addEventListener('message', function (e) {
  if (e.data.response && e.data.method === 'identify') {
    sendMessage('updateUrl', {
      path: mw.config.get('wgRelevantPageName'),
      identify_token: e.data.result.identify_token
    });
  }
});

sendMessage('identify');