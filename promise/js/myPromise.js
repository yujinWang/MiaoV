class myPromise {
	// 定义promise的三种状态，各种浏览器中可能实现名字有所不同，无需关注
	static PENDING = 'PENDING'
	static RESOLVE = 'RESOLVED'
	static REJECT = 'REJECT'

	constructor(handler) {
		// 实现当实例化myPromise时候未输入参数情况下抛出错误
		if (typeof handler != 'function') {
			// throw new Error('Promise resolver undefined is not a function')
			throw new TypeError('Promise resolver undefined is not a function') // 错误类型指定，更加细分的说明是类型错误
		}

		this.resolveQueues = [] // 存储resolve和reject事件队列
		this.rejectQueues = []

		this.status = myPromise.PENDING // 初始状态为pending
		this.value // 维护值的变量，用于resolve/reject方法中值的传递

		handler(this._resolve.bind(this), this._reject.bind(this)) // 回调函数，之前只能进行简单的函数内部打印等，将resolve/reject作为参数传递实现then操作
	}

	_resolve(val) {
		// 1**********第一种写法
		// setTimeout(() => { // setTimeout 0秒执行解决当 new Promise中执行的是同步任务时候出现执行顺序的问题
		// 	if (this.status != myPromise.PENDING) return // 确保状态只能被修改一次，例如调用resolve后再调用reject需阻止此类操作
		// 	console.log('_resolve执行了')
		// 	this.status = myPromise.RESOLVE // 此时执行报错，因为2.html中resolve调用时候this指向window，使用bind解决
		// 	let handler // 以下解决调用多个实例情况下可以分别都被执行
		// 	while ((handler = this.resolveQueues.shift())) {
		// 		handler()
		// 	}
		// }, 0)
		// 2*********第二种写法
		window.addEventListener('message', () => {
			if (this.status != myPromise.PENDING) return // 确保状态只能被修改一次，例如调用resolve后再调用reject需阻止此类操作
			// console.log('_resolve执行了')
			this.status = myPromise.RESOLVE // 此时执行报错，因为2.html中resolve调用时候this指向window，使用bind解决
			this.value = val
			let handler // 以下解决调用多个实例情况下可以分别都被执行
			while ((handler = this.resolveQueues.shift())) {
				handler(this.value)
			}
		})
		window.postMessage('')
	}
	_reject(val) {
		// setTimeout(() => {
		// 	if (this.status != myPromise.PENDING) return
		// 	console.log('_reject执行拒绝')
		// 	this.status = myPromise.REJECT
		// 	let handler
		// 	while ((handler = this.rejectQueues.shift())) {
		// 		handler()
		// 	}
		// }, 0)
		window.addEventListener('message', () => {
			if (this.status != myPromise.PENDING) return
			console.log('_reject执行拒绝')
			this.status = myPromise.REJECT
			this.value = val
			let handler
			while ((handler = this.rejectQueues.shift())) {
				handler(this.value)
			}
		})
		window.postMessage('')
	}
	then(resolveHandler, rejectHandler) {
		// this.resolveQueues.push(resolveHandler)
		// this.rejectQueues.push(rejectHandler)
		return new myPromise((resolve, reject) => {
			// resolve() // 直接这样调用导致的结果是，未等执行then方法就执行new Promise中的方法了
			function newResolveHandler(val) {
				if (typeof resolveHandler == 'function') {
					let result = resolveHandler(val) // 将第一个对象的返回值赋值给第二个调用对象，完成值的传递
					// 理解原理，对result的几种情况进行处理，rasult可能返回123或者一个new Promise对象等
					if (result instanceof myPromise) {
						result.then(resolve, reject) // 返回的若是一个promise对象，则执行promise.then方法
					} else {
						resolve(result)
					}
				} else {
					resolve(val)
				}
			}
			function newRejectHandler(val) {
				if (typeof rejectHandler == 'function') {
					let result = rejectHandler(val)
					if (result instanceof myPromise) {
						result.then(resolve, reject)
					} else {
						reject(result)
					}
				} else {
					reject(val)
				}
			}
			this.resolveQueues.push(newResolveHandler)
			this.rejectQueues.push(newResolveHandler)
		})
	}
	catch(rejectHandler) {
		return this.then(undefined, rejectHandler) // 此处需要做容错处理，需要判断rejectHandler的类型，是否会存在undefined的情况
	}
}
