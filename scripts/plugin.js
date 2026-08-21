import { PluginStorage } from './scroll-core/m_storage.js';
import { EditorController } from './scroll-core/m_editor.js';

const plugStore = new PluginStorage(window);
const editorCtrl = new EditorController(window);

function tryRestoreScroll() {
    // if (isRestored) return;

    if (plugStore.getMoveByOpenFlag() && !plugStore.isFirstOpen()) {
        const savedY = plugStore.getScroll();
        if (savedY !== null) {
            console.log("📍 [Backend] Восстанавливаем позицию Y:", savedY);
            editorCtrl.moveScroll(savedY);
            // isRestored = true;
        }
    }
}

window.Asc.plugin.init = function () {
    console.log("🔄 [Backend] Init вызвался");
    console.log("🔄 [Backend] plugStore.getMoveByOpenFlag():", plugStore.getMoveByOpenFlag());
    console.log("🔄 [Backend] plugStore.getScroll():", plugStore.getScroll());

    // Пытаемся запросить параметры файла. 
    // В коллбэке мы Твёpдо знаем, что документ загружен и готов!
    this.executeMethod("GetFileParams", [], function (params) {
        console.log("✅ [Backend] Документ точно готов!", params);
        // tryRestoreScroll();
    });
};

// 2. Прямой перехват события SDK ONLYOFFICE (без attachEditorEvent)
window.Asc.plugin.event_onDocumentContentReady = function () {
    console.log("📄 [Backend] Event onDocumentContentReady сработал");
    tryRestoreScroll();
};

// 3. Сохранение при закрытии редактора/вкладки
window.addEventListener("beforeunload", () => {
    if (plugStore.getSaveByCloseFlag()) {
        const curScrollY = editorCtrl.getScrollY();
        if (curScrollY !== null) {
            console.log("🔒 [Backend] Сохраняем позицию Y:", curScrollY);
            plugStore.saveScroll(curScrollY);
        }
    }
});