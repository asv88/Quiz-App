// JavaScript Document
$(document).ready(function () {
	$('.multi-choice').submit(function (e) {
		e.preventDefault();
	});
	
	//question array object holds all answers, questions, and explanation
	var questions = [{
		question: "On July 4, 1976, the Modern Israeli Defense Force commandos executed a nighttime raid at the Uganda airport to rescue hostages from Palestinian and German terrorists. Which Biblical military hero rescued his relative using this tactic, which has been taught in military academies across the world?",
		qNum: 0, //array position for this first question in question array
		choices: ["Abraham", "Moses", "Joshua", "David"],
		correctAnswer: 0, //array position in choices property for right answer
		explanation: "Abraham led his troops on a nighttime raid and engaged in hand to hand guerilla warfare in order to rescue his nephew Lot from the kings of Elam, Goiim, Shinar, & Ellasar."	
		},
		{
		question: "In WWI, pilots often had a saying, \"Beware the hun in the sun\". Likewise, ancient military strategist Sun Tzu advised when attacking an opponent, to have the sun behind you as an advantage. Which Biblical military hero used this tactic to attack the city of Gibeon?",
		qNum: 1, //array position for this first question in question array
		choices: ["Jonathan", "David", "Joshua", "Gideon"],
		correctAnswer: 2, //array position in choices property for right answer
		explanation: "Joshua led his troops to victory when he ascended downhill at sunrise to overtake the city of Gibeon, en route to conquering land for the Israelites."
		},
		{
		question: "In WWII, British military officer Wingate was inspired by a Biblical military hero, and created a small, highly-trained force to fight against Mussolini's army in North Africa. Which one did he name this force after?",
		qNum: 2, //array position for this first question in question array
		choices: ["David", "Joshua", "Barak", "Gideon"],
		correctAnswer: 3, //array position in choices property for right answer
		explanation: "Wingate named his elite commandos \"The Gideon Force\", after the time when God hand-picked Gideon's small army to defeat the Midianites."
		},
		{
		question: "In WWII, British General Montgomery intentionally allowed false maps to fall into the hands of the Germans, in order to lure them to a hostile terrain for battle. Likewise, this Biblical military hero permitted information, revealing their position at Mt. Tabor, to leak to their enemy in order to draw them there for battle. Who allowed this to happen?",
		qNum: 3, //array position for this first question in question array
		choices: ["Abraham", "Barak", "David", "Jonathan"],
		correctAnswer: 1, //array position in choices property for right answer
		explanation: "Barak used this tactic to set a trap for Sisera at the bottom of Mt. Tabor. Barak's troops were positioned at the top of the mountain, and Sisera's chariots were no match for the steep incline."
		},
		{
		question: "In 1917, the British army was facing the Turks at Michmash in modern day Israel. A British major recognized the city's name from the Bible and found the same pass used by this Biblical military hero. As a result, the British emerged victorious against the Turks. Which one first used this pass to surprise attack the Philistines?",
		qNum: 4, //array position for this first question in question array
		choices: ["Saul", "David", "Jonathan", "Gideon"],
		correctAnswer: 2, //array position in choices property for right answer
		explanation: "Jonathan and his armor bearer bravely and successfully ambushed the Philistines at Michmash, killing 20 men by secretly finding a pass through the ravine to the city."
		}]
	
	
	var numCorrect = 0;
	//tracks amount of correct answers
	var currentQuestion = 0;
	//tracks array position of questions array in order to access correct answer, question, explanation properties
	var questionNumber = 1;
	//sets the text of the question # in h3 
	
	addQuestionChoices();
	//dynamically places content(question/answers) onto page when first loaded.
	
	$("#directions > a").click(function () {
		//Directions will appear for user on Directions button
			$(".quiz").hide();
			$(".rank-wrap").hide();
			//hides current multi-choice content
			$(".instruct-wrap").fadeIn(700);
			//shows the instructions
	});
	
	$(".new").click(function () {
		//button to get back to multi-choice content
				$(".instruct-wrap").hide();
				$(".score").hide();
				//hides instructions
				$(".quiz").fadeIn(700);
				//multi-choice content shown
				$(".score").fadeIn(700);
	});
	
	///NEW GAME CLICK///
	$("#new-game > a").click(function () {
		//RESETS GLOBAL VARIABLES
		currentQuestion = 0;
		console.log(currentQuestion)
		numCorrect = 0;
		console.log(numCorrect)
		questionNumber = 1;
		console.log(questionNumber)
		$(".feedback, .question").html("");
		//REMOVE FEEDBACK & QUESTION
		$("fieldset").remove();
		//removes current multi-choice	
		$(".multi-choice").find(".btn").show();
		//shows SUBMIT button
		$(".btn").attr("disabled", false);
		//enables submit button
		$("aside.score > .stars_appear").removeClass().addClass("stars");
		//REMOVE STARS		
		addQuestionChoices();
		//adds new question and choices
			
		$(".instruct-wrap, .rank-wrap, .rank").hide();
		$(".multi-choice").find(".btn_next").hide();
		$(".quiz").fadeIn(700);
	});

	//SUBMIT BUTTON CLICK//	
	$(".multi-choice").on("click", ".btn", function () {
		if ($("input[type='radio']").is(":checked")) {
			//IF the radio buttons are checked, THEN run the following code
			evalChoice();
			//evaluates choice
			showRank();
			//shows final score at the end
			currentQuestion++;	
			questionNumber++;
			$(".btn").attr("disabled", true);
			//disables double submission by adding attribute disabled
			
			if(currentQuestion <= 4) {
				//only show button up until the last question
				
				$(".btn_next").show().click(function () {
					//NEXT BUTTON
											
					$(".question").contents().remove();
					//removes current question
					$("fieldset").remove();
					//removes current multi-choice
					
					addQuestionChoices();
					//adds new question and choices
					
					$(".feedback").contents().remove();
					//removes feedback
					$(".btn").attr("disabled", false);
					//removes double submission attribute - RESETS submit button to be able to click again
					$(this).hide();
					//hides NEXT BUTTON
				});
		 	}
		}
	})


	//////////////FUNCTIONS///////////////
	//evaluate choice selection function
	function evalChoice () {
		var selection = $("input[type='radio']:checked").val();
		var defaultText =  $(".rank > p").text("If you'd like a promotion, click NEW GAME below to try again.");
				if(selection == questions[currentQuestion].correctAnswer) {
					numCorrect++;
					console.log(numCorrect);
					//increment number of correct answers, tracks amount of correct answers
					$(".feedback").append("<h3>CORRECT</h3>" + "<p>" + questions[currentQuestion].explanation + "</p>");
					//show feedback positive
					if (numCorrect == 1) {
						$("aside.score > #one").removeClass().addClass("stars_appear");
						 $(".rank > h4").text("You've earned the rank of a BRIGADIER GENERAL!");
						 defaultText;
					}
					else if (numCorrect == 2) {
						$("aside.score > #two").removeClass().addClass("stars_appear"); 
						$(".rank > h4").text("You've earned the rank of a MAJOR GENERAL!");
						defaultText;
					}
					else if (numCorrect == 3) {
						$("aside.score > #three").removeClass().addClass("stars_appear"); 
						$(".rank > h4").text("You've earned the rank of a LIEUTENANT GENERAL!");
						defaultText;
					}
					else if (numCorrect == 4) {
						$("aside.score > #four").removeClass().addClass("stars_appear"); 
						$(".rank > h4").text("You've earned the rank of a GENERAL!");
						defaultText;
					}
					else if (numCorrect == 5) {
						$("aside.score > #five").removeClass().addClass("stars_appear"); 
						$(".rank > h4").text("You've earned the highest rank of a FIVE-STAR GENERAL!");
						$(".rank > p").text("This rank is specially reserved for wartime generals. You're ready to join the ranks of only NINE Americans who have held this title!");
					}
					//Star will appear if correct
				}
				else {
					$(".feedback").append("<h3>INCORRECT</h3>" + "<p>" + questions[currentQuestion].explanation + "</p>");
					//show feedback negative
					if(numCorrect == 0) {
						$(".rank > h4").text("You've created a new rank which prevents you from leading troops into battle.");
						$(".rank > p").text("If you'd like a promotion, click NEW GAME below to try again.")
					}
				}
	}
	
	function showRank () {
		if(currentQuestion == 4) {
			$(".multi-choice").find(".btn").hide();
			$(".rank").show().click(function () {	
				$(".quiz").hide();
				//hides current multi-choice content		
				$(".rank-wrap").fadeIn(700);
			});
		}
	}
	
	function addQuestionChoices (){
		//ADDS NEW QUESTION
		$(".question").html("<h3>Question " + questionNumber  + "</h3>" + "<p>" +questions[currentQuestion].question+"</p>");
		//populates the h3 and p tags under the .question box by accessing the array above
		for (i=3; i>-1; i--){
		//LOOPS through multi-choice questions
		//and ADDS NEW CHOICES
			$('<fieldset><input name="choice" class="choice" id="choice'+[i]+'" type="radio"  value='+[i]+'><label for="choice'+[i]+'"></label><p>' + questions[currentQuestion].choices[i] + '</p></fieldset>').prependTo(".multi-choice > form");
			//multiple choices dynamically created and accessed from question array
		}
	}
////////////////END FUNCTIONS////////////////////

});