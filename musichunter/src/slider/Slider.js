import React, { useEffect, useState, useRef } from 'react';


//DEFAULT STYLES###########################


function Slider(props) {
    let slideStyle = {
        minWidth: '600px',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };
    let buttonNextStyle = {
        position: 'absolute',
        right: '0',
        top: '40%',
        height: '50px',
        border: '1px solid black',
        borderRight: 'none'
    }
    let buttonPrevStyle = {
        position: 'absolute',
        left: '0',
        top: '40%',
        height: '50px',
        border: '1px solid black',
        borderLeft: 'none'
    }
    let sliderStyle = {
        minWidth: "600px",
        height: '300px',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
    }
    const containerEl = useRef(null);
    const sliderEl = useRef(null);
    const [counter, setcounter] = useState(0);
    const [slideWidth, setSlideWidth] = useState(props.width)
    useEffect(() => {
        if (props.infinity){
            containerEl.current.style.left = '-100%';
        }
    }, []);
    useEffect(() => {
        
        setSlideWidth(sliderEl.current.getBoundingClientRect().width);
    })
    function styleCompiler(STYLE_ID) {
        switch (STYLE_ID) {
            case 1: {
                if (props.buttonNextStyle) {
                    return Object.assign(buttonNextStyle, props.buttonNextStyle);
                }
                return buttonNextStyle;
            }
            case 2: {
                if (props.buttonPrevStyle) {
                    return Object.assign(buttonPrevStyle, props.buttonPrevStyle);
                }
                return buttonPrevStyle;
            }
            case 3: {
                if (props.width && props.height) {
                    return Object.assign(slideStyle, { height: props.height, minWidth: slideWidth });
                }
                else if (props.width) {
                    return Object.assign(slideStyle, { minWidth: slideWidth });
                }
                else if (props.height) {
                    return Object.assign(slideStyle, { height: props.height });
                }
                return slideStyle;
            }
            case 4: {
                if (props.width && props.height) {
                    return Object.assign(sliderStyle, { height: props.height, minWidth: props.width });
                }
                else if (props.width) {
                    return Object.assign(sliderStyle, { minWidth: props.width });
                }
                else if (props.height) {
                    return Object.assign(sliderStyle, { height: props.height });
                }
                return sliderStyle;
            }
            default:
                break;
        }
    }
    function nextSlide() {
        if (!props.infinity) {
            if (counter < props.slides.length - 1) {
                let el = containerEl.current;
                el.animate([
                    { left: el.style.left },
                    { left: parseInt(el.style.left) - 100 + "%" }
                ], {
                    duration: props.duration,
                    iterations: 1,
                    fill: 'both'
                });
                el.style.left = parseInt(el.style.left) - 100 + "%";
                setcounter(counter + 1);
            }
        }
        else {
            console.log("NEXT ACTION")
            if (counter < props.slides.length) {
                let el = containerEl.current;
                el.animate([
                    { left: el.style.left },
                    { left: parseInt(el.style.left) - 100 + "%" }
                ], {
                    duration: props.duration,
                    iterations: 1,
                    fill: 'both'
                });
                el.style.left = parseInt(el.style.left) - 100 + "%";
                setcounter(counter + 1);
            }
            if (counter == props.slides.length - 1) {
                let el = containerEl.current;
                el.style.left = "-100%";
                setcounter(0);
            }
        }
    }
    function prevSlide() {
        if (!props.infinity){
            if (counter > 0) {
                let el = containerEl.current;
                el.animate([
                    { left: el.style.left },
                    { left: parseInt(el.style.left) + 100 + "%" }
                ], {
                    duration: props.duration,
                    iterations: 1,
                    fill: 'both'
                });
                el.style.left = parseInt(el.style.left) + 100 + "%";
                setcounter(counter - 1);
            }
        }
        else{
            if (counter == 0){
                let el = containerEl.current;
                el.animate([
                    { left: el.style.left },
                    { left: parseInt(el.style.left) + 100 + "%" }
                ], {
                    duration: props.duration,
                    iterations: 1,
                    fill: 'both'
                });
                el.style.left = parseInt(-100 * (props.slides.length)) + "%";
                setcounter(props.slides.length - 1);
                console.log("INFO 0 ",el.style.left, counter);
            }
            else if (counter > 0) {
                let el = containerEl.current;
                el.animate([
                    { left: el.style.left },
                    { left: parseInt(el.style.left) + 100 + "%" }
                ], {
                    duration: props.duration,
                    iterations: 1,
                    fill: 'both'
                });
                el.style.left = parseInt(el.style.left) + 100 + "%";
                setcounter(counter - 1);
                console.log("INFO",el.style.left, counter);

            }
        }
    }
    const arrowLeftStyle = {
        border: "solid black",
        borderWidth: "0 3px 3px 0",
        display: "flex",
        position: 'absolute',
        padding: "10px",
        transform: "rotate(135deg)",
        left: '20px',
        top: '40%',
        cursor: 'pointer'
    }
    const arrowRigthStyle = {
        border: "solid black",
        borderWidth: "0 3px 3px 0",
        display: "flex",
        position: 'absolute',
        padding: "10px",
        transform: "rotate(-45deg)",
        right: '20px',
        top: '40%',
        cursor: 'pointer'
    }
    return (<div className="slider" style={styleCompiler(4)} ref={sliderEl}>
        <div className="slider-container" style={{ position: 'absolute', height: '100%', display: 'flex', left: '0%' }} ref={containerEl}>
            {props.infinity ? <div className="slide" style={styleCompiler(3)}>{props.slides[props.slides.length - 1]}</div> : null}
            {props.slides ? props.slides.map((value) => {
                return <div className="slide" style={styleCompiler(3)}>
                    {value}
                </div>
            }) : null}
            {props.infinity ? <div className="slide" style={styleCompiler(3)}>{props.slides[0]}</div> : null}
        </div>
        {/* <button id="slider-next" onClick={() => { nextSlide() }} style={styleCompiler(1)}>Next</button> */}
        {/* <button id="slider-next" onClick={() => { prevSlide() }} style={styleCompiler(2)}>Prev</button> */}
        <span style={arrowLeftStyle} onClick={() => { prevSlide() }}></span>
        <span style={arrowRigthStyle} onClick={() => { nextSlide() }}></span>


    </div>);

}


export default Slider;