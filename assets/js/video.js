
$(function(){
    var videoBox = $('.videoBox');
    var videoCtr = $('.videoCtr');
    var counter = 0;
    var modalFlag = false;

    $(window).on('load resize', function() {
        var videoBoxChild      = $(".videoBox__child");
        var videoBoxChildNum   = videoBoxChild.length;
        var videoBoxChildImage = videoBoxChild.find("img");
        var videoBoxChildText  = videoBoxChild.find(".videoBox__child__textBox");
        var width              = videoBoxChildImage.width();
        var height1            = videoBoxChildImage.height();
        var height2            = videoBoxChildText.innerHeight();

        //高さ設定
        videoBox.css({'height':height1 + height2,'width':width});
        videoBoxChild.css({'height':height1 + height2,'width':width});
        // 横並び
        videoBoxChild.each(function(i){
            $(this).css('left', $(this).width() * i);
        });
        // コントローラ色
        videoCtr.find('.videoCtr__numList ul li span').eq(counter).css('background-color','white');
        //ボタンアクション
        var leftBtn  = $(".videoCtr__button.l-left");
        var rightBtn = $(".videoCtr__button.l-right");
        leftBtn.on('click', function(){
            counter--;
            videoCtr.find('.videoCtr__numList ul li span').css('background-color','#0a2d3e').eq(counter%5).css('background-color','white');
            videoBoxChild.each(function(i){
                $(this).stop().animate({'left': $(this).width() * (i-counter%5)});
            });
        });
        rightBtn.on('click', function(){
            counter++;
            videoCtr.find('.videoCtr__numList ul li span').css('background-color','#0a2d3e').eq(counter%5).css('background-color','white');
            videoBoxChild.each(function(i){
                $(this).stop().animate({'left': $(this).width() * (i-counter%5)});
            });
        });

        // メディアクエリー的なやつ
        if ($('.sp_navi').css('display') === 'none') {
            //モーダル処理ON
            var videoLink = videoBoxChild.find('a');
            var modal = $('.videoModal');
            videoLink.on('click', function(e){
                modal.fadeIn();
                var youtubeLink = $(this).attr('data-movie');
                console.log(youtubeLink);
                modal.find('.videoModal__content').html('<iframe  src="'+ youtubeLink + '" frameborder="0" allowfullscreen></iframe>');
                e.preventDefault();
            });
            modal.find('.videoModal__bg').on('click', function(){
                modal.fadeOut();
            });
        } else {
            //モーダル処理OFF
        }
    });
});