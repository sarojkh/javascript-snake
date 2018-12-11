/**
 * 
 */

$(document).ready(function() {
    launchGame();
    $('#gameContainer').center();
});

$(document).keydown(function(e) {
    actionListener(e);
});

jQuery.fn.center = function() {
    this.css("position", "absolute");
    this.css("top", (($(window).height() - this.outerHeight()) / 2) + "px");
    this.css("left", (($(window).width() - this.outerWidth()) / 2) + "px");
    return this;
};


//extracted from http://stackoverflow.com/questions/1068834/object-comparison-in-javascript
Object.prototype.equals = function(x) {
    var p;
    for (p in this) {
  if (typeof (x[p]) == 'undefined') {
      return false;
  }
    }
    for (p in this) {
  if (this[p]) {
      switch (typeof (this[p])) {
      case 'object':
    if (!this[p].equals(x[p])) {
        return false;
    }
    break;
      case 'function':
    if (typeof (x[p]) == 'undefined'
        || (p != 'equals' && this[p].toString() != x[p]
      .toString()))
        return false;
    break;
      default:
    if (this[p] != x[p]) {
        return false;
    }
      }
  } else {
      if (x[p])
    return false;
  }
    }

    for (p in x) {
  if (typeof (this[p]) == 'undefined') {
      return false;
  }
    }

    return true;
}
