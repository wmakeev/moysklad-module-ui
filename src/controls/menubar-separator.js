import stampit      from 'stampit';
import renderable   from './behaviors/renderable';
import uniqId       from './behaviors/uniq-id';


export default function ({ appName, menuItemClass, menuItemBlockClass}) {
  return stampit()
    .state({
      type: 'MenuBarSeparator',
      template() {
        tr(
          {'class': [menuItemBlockClass, this.id].join(' ')},
          td(
            {
              'class': ['gwt-MenuItemSeparator', menuItemClass].join(' '),
              'colspan': 2
            },
            div({'class': 'menuSeparatorInner'})
          )
        );
      }
    })
    .compose(renderable, uniqId(appName))
};
