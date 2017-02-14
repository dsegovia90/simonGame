$(document).ready(function() {
	
	function randomize(){
		return Math.floor(Math.random() * (4));
	}
	var sequence = [randomize()];

	 //For test purposes.
	console.log(sequence);

	function emulateSequence(){
		console.log(sequence);
		$(".simon-button").attr('disabled', 'disabled');
		var i = 0, howManyTimes = sequence.length;
		function f(){
			audios[sequence[i]].play();
			$("#" + sequence[i]).addClass('active').delay(1000).queue(function(){
				$(this).removeClass('active').dequeue();
			});
			i++;
			if(i < howManyTimes){
				setTimeout( f, 2000);
			}else{
				$(".simon-button").removeAttr('disabled');
			}
		}
		f();
	}

	var strictMode = false;

	function showError(){
		if (strictMode) {
			resetGame();
			setTimeout(emulateSequence, 2000);
		}else{
			$("#round").addClass('shake');
			$("#round").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
				$("#round").removeClass('shake');
			});
			setTimeout(emulateSequence, 2000);
		}
	}

	function completedSequence(){
		if (sequence.length >= 20) {
			resetGame();
			console.log("finished the game")
		} else {
			console.log("Finished the sequence! Adding 1 to the sequence.")
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
		$(".btn-strict").removeAttr('disabled');
	}

	var audios = [new Audio('assets/sounds/simonSound0.mp3'), 
								new Audio('assets/sounds/simonSound1.mp3'), 
								new Audio('assets/sounds/simonSound2.mp3'),
								new Audio('assets/sounds/simonSound3.mp3'),]

	var index = 0;
	$(".simon-button").click(function(event) {
		$(".btn-strict").attr('disabled', 'disabled');
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

	$(".btn-strict").click(function(event) {
		if (this.id === "strict-on") {
			$("#strict-on").addClass('active');
			$("#strict-off").removeClass('active');
			strictMode = true;
			$("#strict-mode-text").html("Strict Mode: On");
		}else{
			$("#strict-off").addClass('active');
			$("#strict-on").removeClass('active');
			strictMode = false;
			$("#strict-mode-text").html("Strict Mode: Off");
		}
	});


	resetGame();
});


