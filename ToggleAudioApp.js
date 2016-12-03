#!/usr/bin/env osascript -l JavaScript

function run(args) {
  const appNames = ['Google Chrome'].concat(args);
  toggleAudioApp(appNames);
}

const toggleAudioApp = (appNames) => {
  /*
    Chrome が音声を再生していない場合も、すぐには再生しない。
    ウインドウの切替時などを考慮する。 (YouTube の連続再生中など)
    数カウント経過しても再生していない場合に、再生する。
   */
  const iTunes = Application('iTunes');
  const delaying = 1.0; // seconds
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
    const chromeEngine = Application(appName);
    return isChromePlaying(chromeEngine);
  });

const isAppWaking = (appName) => {
  const se = Application('System Events')
  return se.processes[appName].exists()
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
