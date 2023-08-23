var express = require('express');
var cors = require('cors');

var fs = require("fs");
const { json } = require('express');
var app = express();
var port = 8080

app.use(cors())
app.use(express.json());

var sendMail = require('./utils/verifymail').sendMailToUser

var otpUserName;

app.get('/', function(req, res) {
    console.log('Welcome to the page')
    res.send("Welcome to the Page");
})

app.post('/', function(req, res) {
    console.log("name", req.body.username)
    otpUserName = req.body.username;
    fs.readFile("./todo.txt", "utf-8", function(err, data) {
        var data = JSON.parse(data)
        console.log(data, data.length);
        let showTodos = [];

        for (let i = 0; i < data.length; i++) {
            console.log(data[i].username);
            if (data[i].username == req.body.username) {
                console.log("data", data[i].todo);
                showTodos.push(data[i].todo);

            } else {
                //console.log("data not", data[i].todo);
            }
        }
        res.json(showTodos)
    })
})


app.post("/savedetails", function(req, res) {
    console.log(req.body.userName + req.body.userEmail)
    otpUserName = req.body.userName;


    var otp = Math.floor(Math.random() * (999999 - 100000) + 100000);

    correctOtp = otp;

    // sendOtp(req.body.mobileNumber, otp);
    //xyz(req.body.mobileNumber, otp);

    otpMail(req.body.userEmail, otp);


    //otpSend(req.body.mobileNumber, otp);

})

app.post("/checkotp", function(req, res) {
    console.log(req.body.otp, correctOtp)

    if (correctOtp == req.body.otp) {
        console.log("correct")
        res.json("correct Otp")
    } else {
        console.log("wrong")
        res.json("404")
    }
})

function otpMail(email, otp) {
    var body = 'Hii!!.. ' +otpUserName + ', your login OTP is - ' + otp;

    sendMail(email,
        body,
        function(err) {
            if (err) {
                res.render("error.ejs", { errorMsg: "Error While sending Otp!" })
            } else {
                console.log("OTP sent Successfully");
                //res.status(200);
                //res.render("message.ejs",{msg :"We have sent an OTP to your Mail Please Check Your Mail"})
            }
        })
}

app.post("/savetodo", function(req, res) {
    console.log(req.body)
    fs.readFile("./todo.txt", "utf-8", function(err, data) {
        let todos = [];

        if (data.length > 0) {
            todos = JSON.parse(data)
        }

        todos.push(req.body);

        fs.writeFile("./todo.txt", JSON.stringify(todos), function(err) {
            if (err) {
                console.log("err while saving")
            } else {
                console.log("saved successfully")
            }
        })
    })

})

app.post("/deletetodo", function(req, res) {
    var deleteId = req.body.deleteId;
    console.log(deleteId);

    fs.readFile("./todo.txt", "utf-8", function(err, data) {
        let todos = []
        if (data.length > 0) {
            todos = JSON.parse(data)
        }
        todos.splice(deleteId, 1);

        fs.writeFile("./todo.txt", JSON.stringify(todos), function(err) {
            if (err) {
                console.log("Error while deleting");
            } else {
                console.log("delete success");
            }
        })
    })
})

app.post("/edittodo", function(req, res) {
    var editId = req.body.editId;
    var editTask = req.body.editTodo;

    fs.readFile("./todo.txt", "utf-8", function(err, data) {
        let todos = []
        if (data.length > 0) {
            todos = JSON.parse(data)
        }
        todos[editId].todo = editTask;

        fs.writeFile("./todo.txt", JSON.stringify(todos), function(err) {
            if (err) {
                console.log("Error while deleting");
            } else {
                console.log("delete success");
            }
        })
    })

})

app.listen(port, () => {
    console.log("server is running at port" + port)
})
