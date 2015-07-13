import stampit      from 'stampit';
import renderable   from './behaviors/renderable';
import hideable     from './behaviors/hideable';
import uniqId       from './behaviors/uniq-id';


export default function({ appName }) {
    return stampit()
        .state({
            type: 'GlassPanel',
            template() {
                /*global div*/
                return div({
                  'class': 'b-lognex-glass-panel',
                  'style': 'z-index: 5;'
                });
            }
        })
        .compose(renderable, hideable, uniqId(appName));
}
