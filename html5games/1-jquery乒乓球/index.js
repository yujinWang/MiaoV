// 存储按键相关的变量
var KEY = {
    UP: 38,
    DOWN: 40,
    W: 87,
    S: 83
}
// 存储乒乓球相关的变量
var ballList = {
    speed: 2,
    x: 150,
    y: 100,
    directionX: 1,
    directionY: 1
}
$(function(){
    // console.log(123)
    // $('#paddleB').css('top','20px')
    // $('#paddleA').css('top','60px')

    function gameloop() {
        setInterval(function(){
            moveBall()
        },13.33333333)
    }
    gameloop()

    // 存储乒乓球相关的变量-无法在moveBall中被访问到-需定义在全局
    // directionX 向右为正 向左为负
    // directionY 向下为正 向上为负
    // var ballList = {
    //     speed: 5,
    //     x: 150,
    //     y: 100,
    //     directionX: 1,
    //     directionY: 1
    // }
    // 定义乒乓球运动的函数
    function moveBall() {
        // console.log(123)
        // console.log(ballList)
        var playgroundWidth = parseInt($('#playground').width())
        var playgroundHeight = parseInt($('#playground').height())
        // 检测底边
        if(ballList.y+ballList.speed*ballList.directionY+parseInt($('#ball').height()) > playgroundHeight) {
            ballList.directionY = -1
        }
        // 检测顶边
        if(ballList.y+ballList.speed*ballList.directionY < 0) {
            ballList.directionY = 1
        }
        // 检测右边
        if(ballList.x+ballList.speed*ballList.directionX+parseInt($('#ball').width()) > playgroundWidth) {
            ballList.directionX = -1
        }
        // 检测左边
        if(ballList.x+ballList.speed*ballList.directionX < 0) {
            ballList.directionX = 1
        }
        // 球所处的位置
        ballList.x += ballList.speed * ballList.directionX
        ballList.y += ballList.speed * ballList.directionY
        // 处理球拍和球的位置关系，球拍和球的碰撞和画面边缘和球的碰撞是相互独立的，在各自的条件中判断即可
        // 球拍A为左边的球拍，球拍B为右边的球拍
        var paddleAX = parseInt($('#paddleA').css('left')) + parseInt($('#paddleA').css('width')) // 球拍A右边缘位置
        var paddleABottom = parseInt($('#paddleA').css('top')) + parseInt($('#paddleA').css('height')) // 球拍A下边缘位置
        var paddleATop = parseInt($('#paddleA').css('top')) // 球拍A上边缘位置
        // 只添加此条件的话球碰到球拍上下方的空白区域也会反弹，还需添加球拍上下边缘碰撞的检测条件-if中嵌套的if条件
        if(ballList.x+ballList.speed*ballList.directionX < paddleAX) {
            if(ballList.y+ballList.speed*ballList.directionY <= paddleABottom && ballList.y+ballList.speed*ballList.directionY >= paddleATop) {
                ballList.directionX = 1
            }
        }
        // 球拍B的边界判断
        var paddleBX = parseInt($('#paddleB').css('left')) // 球拍B左边缘位置
        var paddleBBottom = parseInt($('#paddleB').css('top')) + parseInt($('#paddleB').css('height')) // 球拍B下边缘位置
        var paddleBTop = parseInt($('#paddleB').css('top')) // 球拍B上边缘位置
        if(ballList.x+ballList.speed*ballList.directionX >= paddleBX) {
            if(ballList.y+ballList.speed*ballList.directionY <= paddleBBottom && ballList.y+ballList.speed*ballList.directionY >= paddleBTop) {
                ballList.directionX = -1
            }
        }
        // 移动乒乓球
        $('#ball').css({
            'left': ballList.x,
            'top': ballList.y
        })
    }
    // 监控键盘事件
    $(document).keydown(function(e) {
        switch (e.which) {
            case KEY.UP: 
                var top = parseInt($('#paddleB').css('top'))
                $('#paddleB').css('top',top-5) // 向上移动5个单位
                break;
            case KEY.DOWN:
                var top = parseInt($('#paddleB').css('top'))
                $('#paddleB').css('top',top+5) // 向下移动5个单位
                break;
            case KEY.W:
                var top = parseInt($('#paddleA').css('top'))
                $('#paddleA').css('top',top+5)
                break;
            case KEY.S:
                var top = parseInt($('#paddleA').css('top'))
                $('#paddleA').css('top',top-5)
                break;
        }
    })
})