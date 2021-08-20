const mysql = require('mysql')
var con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Nav@gur1',
    database:'loginsignupdb'
});
con.connect(function(err){
    if (err) throw err;
    console.log('Connected..')
    const input = require('readline-sync')
    const user = input.question('Enter whether you want to log in or sign up: ')
    if (user=='signup'){
        const validator = require('validator')
        const username = input.question('Enter your name: ')
        const email = input.question('Enter your email:')
        if (validator.isEmail(email)==true){
            const paswd = input.question('Create a password: ')
            const strong_paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
            if (paswd.match(strong_paswd)){
                console.log('Confirmed password..')
                con.query("Insert into UserTable (Name,Email,Password) VALUES ('"+username+"','"+email+"','"+paswd+"')",function(err, result)      
                {if (err) throw err;
                    console.log('User data inserted..')
                });
            }else{
                console.log('Your password is weak !')
            }
        }else{
            console.log('Invalid Email address !')
        }
    }
    if(user=='login'){
        const input = require('readline-sync')
        const username = input.question('Enter your username: ')
        const paswd = input.question('Enter your password: ')
        con.query(`select * from UserTable where Password= '${paswd}'`,function(err,result){
            if (err) throw err;
            else if(result!=0){
                console.log(`Congrats..`,`${username} , you are logged in succsessfully..`)
              }
              else{
                console.log(`Invalid username or password!`)
              }
        })
    }
});

