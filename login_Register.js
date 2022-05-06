var email = document.getElementById('inputLog');
var pw = document.getElementById('inputSenha');

document.getElementById('getLogin').addEventListener('click', function(){
    axios.get('https://reqres.in/api/users/2')
        .then(function(res){
            var data = res.data.data;
            console.log(res);
            document.getElementById("inputLog").setAttribute('value', data.email);
            document.getElementById("inputSenha").setAttribute('value', data.first_name + data.last_name);
        });
});