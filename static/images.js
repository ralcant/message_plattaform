const profile_pictures = {
    "A":{
        source: require('./img/test.jpg')
    },
    "B":{
        source: require('./img/test.jpg')
    },
    "C":{
        source: require('./img/test.jpg')
    },
    "D":{
        source: require('./img/test.jpg')
    },
    "E":{
        source: require('./img/test.jpg')
    },
    "F":{
        source: require('./img/test.jpg')
    },
    "G":{
        source: require('./img/test.jpg')
    },
    "H":{
        source: require('./img/test.jpg')
    },
    "I":{
        source: require('./img/test.jpg')
    },
    "J":{
        source: require('./img/test.jpg')
    },
    "K":{
        source: require('./img/test.jpg')
    },
    "L":{
        source: require('./img/test.jpg')
    },
    "M":{
        source: require('./img/test.jpg')
    },
    "N":{
        source: require('./img/test.jpg')
    },
    "Ñ":{
        source: require('./img/test.jpg')
    },
    "O":{
        source: require('./img/test.jpg')
    },
    "P":{
        source: require('./img/test.jpg')
    },
    "Q":{
        source: require('./img/test.jpg')
    },
    "R":{
        source: require('./img/test.jpg')
    },
    "S":{
        source: require('./img/test.jpg')
    },
    "T":{
        source: require('./img/test.jpg')
    },
    "U":{
        source: require('./img/test.jpg')
    },
    "V":{
        source: require('./img/test.jpg')
    },
    "W":{
        source: require('./img/test.jpg')
    },
    "X":{
        source: require('./img/test.jpg')
    },
    "Y":{
        source: require('./img/test.jpg')
    },
    "Z":{
        source: require('./img/test.jpg')
    },
    "default":{
        source: require("./img/test.jpg")
    }
}


function load_image(display_name){
    let first_letter = display_name[0]
    let keyword = "B"//first_letter;
    console.log("keyword is ", keyword)
    return profile_pictures[keyword].source
}

module.exports= load_image;