import stampit from 'stampit';
import $ from 'jquery';


export default stampit().methods({
  hide() {
    $(this.el).hide();
  },
  show() {
    $(this.el).show();
  }
});
