import * as assert from "assert";
import * as request from "superagent";



describe('homepage', function () {
    it('should respond to GET', function (done) {
        request
            .get('http://localhost:3000/contact')
            .end(function (err, res) {
                console.log(res.body)
                console.log(JSON.parse(res.body))


            })
    })
});