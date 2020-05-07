/* eslint-disable */

function postMessage (type, data) {
    window.parent.postMessage({
        type: type,
        data: data
    }, '*');
}

window.addEventListener('message', function (e) {
  const type = e.data.type;
  if (type === 'identify') {
    postMessage('updateUrl', {
      path: mw.config.get('wgRelevantPageName'),
      identify_token: e.data.result.identify_token
    });
  }
});

postMessage('identify');