const path = require('path');
const fs = require('fs/promises')
const { download, WrapServer } = require('minecraft-wrap');
const versions = require('mineflayer').testedVersions;

const SERVER_PATH = './server'
const FILE_Name = 'server.jar'

const SERVER_OPTIONS = {
  'level-type': 'FLAT',
  'spawn-npcs': 'true',
  'spawn-animals': 'false',
  'online-mode': 'false',
  'gamemode': '1',
  'spawn-monsters': 'false',
  'generate-structures': 'false',
  'enable-command-block': 'true',
  'use-native-transport': 'false', 
  'port': '25565',
  'minMem': '4G',
  'maxMem': '4g'
} // yes i have a cool pc

async function startServer() {
  if ((await fs.readdir('./')).includes('server')) {
    if (!(await fs.readdir(SERVER_PATH)).includes(FILE_Name)) {
      await download();
    }
  } else {
    await fs.mkdir('./server') 
    await downloadServer(); 
  }
  runServer();
}

function downloadServer() {
  return new Promise((resolve) => {
    download(versions[versions.length-1],SERVER_PATH+'/'+FILE_Name, resolve);
  })
}

function runServer() {
  const wrap = new WrapServer(path.resolve('server', 'server.jar'), path.resolve('server'))
  wrap.on('line', console.log)
  wrap.startServer(SERVER_OPTIONS, (err) => {console.log(err)})
}

startServer();