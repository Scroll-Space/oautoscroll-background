import { PluginStorage } from './scroll-core/m_storage.js';
import { EditorController } from './scroll-core/m_editor.js';

const plugStore = new PluginStorage(window);
const editorCtrl = new EditorController(window);

window.Asc.plugin.init = function () {
    tryRestoreScroll();
    startTempScrollSaver();
};

// Минималистичный таймер, который почти не тратит CPU
function startTempScrollSaver() {
    setInterval(() => {
        if (!plugStore.getSaveByCloseFlag()) return;

        const currentY = editorCtrl.getScrollY();

        if (currentY === null) return;

        let tempSavedY = plugStore.getTempScroll();

        if (tempSavedY === null || tempSavedY !== currentY) {
            plugStore.saveTempScroll(currentY);
        }
    }, 1000);
}

function tryRestoreScroll() {
    if (plugStore.getMoveByOpenFlag() && !plugStore.isFirstOpen()) {
        let savedY = plugStore.getScroll();
        let tempSavedY = plugStore.getTempScroll();

        // При загрузке плагина, если есть временный скролл, то он становится основным
        if (tempSavedY !== null && tempSavedY !== savedY && plugStore.getSaveByCloseFlag()) {            
            savedY = tempSavedY;
            plugStore.saveScroll(savedY);
        }
        editorCtrl.moveScroll(savedY);

    }
}