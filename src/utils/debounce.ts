export const debounce = (fnc:() => Promise<void> , delay:number) => {
    let timeout:any
    return function() {
        if(timeout)clearTimeout(timeout)
        timeout = setTimeout(() => {
            fnc()
        }, delay);
    }
}