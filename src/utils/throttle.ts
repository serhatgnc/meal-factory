export const throttle = (fnc:Function,delay:number) => {
    let shouldWait = false
    return () => {
        if(!shouldWait){
            fnc()
            shouldWait = true
            setTimeout(() => {
                shouldWait = false
            }, delay);
        }
    }
}