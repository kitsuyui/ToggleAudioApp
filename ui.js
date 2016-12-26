const menuLabel = 'T';

ObjC.import('Cocoa');
ObjC.registerSubclass({
  name: 'MenuAction',
  methods: {
    'quit': {
      types: ['void', ['id']],
      implementation: (sender) => $.NSApp.terminate(this),
    },
    'pause': {
      types: ['void', ['id']],
      implementation: (sender) => togglePauseAndResume(),
    },
  },
});
const menu = $.NSMenu.new;
const menuActionQuit = $.MenuAction.new;
const menuActionPause = $.MenuAction.new;
const menuItemQuit = $.NSMenuItem.new;
const menuItemPause = $.NSMenuItem.new;
const statusBar = $.NSStatusBar.systemStatusBar;
const statusItem = statusBar.statusItemWithLength($.NSVariableStatusItemLength);
menuItemPause.title = '';
menuItemPause.target = menuActionPause;
menuItemPause.action = 'pause';
menu.addItem(menuItemPause);
menuItemQuit.title = 'Quit';
menuItemQuit.target = menuActionQuit;
menuItemQuit.action = 'quit';
menu.addItem(menuItemQuit);
statusItem.title = menuLabel;
statusItem.menu = menu;

const menuItemPauseLabel = () => appPause ? 'Resume' : 'Pause';

const refreshMenuItemPauseLabel = () =>
  menuItemPause.title = menuItemPauseLabel();

const togglePauseAndResume = () => {
  appPause = !appPause;
  refreshMenuItemPauseLabel();
}

refreshMenuItemPauseLabel();
