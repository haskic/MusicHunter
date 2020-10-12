import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import './scss/TrackDiagram.scss';

// const default_arr = [];
// const points = [49.40722,50.120464,48.70751,49.816223,49.193375,49.64843,47.940346,48.895893,50.641,49.23119,46.747055,47.357677,55.445164,51.886063,47.467636,49.00901,78.25299,20.747192,44.709827,60.72526,48.997272,46.225315,55.308712,32.729897,47.552765,43.779705,64.06053,38.974964,51.1806,30.064384,69.75775,50.96002,44.079556,51.353024,50.813236,50.61299,49.217514,59.723705,49.237114,37.790005,51.945187,41.97152,53.033665,58.275356,50.02597,39.55231,50.45737,47.892742,49.510025,52.817608,41.339245,56.27986,42.329464,72.15864,49.889385,23.717236,52.095333,60.00594,46.535255,51.514267,36.76913,61.175484,47.013374,42.101658,49.339027,59.723896,50.246643,52.704857,37.00674,50.844383,46.2815,47.25478,38.796207,69.290955,48.052998,46.651695,45.3542,53.33258,62.881935,19.895395,64.00415,47.36124,51.84455,49.796818,30.038322,68.55501,52.430405,43.5482,46.20194,54.169403,30.315794,70.028015,40.68985,49.478878,47.298214,49.63736,52.75033,40.779026,56.897827,43.08306,51.002422,48.521202,55.753185,51.85655,40.084366,51.633316,43.356976,51.72747,51.316593,54.566578,46.31348,39.75355,47.79361,51.758846,53.381508,49.705936,60.091076,26.63168,49.603878,56.0859,45.623245,22.081776,78.084435,49.973026,56.95443,34.75977,56.461784,78.791176,17.137615,50.667225,38.61052,48.70059,48.45547,49.6126,50.86812,49.646385,42.35585,52.450848,52.886227,46.05851,49.00252,40.84936,54.26239,55.586006,50.82829,48.013012,35.21281,68.94202,34.151146,52.818047,49.048958,55.92632,44.87343,57.430565,34.97372,46.218002,49.85719,50.800823,73.55025,36.824066,43.395298,51.05011,49.899704,49.00192,43.46594,52.367523,46.998474,50.835426,52.380814,48.087013,48.290413,37.14697,64.37313,42.992897,51.509415,48.79044,48.942055,62.45696,34.44451,52.613564,46.157078,52.61146,40.024567,42.392906,61.270718,44.57384,56.869236,45.02549,47.161957,28.549261,90.68295,29.484911,58.078938,42.782646,48.90004,50.33497,47.952545,51.622723,40.148212,56.685085,49.483456,48.33842,55.681652,49.49843,42.891617,48.591125,49.63467,49.684597,56.488277,37.43349,51.796986,52.520996,53.40871,36.59847,44.522232,63.734905,46.29734,45.3469,44.835438,46.47968,73.17944,22.25668,51.13251,46.907543,62.429565,40.230312,53.66908,63.44419,23.917501,62.7243,42.584858,45.406677,24.520136,64.89844,51.50911,50.42644,56.579273,41.069023,52.735176,77.37646,17.76421,53.533913,39.49852,51.683407,50.54126,43.448875,55.351772,54.322067,50.059677,49.863228,39.15709,74.107185,23.192192,51.80983,48.631615,43.026203,47.8806,49.40956,46.334858,52.331303,51.980434,45.94626,38.564922,84.183525,15.470832,45.63649,43.86743,64.22171,47.099163,42.98335,47.03558,49.084896,57.53766,45.08124,42.47393,50.85246,45.45476,54.360725,48.38167,37.221687,51.5545,49.51073,39.329464,55.4043,53.524193,48.232773,41.053955,54.104496,48.053642,37.1684,57.038433,52.38339,53.183292,44.565823,52.40632,42.93756,51.49574,46.624157,46.728264,46.38163,62.33472,36.12069,53.217796,50.86339,42.162544,46.57486,48.80514,51.576538,73.05908,19.50735,50.62765,53.206177,99.56189,31.093643,54.369774,38.9549,67.29849,32.296944,79.19016,42.048916,61.507584,52.21817,50.691456,58.096058,69.938934,58.714428,23.276432,39.809654,75.661995,38.577553,47.93231,63.516785,8.530184,51.935913,76.120224,46.757248,51.098488,85.55599,46.279922,24.367342,43.68529,87.66841,22.016968,87.24433,25.307083,59.066753,53.822334,82.098206,39.98765,50.589397,60.63228,52.80472,42.066975,47.076767,49.829426,49.911213,52.21207,35.41937,60.87906,49.005543,45.080227,60.15751,51.114044,49.615288,41.448257,58.4901,63.388763,37.16082,10.5365715,76.000755,75.61023,2.094102,74.30718,53.73407,45.30312,64.93923,58.620983,52.01371,40.34558,48.046974,50.89163,49.16421,56.481342,61.08553,67.573456,25.797606,45.535942,57.691093,41.30226,50.180363,45.23075,49.757328,48.832428,89.67962,60.347397,34.19961,31.270832,34.107857,50.911198,55.582767,42.91416,49.459465,65.32886,45.397232,67.144516,79.15811,0.61839586,53.768414,48.50544,46.350914,42.646103,57.978218,48.109005,52.11627,46.35696,51.635735,48.71096,48.5115,53.16032,54.762554,39.479553,48.023468,60.66767,29.558596,51.144005,59.813507,42.80847,53.591965,50.676052,41.636402,53.316105,51.13122,48.387115,50.946163,48.130913,36.8097,48.91105,55.60963,49.82495,60.67643,37.501476,49.933456,49.507195,29.12039,72.072464,45.709316,70.9545,59.460632,11.613299,53.47348,45.477093,51.935837,46.121956,48.156086,53.15251,49.23459,49.323658,49.049892,49.229733,49.645885,49.56275,49.06442,49.65857,49.135418,49.253986,49.437157,44.954987,55.416412,47.531994,49.42728,49.595528,48.61398,49.117573,50.39192,48.64918,49.938274,49.0325,49.491764,42.492943,55.751774,52.86561,46.560043,44.879787,53.500107,47.03791,54.246563,46.280197,49.687138,49.42857,49.02193,47.79236,49.49955,50.978306,49.451363,48.906677,49.677486,49.010212,49.739334,49.40369,49.053955,49.41163,48.388947,50.097534,45.502975,32.177982,72.99117,81.931,55.6848,15.010856,21.038046,37.752167,76.851494,44.09355,53.476437,47.11608,49.551132,57.44191,30.159298,32.838104,56.189964,38.987904,39.546932,58.232277,9.262972,42.837894,29.234123,53.021214,52.52392,44.629433,60.6897,22.950289,75.50239,42.04179,48.55115,45.410366,28.270247,29.889177,49.091457,53.48787,53.774563,44.901775,38.393223,60.07522,63.755997,36.27295,40.4068,58.79238,64.04177,39.535156,55.88047,48.173832,37.37354,53.721355,48.956074,53.06936,8.640299,27.468243,76.56886,33.87765,30.893263,61.10522,27.8432,52.504227,63.288174,35.160187,51.87702,59.39588,17.685034,23.61998,50.074043,68.30821,61.16028,23.612621,66.36428,22.411762,73.76152,45.164726,60.059807,22.743042,66.990715,45.46999,25.899029,69.549934,70.43182,24.870792,26.498178,24.990309,51.570183,44.458996,47.1666,58.03183,49.96542,34.61832,45.41442,27.238249,51.229053,48.546124,53.815468,57.316284,33.927414,44.14428,60.53901,50.391457,55.120293,31.156725,45.998436,43.328526,28.83682,54.531975,2.4962087,100.0,42.517494,67.649574,0.0,71.218575,51.617626,18.400515,49.014233,27.460947,59.482346,34.669044,33.462578,36.058712,50.10112,31.041,69.20784,40.467033,45.151577,79.51278,38.905647,38.689182,34.347366,55.444016,51.014587,32.91049,62.775707,46.12958,64.204895,33.530586,52.46182,44.954315,58.93679,45.381287,28.91765,66.461075,49.036884,26.833076,45.391453,71.88669,49.04445,50.666355,46.74522,55.58804,25.124117,89.69715,28.964603,56.757492,47.467987,48.489677,49.010128,49.23501,49.59778,49.47163,49.91662,49.64959,49.570435,49.41634,49.044754,49.147984,49.299774,49.154247,49.387608,48.948597,49.294285,49.519005,49.21745,49.04315,50.792133,47.710007,50.02235,44.483665,55.208633,52.454647,52.092323,43.32133,44.93159,51.954487,49.82486,49.256706,49.172283,49.341022,49.36852,49.36634,49.384018,49.34289,49.358765,49.317616,49.35152,49.317905,49.36784,49.309376,49.31397];
// for (let i = 0; i < 702; i += 3) {
//     // let heightValue = randomInteger(15, 50);
//     // console.log("HEIGHTValue = ", heightValue);
//     // ctx.fillRect(i, 0, 2.5, heightValue);
//     default_arr.push({ x: i, y: 70, width: 2.2, height: -points[i] });
// }
// console.log("LENGTH = ",default_arr.length);

