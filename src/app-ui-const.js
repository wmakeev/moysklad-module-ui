import _ from 'lodash';

export function getDataAppId(appName) {
  return `data-${appName}-id`;
}

export function getMenuItemBlock(appName) {
  return `${appName}-menuitem-block`;
}

export const getControlItemClass = _.curry((appName, controlType) => {
  return `${appName}-${controlType}`;
});
