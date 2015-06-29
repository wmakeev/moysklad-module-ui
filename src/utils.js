/**
 * index
 * Date: 11.06.15
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

import $ from 'jquery';
import _ from 'lodash';

export function getButtonName (buttonEl) {
    return $('span.text', buttonEl).text();
}

export const isRole = _.curry(function (role, el) {
    return el.getAttribute && el.getAttribute('role') === role;
});

export const appendMenuBarItems = _.curry(function (menuItemBlockClass, menubar, items) {
    let $lastMenuItem = $(`.${menuItemBlockClass}:last`, menubar);
    if ($lastMenuItem.length) {
        $lastMenuItem.after(items);
    } else {
        $('tbody', menubar).append(items);
    }
});

export const mouseEventToElementMapper =
  _.curry(function (predicate, mouseEvent) {
    for (let i = mouseEvent.path.length - 1; i >= 0; i -= 1) {
        let el = mouseEvent.path[i];
        if (predicate(el)) { return el; }
    }
    return null;
});

export const mouseEventToRoleElementMapper =
  _.compose(isRole, mouseEventToElementMapper);

export const timeout = (ms) => new Promise((resolve) =>
  setTimeout(() => resolve(), ms));
