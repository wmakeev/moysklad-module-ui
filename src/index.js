import _                 from 'lodash';
import $                 from 'jquery';
import FRP               from 'kefir';
import moyskladRouter    from 'moysklad-router';
import MutationSummary   from 'mutation-summary';
import Simulate          from 'simulate';
import queries           from './queries';
import * as utils        from './utils';
import timeout           from './utils';
import * as controlsSet from './controls/index';
import * as uiConst      from './app-ui-const';
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

  let { log, error, on, off, once, emit, add, fadeIn, fadeOut } = sb;

  return {

    init({ appName }) {
      if (!appName) {
        throw new Error('appName should be provided in module options');
      }
      let dataAppId          = uiConst.getDataAppId(appName);
      let menuItemBlockClass = uiConst.getMenuItemBlock(appName);
      // let appUidPrefix              = `${appName}-uid-`;
      // let appMenuItemClassName      = `${appName}-MenuItem`;

      // Инициализация роутера
      let router = moyskladRouter().start();
      router.start();
      once('destroy').then(() => router.stop());

      uiItemsModificationsStream = FRP.pool();

      on('add', data => {
        let controls = [];
        (data instanceof Array ? data : [{ item: data }]).forEach(({ item, options }) => {
          let controlStamp = controlsSet[item.type]({ appName });
          if (controlStamp) {
            let control = controlStamp(_.omit(item, 'type'));
            uiItemsModificationsStream.plug(FRP.constant({
              type: 'add', item: control, options
            }));
            controls.push(control);
          } else {
            uiItemsModificationsStream.plug(
              FRP.constantError(
                new Error('Can\'t find control type [' + item.type + ']')));
            controls.push(null);
          }
        });
        return data instanceof Array ? controls : controls[0];
      });

      // TODO Интерфейс продумать
      // TODO Как передать аргументы в template()
      add({ type: 'GlassPanel' }).then((glassPanel) => {
        glassPanel.render().hide();
        on('fadeIn', () => glassPanel.show());
        on('fadeOut', () => glassPanel.hide());
        once('destroy').then(() => glassPanel.$el.detach());
      });

      // Все заданные измемения на странице
      mutationsStream = FRP.stream((emitter) => {
        let observer = new MutationSummary({
          callback: summaries =>
            summaries.forEach(summary => emitter.emit(summary)),
          queries,
        });
        once('destroy').then(() => {
          emitter.end();
          observer.disconnect();
        });
      }); // .log('mutationsStream');

      routesStream = FRP.fromEvents(router, 'route').log('routesStream');

      // Дбавленные в DOM элементы
      addedDomElementsStream = mutationsStream
        .map(_.property('added'))
        .flatten(); // .log('addedDomElementsStream');

      addedMenubarsStream = addedDomElementsStream
        .filter(utils.isRole('menubar')).log('addedMenubarsStream');

      mouseDownStream = FRP.fromEvents(document.body, 'mousedown');

      mouseClickStream = FRP.fromEvents(document.body, 'click');

      pushDownButtonsStream = mouseDownStream
        .map(utils.mouseEventToRoleElementMapper('button'))
        .filter(_.negate(_.isNull)).log('pushDownButtonsStream');

      // clickedButtonsStream = mouseClickStream
      //   .map(utils.mouseEventToRoleElementMapper('button'))
      //   .filter(_.negate(_.isNull));

      clickedMenuItemsStream = mouseClickStream
        .map(utils.mouseEventToRoleElementMapper('menuitem'))
        .filter(_.negate(_.isNull)).log('clickedMenuItemsStream');

      poppedUpMenubarsStream = pushDownButtonsStream
        .sampledBy(addedMenubarsStream)
        .map(utils.getButtonName)
        .zip(addedMenubarsStream)
        .map(val => ({ name: val[0], el: val[1] }));

      appContextProperty = routesStream
        .map(state => state.path)
        .toProperty(() => router.getPath()).log('appContextProperty');

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

          utils.appendMenuBarItems(menuItemBlockClass, menuEl, menuItems);
        });

        // Обработка нажатий на элементы меню
        // { type, item, options }
        menuItemsModificationsStream.onValue(({ type, item }) => {
          if (type === 'add') {
            clickedMenuItemsStream.onValue((menuitemEl) => {
              if (menuitemEl.getAttribute) {
                let id = menuitemEl.getAttribute(dataAppId);
                if (id === item.id) {
                  Simulate.mousedown(document.getElementById('site'));
                  log.debug(`Нажато меню: ${item.name}`);
                  let action = item.action;
                  if (action) {
                    timeout(100)
                      .then(() => fadeIn())
                      .then(() => timeout(100))
                      .then(() => action(item))
                      .then(result => log(result))
                      .catch((err) => {
                        alert('Ошибка: ' + err.message);
                        error(err);
                      })
                      .then(() => fadeOut());
                  }
                }
              }
            });
          }
        });

    },

    destroy() {
      off('add');
      emit('destroy');
    },

  };

}
