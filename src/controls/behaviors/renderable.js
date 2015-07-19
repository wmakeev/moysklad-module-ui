import stampit from 'stampit';
import domjs from 'domjs';
import $ from 'jquery';


let dom = domjs(document);

export default stampit().methods({
  render() {
    let fragment = dom.build(this.template.bind(this));
    this.el = fragment.children[0];
    this.$el = $(this.el);
    return this;
  }
});
