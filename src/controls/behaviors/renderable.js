/**
 * renderable
 * Date: 10.06.15
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

import stampit from 'stampit';

export default stampit().methods({
    render: () => {
        return dom.build(this.template.bind(this));
    }
})