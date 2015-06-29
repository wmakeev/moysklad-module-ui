import _                from 'lodash';
import $                from 'jquery';
import FRP              from 'kefir';
import MoyskladRouter   from 'moysklad-router';
import MutationSummary  from 'mutation-summary';
import Simulate         from 'simulate';
import queries          from './queries';
import * as utils       from './utils';
import timeout          from './utils';
import bufferedMenubarItemsModificationsEmiter from './buffered-menubaritems-modifications-emiter';

export default function(sb) {
    let uiItemsModificationsStream;
    let mutationsStream;
    let addedDomElementsStream;
    let addedMenubarsStream;
    let mouseDownStream;
    let mouseClickStream;
    let pushDownButtonsStream;
    // let clickedButtonsStream;
    let clickedMenuItemsStream;
    let poppedUpMenubarsStream;
    let routesStream;
    let appContextProperty;
    let poppedUpMenubarInfosStream;
    let menuItemsModificationsStream;
    let poppedUpMenubarModificationsStream;
    let $glassPanel;

    let router = new MoyskladRouter();
    let { on, off, once, emit, UI } = sb;

    return {

      init({ appName }) {
        let dataAppId                 = `data-${appName}-id`;
        let menuItemBlockClassName    = `${appName}-menuitem-block`;
        // let appUidPrefix              = `${appName}-uid-`;
        // let appMenuItemClassName      = `${appName}-MenuItem`;

        router.start();
        uiItemsModificationsStream = FRP.pool();

        on('add', (ch, data) => {
          // TODO Интерфейс продумать
          if (data instanceof Array) {
            data.forEach(({ item, options }) => {
                uiItemsModificationsStream.plug(FRP.constant({
                    type: 'add', item, options
                }));
            });
          } else {
            throw new Error('add event argument must be an array');
          }
        });

        // TODO Синхронно?
        // TODO Интерфейс продумать
        // TODO Как передать аргументы в template()
        $glassPanel = $(UI.add({ type: 'GlassPanel' }))
          .hide()
          .appendTo(document.body);
        on('fadeIn', () => $glassPanel.show());
        on('fadeOut', () => $glassPanel.hide());

        // Все заданные измемения на странице
        mutationsStream = FRP.stream(async function foo(emitter) {
          let observer = new MutationSummary({
            callback: summaries =>
                summaries.forEach(summary => emitter.emit(summary)),
            queries,
          });
          await once('destroy');
          emitter.end();
          observer.disconnect();
        });

        routesStream = FRP.fromEvents(router, 'route');

        // Дбавленные в DOM элементы
        addedDomElementsStream = mutationsStream
          .map(_.property('added'))
          .flatten();

        addedMenubarsStream = addedDomElementsStream
          .filter(utils.isRole('menubar'));

        mouseDownStream = FRP.fromEvents(document.body, 'mousedown');

        mouseClickStream = FRP.fromEvents(document.body, 'click');

        pushDownButtonsStream = mouseDownStream
          .map(utils.mouseEventToRoleElementMapper('button'))
          .filter(_.negate(_.isNull));

        // clickedButtonsStream = mouseClickStream
        //   .map(utils.mouseEventToRoleElementMapper('button'))
        //   .filter(_.negate(_.isNull));

        clickedMenuItemsStream = mouseClickStream
          .map(utils.mouseEventToRoleElementMapper('menuitem'))
          .filter(_.negate(_.isNull));

        poppedUpMenubarsStream = pushDownButtonsStream
          .sampledBy(addedMenubarsStream)
          .map(utils.getButtonName)
          .zip(addedMenubarsStream)
          .map(val => ({ name: val[0], el: val[1] }));

        appContextProperty = routesStream
          .map((state) => state.section + (state.action ? `/${state.action}` : ''))
          .toProperty(() => router.getHashPath());

        poppedUpMenubarInfosStream = appContextProperty
          .sampledBy(addedMenubarsStream)
          .zip(poppedUpMenubarsStream)
          .map(val => {
              let [appContext, popedUpMenubarInfo] = val;
              // { name, el, context }
              return _.extend({}, popedUpMenubarInfo, {
                  context: appContext
              });
          });

        menuItemsModificationsStream = uiItemsModificationsStream
          .filter(value => [
              'MenuItem',
              'MenuBarSeparator'
          ].indexOf(value.item.type) !== -1);

        // { menubar: { name, el, context }, modifications: [{ type, item, options }] }
        poppedUpMenubarModificationsStream = poppedUpMenubarInfosStream
          .withHandler(
            bufferedMenubarItemsModificationsEmiter(
              menuItemsModificationsStream));

        // Отслеживаем и добавляем новые элементы в меню
        poppedUpMenubarModificationsStream
          .onValue(value => {
            let menuEl = value.menubar.el;
            let modifications = value.modifications;
            let menuItems = _(modifications)
              .filter({
                type: 'add'
              })
              .map(mod => mod.item.render())
              .value();

            utils.appendMenuBarItems(menuItemBlockClassName, menuEl, menuItems);
          });

          // Обработка нажатий на элементы меню
          // { type, item, options }
          menuItemsModificationsStream.onValue(({ type, item }) => {
            if (type === 'add') {
              clickedMenuItemsStream.onValue(async function (menuitemEl) {
                if (menuitemEl.getAttribute) {
                  let id = menuitemEl.getAttribute(dataAppId);
                  if (id === item.id) {
                    Simulate.mousedown(document.getElementById('site'));
                    // console.log(`Нажато меню: ${item.name}`);
                    let action = item.action;
                    if (action) {
                      await timeout(100);
                      UI.fadeIn();
                      await timeout(100);
                      let result;
                      try {
                        result = await action(item);
                      } catch (err) {
                        // TODO alert;
                        alert('Ошибка: ' + err.message);
                        emit('error', err);
                        console.error(err);
                      }
                      if (result) { console.log(result); }
                      UI.fadeOut(); // $glassPanel.hide();
                    }
                  }
                }
              });
            }
          });

      },

      destroy() {
        router.stop();
        $glassPanel.detach();
        off('add');
        emit('destroy');
      },

    };

}
