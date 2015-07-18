import stampit  from 'stampit';
import _        from 'lodash';

export default function(appName) {
    return stampit().enclose(function () {
        this.id = _.uniqueId(appName + '-id-');
    });
}
