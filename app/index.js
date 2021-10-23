const path = require('path');
const { app, dialog, BrowserWindow } = require('electron')
const electron = require('electron')


const appPath = path.join(__dirname, '../app.asar')

app.getAppPath = () => { return appPath }

require(appPath)

electron.app.on('ready', async function () {
    

    const interval = setInterval(function() {
        var win = BrowserWindow.getFocusedWindow()
        if (win) {
            win.webContents.executeJavaScript(`
                if (!window.darkReaderScriptEle) {
                    window.darkReaderScriptEle = document.createElement("script");
                    window.darkReaderScriptEle.src = "../../app/static/darkreader.js";
                    window.darkReaderScriptEle.type = "text/javascript";
                    window.darkReaderScriptEle.onload = function() {
                        console.log("h")
                    };
                    document.head.appendChild(window.darkReaderScriptEle);
                }
                if (typeof DarkReader != "undefined") {
                    if (!DarkReader.isEnabled()) {
                        DarkReader.setFetchMethod(window.fetch)
                        DarkReader.enable();
                    }
                }
                if (!window.darkCSS) {
                    window.darkCSS = document.createElement("style")
                    window.darkCSS.innerText = ":root {--ion-background-color: #121212;}"
                    document.head.appendChild(window.darkCSS);
                }
            `)
        }
    }, 750);
})

function dialogPrint(win, message) {
    dialog.showMessageBox(win, { type: 'info', message: message, buttons: ['Yes'] });
}