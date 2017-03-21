;(function(factory){
if(typeof define == 'function' && define.amd){
    //seajs or requirejs environment
    define(['jquery', 'class'], factory);
}else if(typeof module === 'object' && typeof module.exports == 'object'){
    module.exports = factory(
        require('jquery'),
        require('class')
    );
}else{
    factory(window.jQuery, window.jQuery.klass);
}
})(function($, Class){

return Class.$factory('pager', {
    initialize: function(opt){
        this.options = $.extend({
            dom: null,
            total: 0,    //整页数
            visibleCount: 10,    //显示几页
            url: '',        //url不为空，可直接跳转，而非调用callback
            showFirstBtn: true,    //显示首页
            showLastBtn: true,        //显示最后一页
            current: 1,    //当前页码
            currentClassName: '',    //当前页class
            className: '',
            showShortCut: true
        }, opt || {});

        this.init();
    },

    init: function(){
        var self = this, opt = self.options;

        if(opt.total == 0) return; 
        
        self.container = $('<ul class="ui3-pager">').addClass(opt.className);
        self.dom = $(opt.dom).append(self.container);
        self.index = parseInt(opt.current);
        self.createPager();
        self.initEvent();
    },

    initEvent: function(){
        var self = this;

        self.container.delegate('.ui3-pager-enable', 'click', function(){
            self.to($('a', this).attr('data-page'));
        });

        self.container.delegate('.ui3-pager-shortcut-confirm', 'click', function(){
            var index = $.trim(self.container.find('.ui3-pager-shortcut input').val());
            /^\d+$/.test(index) && self.to(index);
        }); 
    },

    to: function(i){
        var self = this, opt = self.options;

        self.index = i ? parseInt(i < 1 ? 1 : i > opt.total ? opt.total : i ) : self.index;

        if(opt.url){
            location.href = opt.url + (opt.url.indexOf('?') > -1 ? '&' : '?') + 'page=' + i;
            return;
        }

        self.createPager();
        self.trigger('switch', self.index);
        self.trigger('to', self.index);
    },

    createPager: function(){
        var self = this, res = self.getPagerResult(), opt = self.options;

        self.container.empty();

        $.each(res, function(key, value){
            var _0 = value[0], _1 = value[1], $item;

            if(!_1){
                $item = $('<li class="ui3-pager-point"><a href="javascript:">' + _0 + '</a></li>');
            }else if(_1 != self.index){
                $item = $('<li class="ui3-pager-enable"><a href="javascript:" data-page="' + _1 + '">' + _0 + '</a></li>').addClass(value[2]);
            }else{  
                $item = $('<li class="ui3-pager-current"><a href="javascript:">' + _1 + '</a></li>').addClass(opt.currentClassName);
            }

            _0 > 999 && $item.addClass('ui3-pager-item-large');
            self.container.append($item.addClass('ui3-pager-item'));
        });

        if(opt.showShortCut){
            var cut = '<li class="ui3-pager-shortcut">共' + opt.total + '页，到第 <input type="text" /> 页 <a href="javascript:" class="ui3-pager-shortcut-confirm">确定</a></li>';
            self.container.append(cut);
        }
    },

    getPagerResult: function(){
        var self = this, opt = self.options;
        var total = parseInt(opt.total), visible = opt.visibleCount, index = this.index, start = 0, end = 0, middle = Math.ceil(visible / 2), m = parseInt(visible / 2);

        if(total < visible){
            start = 1;
            end = total;
        }else{
            if(index <= middle){
                start = 1;
                end = visible;
            }else if(index > middle){
                if(index + middle <= total){
                    start = index - middle + 1;
                    end = index + m;
                }else{
                    start = total - visible + 1;
                    end = total;
                }
            }
        }

        var arr = [];

        if(index > 1){
            arr.push([opt.previous || '上一页', index - 1, 'ui3-pager-previous ui3-pager-disable']);
        }

        if(opt.showFirstBtn){
            if(start > 2){
                arr.push(['1', 1]);
                arr.push(['&middot;&middot;&middot;']);
            }else if(start == 2){
                arr.push(['1', 1]);
            }
        }
        
        var i = start;

        while(i <= end) arr.push([i, i++]);

        if(opt.showLastBtn){
            if(end < total - 1){
                arr.push(['&middot;&middot;&middot;']);
                arr.push([total, total]);
            }else if(end == total - 1){
                arr.push([total, total]);
            }
        }

        if(index < total){
            arr.push([opt.next || '下一页', index + 1, 'ui3-pager-next']);
        }

        return arr;
    },

    destroy: function(){
        this.container.remove();
        this.container = null;
        this.dom = null;
    }
});

});