import stampit from 'stampit';
import domjs from 'domjs';

let dom = domjs(document);

export default stampit().methods({
  render() {
    let fragment = dom.build(this.template.bind(this));
    this.el = document.appendChild(fragment);
    return this.el;
  }
});
