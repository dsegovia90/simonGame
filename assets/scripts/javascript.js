$(document).ready(function() {
	
	function randomize(){
		return Math.floor(Math.random() * (4));
	}
	var sequence = [randomize()];

	//sequence = [0,1,2,3,3,2,1,0]; For test purposes.
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
		$("#round").addClass('shake');
		$("#round").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
			$("#round").removeClass('shake');
		});
		setTimeout(emulateSequence, 2000);
	}

	function completedSequence(){
		console.log("Finished the sequence! Adding 1 to the sequence.")
		if (sequence.length >= 20) {
			resetGame();
			console.log("finished the game")
		} else {
			sequence.push(randomize());
			window.setTimeout(emulateSequence, 2000);
			$("#round").text("Round: " + sequence.length).addClass('bounce');
			$("#round").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
				$("#round").removeClass('bounce');
			});
		}
	}

	function resetGame(){
		sequence = [randomize()];
		$("#round").text("Round: " + sequence.length).addClass('flash');
		$("#round").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
				$("#round").removeClass('flash');
			});
	}

	var audios = [new Audio('assets/sounds/simonSound0.mp3'), 
								new Audio('assets/sounds/simonSound1.mp3'), 
								new Audio('assets/sounds/simonSound2.mp3'),
								new Audio('assets/sounds/simonSound3.mp3'),]

	var index = 0;
	$(".simon-button").click(function(event) {
		audios[this.id].play();
		this.blur();
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
		// $(this).attr('disabled', 'disabled');
		emulateSequence();
	});

	$("#reset").click(function(event) {
		resetGame();
	});
});

