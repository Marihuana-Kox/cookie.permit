(function($){
  let defaults = {
    headText: "Подтвердите пожалуйста соглашение",
    paragraph: "Наш сайт использует технологию Cookie. Оставаясь на ресурсе Вы принимаете Соглашение об использовании файлов Cookie.",
    lifeTime: 30000,
    wrappClass: "wrap-permit",
    interClass: "inter-class",
    buttTextYes: "Принять",
    replaceText: "Cookie",
    url: "/",
  };

  function Permit(element, options){
    this.config = $.extend({}, defaults, options);
    this.element = element;
    let wrap = $("."+this.config.wrappClass+"");
    let text = this.config.paragraph
    let replacement = "<a href="+this.config.url+" target=\"_blank\" >"+this.config.replaceText+"</a>"
    this.config.paragraph = text.replace(/cookie/gi, replacement)

    let inforcooks = document.cookie.split('; ').find(row => row.startsWith('Saves the session'))
    let mls
    if(inforcooks){
      mls = inforcooks.split('=')[1];
    }

    let curms = new Date().getTime();

    if(mls && (curms - mls) < this.config.lifeTime) {
      wrap.hide();
    }

    this.element.on("click", "button", function(e){
      e.preventDefault();
      wrap.slideToggle(1000);
      document.cookie = "Saves the session="+ curms +";secure";
    });
    this.init();
  }

  Permit.prototype.init = function(replacement){

    let container = $('<div/>', {
      class: this.config.interClass,
    }).appendTo(this.element);

    let interiorLeft = $('<div/>', {
      class: "interClassLeft",
    }).appendTo(container);

    let interiorRight = $('<div/>', {
      class: "interClassRight",
    }).appendTo(container);

    $('<h1/>',{
      html: this.config.headText,
    }).appendTo(interiorLeft);

    $('<p/>',{
      html: this.config.paragraph,
    }).appendTo(interiorLeft);

    $('<button/>', {
      text: this.config.buttTextYes,
      autofocus: "autofocus",
      name: "addCookies",
      type: "submit",
    }).appendTo(interiorRight);

  }


  $.fn.permit = function(options){
    new Permit(this, options);
    return this;
  }

})(jQuery);
