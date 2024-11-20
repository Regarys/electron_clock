const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    getTime: () => new Date()
  });