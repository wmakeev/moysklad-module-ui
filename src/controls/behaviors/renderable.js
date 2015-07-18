import stampit from 'stampit';
import { build } from 'domjs';


export default stampit().methods({
  render() {
    this.el = build(this.template.bind(this));
    return this.el;
  }
});
