function style(defaultStyle,newStyle){
    let args = Array.from(arguments);
    if (args.length > 2){
        args = args.slice(2);
    }
    // console.log("ARGS = ",args);
    // args.forEach((value,index) => {
    //     if (value === undefined){
    //         args[index] = {};
    //     }
    // });
    return Object.assign.apply(null,[{},defaultStyle,newStyle,...args]);
}



export default {style};