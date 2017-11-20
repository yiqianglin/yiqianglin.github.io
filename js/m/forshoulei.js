var activity = {
    init: function(){
        if (window.location.href.indexOf('?') != -1){
          var paramsString = window.location.search.replace('?', '');
          console.log(paramsString);
          var btnUrl = $('.get-btn').attr('href');
          if (btnUrl.indexOf('?') != -1){
            $('.get-btn').attr('href', btnUrl + paramsString);
            $('#xunleiyidaiLiLink').attr('href', btnUrl + paramsString);
          } else {
            $('.get-btn').attr('href', btnUrl + '?' + paramsString);
            $('#xunleiyidaiLiLink').attr('href', btnUrl + '?' + paramsString);
          }
        }
    }
}
activity.init();