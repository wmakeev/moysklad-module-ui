import _ from 'lodash';

export default function bufferedMenubarItemsModificationsEmiter (itemsModificationaStream) {
    var buffer = {};
    // Буфферизируем добавленные элементы меню
    itemsModificationaStream.onValue(function (itemModification) {
        var appContext = itemModification.options.appContext;
        if (typeof appContext === 'string') appContext = [appContext];
        appContext.forEach(function (context) {
            var menuName = itemModification.options.menu;
            var contextBuffers = buffer[context] = buffer[context] || {};
            contextBuffers[menuName]
                ? contextBuffers[menuName].push(itemModification)
                : contextBuffers[menuName] = [itemModification];
        });
    });

    return function (emitter, event) {
        var menubarInfo = event.value;
        var modifications = _.propertyOf(buffer)([menubarInfo.context, menubarInfo.name]);
        if (modifications && modifications.length) {
            // Flush buffer
            buffer[menubarInfo.context][menubarInfo.name] = [];
            // Отправляем накопленные элементы в поток
            emitter.emit({
                menubar: menubarInfo,
                modifications: modifications
            });
        }
    }
};
