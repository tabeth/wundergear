/* Wunderlist initialization */
WunderlistSDK = window.wunderlist.sdk;
WunderlistAPI = new WunderlistSDK ({
  'accessToken': localStorage.getItem('accessToken'),
    'clientID': localStorage.getItem('clientID')
});


