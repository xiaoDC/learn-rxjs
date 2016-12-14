var button = document.querySelector('button');

Rx.Observable.fromEvent(button, 'click').subscribe(function() {
  console.log('Clicked');
});
