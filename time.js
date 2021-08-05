//clock   
   function updateClock(){
        var now=new Date();
        var dname= now.getDay();
            mo = now.getMonth();
            dnum= now.getDate();
            yr= now.getFullYear();
            hou=now.getHours();
            min=now.getMinutes();
            sec=now.getSeconds();
            pe= "AM";

            if(hou == 0){
                hou = 12;
            }
            if(hou>12){
                hou=hou-12;
                pe="PM";
            }

            Number.prototype.pad = function(digits){
                for(var n=this.toString();n.length <digits;n=0+n);
                return n;
            }
        
        var months =["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"];
        var week = ["SUNDAY", "MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"];
        var ids = ["dayname","month","daynum","year","hour","minutes","seconds","period"];
        var values = [week[dname], months[mo], dnum.pad(2), yr, hou.pad(2), min.pad(2), sec.pad(2), pe];
        for(var i =0;i<ids.length;i++) {
            document.getElementById(ids[i]).firstChild.nodeValue = values[i];
        }
    }
        function initClock(){
            updateClock();
            window.setInterval("updateClock()",1);
        }

//turn off right click
      document.addEventListener("contextmenu", function(e){
    e.preventDefault();
}, false);    

//block key
const webpack = require('webpack');
const path = require('path');

const isProd = NODE_ENV === 'production';
const ifProd = x => isProd && x;
const removeEmpty = arr => arr.filter(Boolean);

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: '[name].js',
    },
    module: {
        rules: [
            // loaders configuration
        ],
    },
    optimization: {
        noEmitOnErrors: true,
        minimizer: removeEmpty([
            ifProd(new UglifyJsPlugin({
                // this one is important
                sourceMap: true,
            })),
        ]),
    },
    // devTool option is not needed anymore for prod
    // but for development it's just easier to use then SourceMapDevToolPlugin
    devtool: isProd ? false : 'cheap-module-eval-source-map',
    // we gonna use this plugin:
    plugins: [
        // ... other plugins
        ifProd(new webpack.SourceMapDevToolPlugin({
            // this is the url of our local sourcemap server
            publicPath: 'https://localhost:5050/',
            filename: '[file].map',
        })),
    ]
};