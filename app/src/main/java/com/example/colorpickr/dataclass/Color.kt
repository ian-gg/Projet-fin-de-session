package com.example.colorpickr.dataclass

data class Color(
    val hex: Hex, //hex{clean}
    val name: Name //name{value}
)

data class Hex(
    val value: String,
    val clean: String
)

data class Name(
    val value: String
)

// exemple of request
// {"hex":{"value":"#B24824","clean":"B24824"},"rgb":{"fraction":{"r":0.6980392156862745,"g":0.2823529411764706,"b":0.1411764705882353},"r":178,"g":72,"b":36,"value":"rgb(178, 72, 36)"},
// "hsl":{"fraction":{"h":0.04225352112676062,"s":0.663551401869159,"l":0.41960784313725485},"h":15,"s":66,"l":42,"value":"hsl(15, 66%, 42%)"},
// "hsv":{"fraction":{"h":0.04225352112676062,"s":0.7977528089887641,"v":0.6980392156862745},"value":"hsv(15, 80%, 70%)","h":15,"s":80,"v":70},
// "name":{"value":"Desert","closest_named_hex":"#AE6020","exact_match_name":false,"distance":860},
// "cmyk":{"fraction":{"c":0,"m":0.5955056179775281,"y":0.7977528089887641,"k":0.3019607843137255},"value":"cmyk(0, 60, 80, 30)","c":0,"m":60,"y":80,"k":30},
// "XYZ":{"fraction":{"X":0.4143231372549019,"Y":0.36053490196078425,"Z":0.18131686274509803},"value":"XYZ(41, 36, 18)","X":41,"Y":36,"Z":18},
// "image":{"bare":"http://www.thecolorapi.com/id?format=svg&named=false&hex=B24824","named":"http://www.thecolorapi.com/id?format=svg&hex=B24824"},
// "contrast":{"value":"#ffffff"},
// "_links":{"self":{"href":"/id?hex=B24824"}},
// "_embedded":{}}