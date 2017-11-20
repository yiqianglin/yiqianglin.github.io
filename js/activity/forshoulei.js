var activity = {
    init: function(){
        //activity.showPop({area: ['480px','500px'], content: $('#pop-wrp')});
        activity.eventBind();
        if (window.location.href.indexOf('?') != -1){
          var paramsString = window.location.search.replace('?', '');
          console.log(paramsString);
          var btnUrl = $('.get-huiyuan').attr('href');
          if (btnUrl.indexOf('?') != -1){
            $('.get-huiyuan').attr('href', btnUrl + paramsString);
            $('#xunleiyidaiLiLink').attr('href', btnUrl + paramsString);
          } else {
            $('.get-huiyuan').attr('href', btnUrl + '?' + paramsString);
            $('#xunleiyidaiLiLink').attr('href', btnUrl + '?' + paramsString);
          }
        }
    },
    showPop: function(options, url){
        activity.createQRcode(url);
        layer.open({
            type: 1,
            closeBtn: 0,//取消关闭按钮
            shade: [0.8, '#000'], //背景颜色和透明度
            scrollbar: true, //禁止下拉框
            title: false, //不显示标题
            area: options.area,
            content: options.content
        });

        $('.layui-layer').css({'background-color':'transparent'});

        $('.close-btn').bind('click',function(e){
            layer.closeAll();
        });
        $('.layui-layer-shade').bind('click',function(e){
            layer.closeAll();
        });
    },
    createQRcode: function(url){
        $("#QRcode-canvas").empty();
        $("#QRcode-canvas").qrcode({ 
            render: checkIEVersonr(8) ? 'table' : 'canvas', // 渲染方式有table方式和canvas方式
            width: 198, //宽度 
            height: 198, //高度 
            text: url 
        }); 
    },
    eventBind: function(){
        $('.cooperator-li a').on('click', function(){
            console.log($(this).attr('data-mark'), $(this).attr('data-url'));
            var mark = $(this).attr('data-mark'),
                url = $(this).attr('data-url');
            if (mark == 'link') {
                window.location.href = url;
            } else {
                activity.showPop({area: ['480px','500px'], content: $('#pop-wrp')}, url);
            }
        });
    }
}
activity.init();
// 判断IE版本
function checkIEVersonr(version) {
  var ua = navigator.userAgent.toLowerCase();
  if (window.ActiveXObject) {
    var ie = ua.match(/msie ([\d.]+)/)[1];
    //获取版本
    var ie_version = 6;
    if (ie.indexOf('7') > -1) {
      ie_version = 7;
    }
    if (ie.indexOf('8') > -1) {
      ie_version = 8;
    }
    if (ie.indexOf('9') > -1) {
      ie_version = 9;
    }
    if (ie.indexOf('10') > -1) {
      ie_version = 10;
    }
    if (ie.indexOf('11') > -1) {
      ie_version = 11;
    }
    return ie_version <= version;
  }
  return false;
}