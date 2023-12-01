const simulateSetTime = (fn, timeout) => {
    let timer = null

    timer = setInterval(()=>{
        clearInterval(timer)
        fn()
    }, timeout)

    return () => clearInterval(timer)
}

const cancel = simulateSetTime(()=>{
    console.log(1)
}, 1000)

setTimeout(()=>{
    cancel()
}, 1100)