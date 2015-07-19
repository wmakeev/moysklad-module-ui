import stampit from 'stampit';


export default stampit().methods({
  hide() {
    this.$el.hide();
    return this;
  },
  show() {
    this.$el.show();
    return this;
  }
});
