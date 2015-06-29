(function () {
    var FRP = Kefir;
    // var appName = 'master',
    //     dataAppId = 'data-' + appName + '-id',
    //     appUidPrefix = appName + '-uid-',
    //     appMenuItemClassName = appName + '-MenuItem',
    //     appMenuItemBlockClassName = appName + '-menuitem-block',
    //     glassPanelId = appName + '-glass-panel';

    //TODO require isPromise;

    // UI
    //

    $(dom.build(function () {
        // div({ id: glassPanelId, 'class': 'b-lognex-glass-panel', 'style': 'z-index: 5; display: none;' });
    })).appendTo(document.body);

    var $glassPanel = $('#' + glassPanelId);

    var UI = {};

    //var renderable = stampit().methods({
    //    render: function () {
    //        return dom.build(this.template.bind(this));
    //    }
    //});

    //var uniqId = stampit().enclose(function () {
    //    this.id = _.uniqueId(appUidPrefix);
    //});

    //UI.MenuItem = stampit()
    //    .state({
    //        type: 'MenuItem',
    //        template: function () {
    //            var td_options = {
    //                'class': ['gwt-MenuItem', appMenuItemClassName].join(' '),
    //                'role': 'menuitem',
    //                'colspan': 2
    //            };
    //            td_options[dataAppId] = this.id;
    //            return tr(
    //                {'class': [appMenuItemBlockClassName, this.id].join(' ')},
    //                td(td_options, this.name)
    //            );
    //        }
    //    })
    //    .compose(renderable, uniqId);

    //UI.MenuBarSeparator = stampit()
    //    .state({
    //        type: 'MenuBarSeparator',
    //        template: function () {
    //            tr(
    //                { 'class': [appMenuItemBlockClassName, this.id].join(' ') },
    //                td(
    //                    {
    //                        'class': ['gwt-MenuItemSeparator', appMenuItemClassName].join(' '),
    //                        'colspan': 2
    //                    },
    //                    div({ 'class': 'menuSeparatorInner' })
    //                )
    //            );
    //        }
    //    })
    //    .compose(renderable, uniqId);

    //TODO Temp
    window.UI = UI;

    // MenuActions
    //

    //var uiItemsModificationsStream = FRP.pool();

    UI.add = function (uiItems, options) {
        // uiItems = uiItems instanceof Array ? uiItems : [uiItems];
        // uiItems.forEach(function (uiItem) {
        //     uiItemsModificationsStream.plug(FRP.constant({
        //         type: 'add',
        //         item: uiItem,
        //         options: options
        //     }));
        // });
    };

    // Tools
    //

    //var getButtonName = function (buttonEl) {
    //    return $('span.text', buttonEl).text();
    //};
    //
    //var isRole = _.curry(function (role, el) {
    //    return el.getAttribute && el.getAttribute('role') === role
    //});

    // var mouseEventsToElementsMapper = _.curry(function (predicate, mouseEvent) {
    //     for (var i = mouseEvent.path.length - 1; i >= 0; i--) {
    //         var el = mouseEvent.path[i];
    //         if (predicate(el)) return el
    //     }
    //     return null;
    // });

    //var appendMenuBarItems = function (menubar, items) {
    //    var $lastMenuItem = $('.' + appMenuItemBlockClassName + ':last', menubar);
    //    if ($lastMenuItem.length) {
    //        $lastMenuItem.after(items);
    //    } else {
    //        $('tbody', menubar).append(items);
    //    }
    //};

    // Streams
    //

    //var mutationsStream = FRP.stream(function (emitter) {
    //    var observer = new MutationSummary({
    //        callback: function (summaries) {
    //            summaries.forEach(function (summary) {
    //                emitter.emit(summary);
    //            })
    //        },
    //        queries: [
    //            //{ element: 'div.popup-button-popup-menu' },
    //            {element: 'div[role=button]'},
    //            {element: 'div[role=menubar]'},
    //            {element: '.gwt-DialogBox.info-window.info-window-ok'}
    //        ]
    //    });
    //});

    //var addedElementsStream = mutationsStream.map(function (summary) {
    //    return summary.added;
    //}).flatten();

    // var addedMenubarsStream = addedElementsStream.filter(isRole('menubar'));

    // // Mouse clicks stream
    // var mouseDownStream = FRP.fromEvents(document.body, 'mousedown');
    // var mouseClickStream = FRP.fromEvents(document.body, 'click');


    // var pushDownButtonsStream = mouseDownStream
    //     .map(mouseEventsToElementsMapper(isRole('button')))
    //     .filter(_.negate(_.isNull));

    // var clickedButtonsStream = mouseClickStream
    //     .map(mouseEventsToElementsMapper(isRole('button')))
    //     .filter(_.negate(_.isNull));

    // var clickedMenuItemsStream = mouseClickStream
    //     .map(mouseEventsToElementsMapper(isRole('menuitem')))
    //     .filter(_.negate(_.isNull));

    // var poppedUpMenubarsStream = pushDownButtonsStream
    //     .sampledBy(addedMenubarsStream).map(getButtonName).zip(addedMenubarsStream)
    //     .map(function (val) {
    //         return {
    //             name: val[0],
    //             el: val[1]
    //         }
    //     });

    // var routesStream = FRP.fromEvents(router, 'route');

    // var appContextProperty = routesStream
    //     .map(function (state) {
    //         return state.section + (state.action ? '/' + state.action : '')
    //     })
    //     .toProperty(function () { return router.getHashPath() });

    // Полная сборная информация об октытых Menubar'ах
    // TODO sampledBy.zip?
    // var poppedUpMenubarInfosStream = appContextProperty
    //     .sampledBy(addedMenubarsStream).zip(poppedUpMenubarsStream)
    //     .map(function (val) {
    //         var appContext = val[0], popedUpMenubarInfo = val[1];
    //         // { name, el, context }
    //         return _.extend({}, popedUpMenubarInfo, { context: appContext });
    //     });

    // var menubarItemsModificationsBufferEmiter = function (itemsModificationaStream) {
    //     var buffer = {};
    //     // Буфферизируем добавленные элементы меню
    //     itemsModificationaStream.onValue(function (itemModification) {
    //         var appContext = itemModification.options.appContext;
    //         if (typeof appContext === 'string') appContext = [appContext];
    //         appContext.forEach(function (context) {
    //             var menuName = itemModification.options.menu;
    //             var contextBuffers = buffer[context] = buffer[context] || {};
    //             contextBuffers[menuName]
    //                 ? contextBuffers[menuName].push(itemModification)
    //                 : contextBuffers[menuName] = [itemModification];
    //         })
    //     });
    //
    //     return function (emitter, event) {
    //         var menubarInfo = event.value;
    //         var modifications = _.propertyOf(buffer)([menubarInfo.context, menubarInfo.name]);
    //         if (modifications && modifications.length) {
    //             // Flush buffer
    //             buffer[menubarInfo.context][menubarInfo.name] = [];
    //             // Отправляем накопленные элементы в поток
    //             emitter.emit({
    //                 menubar: menubarInfo,
    //                 modifications: modifications
    //             });
    //         }
    //     }
    // };

    // var menuItemsModificationsStream = uiItemsModificationsStream.filter(function (value) {
    //     return ['MenuItem', 'MenuBarSeparator'].indexOf(value.item.type) !== -1;
    // });

    // // { menubar: { name, el, context }, modifications: [{ type, item, options }] }
    // var poppedUpMenubarModificationsStream = poppedUpMenubarInfosStream.withHandler(
    //     menubarItemsModificationsBufferEmiter(menuItemsModificationsStream));

    // // Отслеживаем и добавляем новые элементы в меню
    // poppedUpMenubarModificationsStream.onValue(function (value) {
    //     var menu_el = value.menubar.el,
    //         modifications = value.modifications;
    //
    //     var menuItems = _(modifications)
    //         .filter({type: 'add'})
    //         .map(function (mod) {
    //             return mod.item.render();
    //         }).value();
    //
    //     appendMenuBarItems(menu_el, menuItems);
    // });

    // // Обработка нажатий на элементы меню
    // // { type, item, options }
    // menuItemsModificationsStream.onValue(function (mod) {
    //     if (mod.type === 'add') {
    //         clickedMenuItemsStream.onValue(function (menuitemEl) {
    //             if (menuitemEl.getAttribute) {
    //                 var id = menuitemEl.getAttribute(dataAppId);
    //                 if (id && id === mod.item.id) {
    //                     Simulate.mousedown(document.getElementById('site'));
    //                     console.log('Нажато меню: ' + mod.item.name);
    //                     var action = mod.item.action;
    //                     if (action) {
    //                         setTimeout(function () {
    //                             $glassPanel.show();
    //                             setTimeout(function () {
    //                                 (new Promise(function (resolve, reject) {
    //                                     var result = action(mod.item);
    //                                     if (isPromise(result)) {
    //                                         result.then(resolve).catch(reject);
    //                                     } else {
    //                                         resolve(result);
    //                                     }
    //                                 }))
    //                                     .catch(function (err) {
    //                                         //debugger;
    //                                         console.error(err.stack || err);
    //                                         alert('Ошибка: ' + err.message);
    //                                     })
    //                                     .then(function (result) {
    //                                         if (result) console.log(result);
    //                                         $glassPanel.hide();
    //                                     });
    //                             }, 100);
    //                         }, 100);
    //                     }
    //                 }
    //             }
    //         })
    //     }
    // });


    // Logs
    //

    //menubarItemsModificationsStream.log();
    //poppedUpMenubarInfosStream.log();
    //poppedUpMenubarModificationsStream.log();
    //clickedButtonsStream.log();

})();

var menuItem1 = UI.MenuItem({
    name: 'Test menu (currency)',
    action: function (item) {
        alert('I am ' + item.name);
        return 'Завершено!'
    }
});
var menuBarSeparator1 = UI.MenuBarSeparator();
UI.add([menuBarSeparator1, menuItem1], {
    menu: 'Обмен данными',
    appContext: 'currency'
});

var menuItem2 = UI.MenuItem({
    name: 'Test menu (customerorder)',
    action: function (item) {
        alert('I am ' + item.name);
        return 'Завершено!'
    }
});
var menuBarSeparator2 = UI.MenuBarSeparator();
UI.add([menuBarSeparator2, menuItem2], {
    menu: 'Изменить',
    appContext: 'customerorder'
});
