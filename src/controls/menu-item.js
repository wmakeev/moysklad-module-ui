import stampit      from 'stampit';
import renderable   from './behaviors/renderable';
import uniqId       from './behaviors/uniq-id';
import * as uiConst from '../app-ui-const';


export default function menuItemStamp({ appName }) {
  let menuItemBlockClass  = uiConst.getMenuItemBlock(appName);
  let menuItemClass       = uiConst.getControlItemClass(appName, 'MenuItem');
  return stampit()
    .state({
      type: 'MenuItem',
      template() {
        /*global tr, td*/
        let tdOptions = {
          'class': ['gwt-MenuItem', menuItemClass].join(' '),
          'role': 'menuitem',
          'colspan': 2
        };
        tdOptions[`data-${appName}-id`] = this.id;
        return tr(
          {'class': [menuItemBlockClass, this.id].join(' ')},
          td(tdOptions, this.name)
        );
      }
    })
    .compose(renderable, uniqId(appName));
}