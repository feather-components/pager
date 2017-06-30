Pager分页组件
====================== 
 
### Options

* dom: 生成页码的容器
* total: 页总数
* visibleCount：显示可见的页码数量
* url：跳转的地址，组件会自动在该url后面追加&page=页码，默认为空，则需要绑定switch事件
* showFirstBtn：是否显示首页按钮，默认显示
* showLastBtn：是否显示尾页按钮，默认显示
* current：初始化时的页码
* currentClassName: 当前页码的类名
* className：组件对象的类名
* showShortCut：显示快捷方式

### Events:

* switch(event, pageIndex)：切换页码时触发

### Api:

* to(pageIndex)：跳转至第几页，该方法会触发switch事件
* destroy: 摧毁对象

### Example

* 无url参数
```js
$('#pager').pager({
    total: 100,
    current: 10,
    showFirstBtn: false
}).on('pager:switch', function(event, index){
    alert('选择跳转至第' + index + '页');
});
```
* 有url参数
```js
$('#pager').pager({
    url:'http://example.com/service?[otherparameter=123&]page=',
    total: 100,
    showLastBtn: false
});
```
