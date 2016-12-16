#!/usr/bin/env osascript -l JavaScript
const app = Application.currentApplication();
app.includeStandardAdditions = true;

const CONFIG_FILE = app.pathTo('home folder') + '/' + '.taa_rc';

function run(args) {
  let fileContent = '';
  try {
    fileContent = app.read(CONFIG_FILE);
  } catch (e) {}
  const configAppNames = parseConfig(fileContent);
  console.log(configAppNames);
  const appNames = ['Google Chrome'].concat(args).concat(configAppNames);
  toggleAudioApp(appNames);
}

const parseConfig = (configStr) => {
  const lines = configStr.split('\n');
  return Array.from(lines).map((x) => x.trim())
              .filter((x) => !x.startsWith('#') || !x);
}

const toggleAudioApp = (appNames) => {
  /*
    Chrome が音声を再生していない場合も、すぐには再生しない。
    ウインドウの切替時などを考慮する。 (YouTube の連続再生中など)
    数カウント経過しても再生していない場合に、再生する。
   */
  const iTunes = Application('iTunes');
  const delaying = 5.0; // seconds
  const browserMoratorium = 10.0;
  let count = 0;
  while (true) {
    if (isAnyChromeEnginePlaying(appNames)) {
      iTunes.pause();
      count = 0.0;
    } else {
      count += delaying;
      if (count > browserMoratorium) {
        iTunes.play();
      }
    }
    delay(delaying);
  }
};

const isAnyChromeEnginePlaying = (appNames) =>
  appNames.some((appName) => {
    if (!isAppWaking(appName)) {
      return false;
    }
    try {
      const chromeEngine = Application(appName);
      return isChromePlaying(chromeEngine);
    } catch (e) {
      return false;
    }
  });

const isAppWaking = (appName) => {
  const se = Application('System Events');
  return se.processes[appName].exists();
};

const isChromePlaying = (app) =>
  app.windows().some(isChromeWindowPlaying);

const isChromeWindowPlaying = (window) =>
  window.tabs().some(isChromeTabPlaying);

const isChromeTabPlaying = (tab) =>
  tab.execute({javascript: `
    (() => {
      const tagNames = 'video,audio';
      const mediaElements = Array.from(document.querySelectorAll(tagNames));
      const isPlaying = (element) => !element.paused && !element.ended;
      const playingElements = mediaElements.filter(isPlaying);
      return playingElements.length > 0;
    })();
  `});
