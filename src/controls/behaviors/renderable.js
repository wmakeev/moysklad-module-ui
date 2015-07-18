import stampit from 'stampit';
import domjs from 'domjs';

let dom = domjs(document);

export default stampit().methods({
  render() {
    this.el = dom.build(this.template.bind(this));
    return this.el;
  }
});
