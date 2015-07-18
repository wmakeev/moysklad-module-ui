import stampit from 'stampit';
import dom from 'domjs';


export default stampit().methods({
  render() {
    this.el = dom.build(this.template.bind(this));
    return this.el;
  }
});
