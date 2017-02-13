$(document).ready(function() {
	
	function randomize(){
		return Math.floor(Math.random() * (4));
	}
	var sequence = [randomize()];

	//sequence = [0,1,2,3,3,2,1,0];
	console.log(sequence);

	function emulateSequence(){
		var i = 0, howManyTimes = sequence.length;
		function f(){
			$("#" + sequence[i]).addClass('active').delay(1000).queue(function(){
				$(this).removeClass('active').dequeue();
			});
			i++;
			if(i < howManyTimes){
				setTimeout( f, 2000);
			}
		}
		f();
	}

	function showError(){

	}

	function completedSequence(){
		console.log("Finished the sequence! Adding 1 to the sequence.")
		if (sequence.length >= 20) {
			console.log("finished the game")
		} else {
			sequence.push(randomize());
		}
	}

	var index = 0;
	$(".simon-button").click(function(event) {
		if (this.id == sequence[index]) {  	//what to do if the button is the same as the sequence
			console.log("Same");
		}else{															//what o do if button is not the same as in the sequence
			console.log("Not the same");
			index = -1;
			showError();     
		}
		if(index < sequence.length - 1){
			index++;
		}else{
			index = 0;
			completedSequence();
		}
	});





	$("#start").click(function(event) {
		//$(this).attr('disabled', 'disabled');
		emulateSequence();
	});


});