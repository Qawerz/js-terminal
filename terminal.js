//setup globals
var term = {};
term.prompt = "$ ";
term.in = document.getElementById('cmdinput');
term.out = document.getElementById('out');
term.pr = document.getElementById('prompt');
term.in_p = "$ ";
term.out_p = "> ";
term.commands = [];

//function
//execution
function results(args){
  for (var i = 0; i < term.commands.length; i++){
    console.log(i)
    var arg = [];
    var argum = "";
    arg = args.split(' ');
    if (arg[0] == term.commands[i][0]){

        if (arg.length >= 3){
            for (var j = 1; j < arg.length; j++){
                argum = argum+" "+arg[j]
            }
            return term.commands[i][1](argum)
        }
        if (arg[1] !== ""){
            return term.commands[i][1](arg[1])
        }
        return term.commands[i][1]()
    }

  }

     return "<span red>Unknown command: " + args.split(' ')[0] + "<br />";
}

//keypress event
function keypress_handle(e, el){
  if (e.keyCode === 13){
    term.out.innerHTML += term.in_p + el.value + "<br />" + term.out_p + results(el.value) + "<br/>"+"<br>";
    el.value = '';
  }
}


///////////////
//  Commands //
///////////////


term.commands.push(['help',  //command name
	function(){														//
		var str_full = '<br>';										//
		for (var i = 0; i < term.commands.length; i++){				//Command function
		str_full += term.commands[i][0]+term.commands[i][2]+"<br>";	//
	}																//
  return str_full			//return to output
}, ' - show all commands' //description
]);

term.commands.push(['echo',
  function(arg) {
  var str_full = '';
  return str_full += arg
  return str_full;},' - repeat your text']);



term.commands.push(['color', function (arg) {
        console.log(arg)
        console.log(arg.length)
        if (arg === "red") {
          term.out.style.color = 'red';
          term.in.style.color = 'red';
          term.pr.style.color = 'red';
          return "Color is now " + arg;
        }
        if (arg === "white") {
          term.out.style.color = 'white';
          term.in.style.color = 'white';
          term.pr.style.color = 'white';
          return "Color is now " + arg;
        }
        if (arg === "rainbow") {
            term.out.classList.toggle('rainbow')
            term.in.classList.toggle('rainbow')
            term.pr.classList.toggle('rainbow')
            return "Color is now " + arg;   

        }
        if (arg === "lime") {
            term.out.style.color = 'lime';
            term.in.style.color = 'lime';
            term.pr.style.color = 'lime';
            return "Color is now " + arg;
        }

        if (arg.length<=6) {
            if (arg.length > 0){
                term.out.style.color = '#' + arg;
                term.in.style.color = '#' + arg;
                term.pr.style.color = '#' + arg;
                return "Color is now " + arg;
            }

        }
        else {
          return "<span red>Color is not founded</span>"
        }        }, ' - changing color of the terminal (white, red, lime, rainbow or HEX(without #))']);


term.commands.push(['alert', function (arg) {
    alert(arg)
    return ""
}, " - alert in browser"])
term.commands.push(['time', function () {
    var now = new Date();
    return now;
}, ' - date and time at this moment'])

term.commands.push(['about',
 function () {
	var str_full = '<p>Creator: <a style="color: white" href="https://github.com/Qawerz">Qawerz</a><br>Create date : 2-Oct-2020</p>';
    return str_full;
}, ' - some info about creator'])
