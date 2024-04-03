class Profiler {

    constructor() {
        this.enable = this.enable.bind(this);
    }

    enable(req, res, next) {
        
        if(res.statusCode == 200) {
            console.log(req.url);
        }
        /** Original res.send */
        const oldResSend = res.send;
        //console.log(res.app);
        console.log('OldSend:',oldResSend);
        
        res.send = function(data) {
            //Targets the last route:url
            console.log(res.statusCode);
            oldResSend.apply(res, arguments); //New res.send

            /** Can make this to JSON and passed to the view */
            if(res.statusCode == 200) {
                console.log('GET data:', req.query); //Also not sure lmao
                console.log('POST data:', req.body); 
                console.log('Memory usage:', process.memoryUsage());
                console.log('URI string:', req.url);
                //console.log('Data queries:', req.query); Not sure lmao
                //console.log('HTTP headers:', req.headers);

                
                if (req.session) {
                    console.log('Session data:', req.session);
                }
            }
            
        }
        next();
    }

}

module.exports = Profiler;