function randomInteger(min, max) {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    // console.log(Math.round(rand));
    return Math.round(rand);

}



function TrackDiagram(props) {
    const canvasElement = useRef(null);
    const [isActive, setisActive] = useState(false);
    const [updateInterval, setupdateInterval] = useState(null);
    const [points, setPoints] = useState([]);
    useEffect(() => {
        return () => {
            clearInterval(updateInterval);
            console.log("useeffect[updatedInterval] deleted", updateInterval)
        };
    }, [updateInterval])
    useEffect(() => {
        let newPoints = [];
        for (let i = 0; i < 702; i += 3) {
            newPoints.push({ x: i, y: 70, width: 2.2, height: -props.points[i] });
        }
        setPoints((prevState) => newPoints);
        console.log("Props.points changed", props.points);
    }, [props.points]);
    useEffect(() => {
        if (!props.isActive) {
            clearInterval(updateInterval);
        }
        else {
            let audioPlayer = document.getElementById("audio-player");
            let timer = setInterval(() => {
                let currentX = audioPlayer.currentTime / audioPlayer.duration * 702;
                updateDiagram(canvasElement, currentX);
            }, 50);
            setupdateInterval(prevState => {
                if (prevState !== null) {
                    clearInterval(prevState);
                }
                return timer;
            });
        }
    }, [props.isActive])
    useEffect(() => {
        console.log("TRY TO SET INTERVAL .................................");
        console.log("POINTS STATE ", points);

        if (points.length > 0 && props.hashUrl === props.store.currentSong.hashUrl) {
            console.log("SET INTERVAL .................................")
            let audioPlayer = document.getElementById("audio-player");
            if (props.store.isPlaying === true) {
                let timer = setInterval(() => {
                    let currentX = audioPlayer.currentTime / audioPlayer.duration * 702;
                    // console.log("UPDATING");
                    updateDiagram(canvasElement, currentX);
                }, 50);
                setupdateInterval(prevState => {
                    if (prevState !== null) {
                        clearInterval(prevState);
                    }
                    return timer;
                });
                console.log("TIMER ID  = ", updateInterval);
                console.log("TIMER ID normal = ", timer);
            }
            // else {
            //     let timer = setInterval(() => {
            //         let currentX = audioPlayer.currentTime / audioPlayer.duration * 702;
            //         // console.log("UPDATING");
            //         updateDiagram(canvasElement, currentX);
            //     }, 50);
            //     setupdateInterval(prevState => {
            //         if (prevState !== null) {
            //             clearInterval(prevState);
            //         }
            //         return timer;
            //     });
            //     console.log("TIMER ID  = ", updateInterval);
            //     console.log("TIMER ID normal = ", timer);


            // }

        }

        drawDiagram();
    }, [points])

    useEffect(() => {
        console.log("CHANGE TRACK TRIGGER");
        if (props.albumHash) {
            if (props.albumHash == props.store.playlist.hash && props.hashUrl === props.store.currentSong.hashUrl) {
                // setisActive(true);
                let audioPlayer = document.getElementById("audio-player");
                let timer = setInterval(() => {
                    let currentX = audioPlayer.currentTime / audioPlayer.duration * 702;
                    updateDiagram(canvasElement, currentX);
                }, 50);
                setupdateInterval(prevState => {
                    if (prevState !== null) {
                        clearInterval(prevState);
                    }
                    return timer;
                });
                // console.log("TIMER ID  = ", updateInterval);
                // console.log("TIMER ID normal = ", timer);
            }
            else {
                clearInterval(updateInterval);
                // setisActive(false);
                drawDiagram();

            }
        }
        else {
            if (props.hashUrl === props.store.currentSong.hashUrl) {
                // setisActive(true);
                let audioPlayer = document.getElementById("audio-player");
                if (points.length > 0) {
                    let timer = setInterval(() => {
                        let currentX = audioPlayer.currentTime / audioPlayer.duration * 702;
                        updateDiagram(canvasElement, currentX);
                    }, 50);
                    setupdateInterval(prevState => {
                        if (prevState !== null) {
                            clearInterval(prevState);
                        }
                        return timer;
                    });
                    // console.log("TIMER ID  = ", updateInterval);
                    // console.log("TIMER ID normal = ", timer);
                }

                drawDiagram();
            }
            else {
                clearInterval(updateInterval);
                // setisActive(false);
                drawDiagram();

            }
        }

    }, [props.store.currentSong]);



    function updateDiagram(canvas, currentX) {
        console.log("Updating diagram");
        let rect = canvas.current.getBoundingClientRect();
        let ctx = canvas.current.getContext('2d');
        ctx.clearRect(0, 0, rect.width, rect.height);
        points.forEach((element, index) => {
            if (element.x <= currentX - element.width) {
                ctx.fillStyle = 'rgba(0,0,254,1)';
                ctx.fillRect(element.x, element.y, element.width, element.height);
            }
            else if (element.x <= currentX && currentX <= element.x + element.width) {
                ctx.fillStyle = 'rgba(0,0,254,0.1)';
                if (currentX - element.x > element.width / 12) {
                    ctx.fillStyle = 'rgba(0,0,254,0.1)';
                }
                if (currentX - element.x > 2 * element.width / 12) {
                    ctx.fillStyle = 'rgba(0,0,254,.2)';
                }
                if (currentX - element.x > 3 * element.width / 12) {
                    ctx.fillStyle = 'rgba(0,0,254,.3)';
                }
                if (currentX - element.x > 4 * element.width / 12) {
                    ctx.fillStyle = 'rgba(0,0,254,.4)';
                }
                if (currentX - element.x > 5 * element.width / 12) {
                    ctx.fillStyle = 'rgba(0,0,254,.5)';
                }
                if (currentX - element.x > 6 * element.width / 12) {
                    ctx.fillStyle = 'rgba(0,0,254,.6)';
                }
                if (currentX - element.x > 7 * element.width / 12) {
                    ctx.fillStyle = 'rgba(0,0,254,.7)';
                }
                if (currentX - element.x > 8 * element.width / 12) {
                    ctx.fillStyle = 'rgba(0,0,254,.8)';
                }
                if (currentX - element.x > 9 * element.width / 12) {
                    ctx.fillStyle = 'rgba(0,0,254,.9)';
                }
                if (currentX - element.x > 10 * element.width / 12) {
                    ctx.fillStyle = 'rgba(0,0,254,1)';
                }
                ctx.fillRect(element.x, element.y, (currentX - element.x), element.height);
                ctx.fillStyle = 'rgba(0,0,254,0.1)';
                ctx.fillRect(currentX, element.y, element.width - (currentX - element.x), element.height);
            }
            else {
                ctx.fillStyle = 'rgba(0,0,254,0.1)';
                ctx.fillRect(element.x, element.y, element.width, element.height);
            }
        });
    }


    function drawDiagram() {
        let rect = canvasElement.current.getBoundingClientRect();
        let ctx = canvasElement.current.getContext('2d');
        ctx.clearRect(0, 0, rect.width, rect.height);
        ctx.fillStyle = 'rgba(180,180,180,1)';
        // console.log("DRAW METHOD", points);
        points.forEach((element) => {
            ctx.fillRect(element.x, element.y, element.width, element.height);
        });
    }
    return (<div className="track-diagram">
        <canvas width="702px" height="70px" ref={canvasElement}></canvas>
    </div>);

}


export default connect(
    state => ({ store: state }),
    dispatch => ({
        changeIslogin: (value) => {
            dispatch({ type: 'ZHAKAR', isLogin: value })
        },
        changeCurrentTrack: (value) => {
            dispatch({ type: 'PLAYLIST_SET_COUNTER', counterValue: value })
        },
        changePlayingToggle: () => {
            dispatch({ type: 'PLAYING_TOGGLE' })
        },
        changeSong: (value) => {
            dispatch({ type: 'SET_SONG', song: value })
        },
        changeIsPlayingState: (value) => {
            dispatch({ type: 'SET_PLAYING_STATE', isPlaying: value })
        },
    })
)(TrackDiagram);