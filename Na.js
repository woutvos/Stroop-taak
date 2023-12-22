/* INITIALISEER experiment */
var jsPsych = initJsPsych();
var timeline = [];

//////////////////////////////////////////////////////
//                    WELKOM                        //
//////////////////////////////////////////////////////
timeline.push({
    type: jsPsychFullscreen,
    fullscreen_mode: true,
    message: "<b>Welkom</b>" + "<br>" + "Uw scherm zal overschakelen naar volledig scherm." + "<br>" + "Klik op 'Volgende' om te beginnen." + "<br>" + "<br>",
    button_label: "Volgende"
});

timeline.push({
    /* Voor configuratie opties zie: https://www.jspsych.org/7.3/plugins/instructions/ */
    type: jsPsychInstructions,
    pages: [
    "<b>Instructies</b>" + "<br>" +  "<em>Het is als eerst belangrijk dat u de instructies al heeft gelezen, zodat u snapt hoe u correct mee doet.</em>" + "<br>" + "<br>" + "U zult zo eerst een persoonlijke code aan moeten maken en een aantal vragen over de omstandigheden beantwoorden. Hierna krijgt u de uitleg over de Stroop-taak en volgt de taak zelf."],
    button_label_next: "Volgende",
    button_label_previous: "Vorige",
    show_clickable_nav: true
})

//////////////////////////////////////////////////////
//                  IDENTIFIER                      //
//////////////////////////////////////////////////////
timeline.push({
    /* Voor configuratie opties zie: https://www.jspsych.org/7.3/plugins/survey-text/ */
    type: jsPsychSurveyText,
    questions: [
        {prompt:
            "Uw persoonlijke code is: lievelingsdier+geboortejaar" +
            "<br>" + 
            "<b> Let op! </b> Gebruik de code die u eerder heeft gebruikt!",
            name: "persoonlijke_code",
            required: true
        }
    ],
    button_label: "Volgende",
})

//////////////////////////////////////////////////////
//               VRAGEN ACHTERAF                    //
//////////////////////////////////////////////////////
timeline.push({
    /* Voor configuratie opties zie: https://www.jspsych.org/7.3/plugins/survey-likert/ */
    type: jsPsychSurveyLikert,
    questions: [
        {
            prompt: "Hoe actief bent u geweest gedurende uw nachtdienst?", 
            labels: ["weinig actief", "1", "2", "3", "4", "actief", "6", "7", "8", "9", "hyperactief"],
            required: true,
            name: "activiteit"
        }
    ],
    button_label: "Volgende"
})

timeline.push({
    /* Voor configuratie opties zie: https://www.jspsych.org/7.3/plugins/survey-likert/ */
    type: jsPsychSurveyLikert,
    questions: [
        {
            prompt: "Hoeveel druk heeft u ervaren gedurende uw nachtdienst?", 
            labels: ["geen druk", "1", "2", "3", "4", "5", "6", "7", "8", "9", "veel druk"],
            required: true,
            name: "druk"
        }
    ],
    button_label: "Volgende"
})

timeline.push({
    /* Voor configuratie opties zie: https://www.jspsych.org/7.3/plugins/survey-text/ */
    type: jsPsychSurveyText,
    questions: [
        {prompt: "Zijn er gebeurtenissen geweest tijdens uw nachtdienst die indruk hebben gemaakt?", name: 'indrukken', rows: 10},
    ],
    button_label: "Volgende"
})

timeline.push({
    /* Voor configuratie opties zie: https://www.jspsych.org/7.3/plugins/survey-multi-select/ */
    type: jsPsychSurveyMultiSelect,
    questions: [
        {
            prompt: "Heeft u koffie, energy drink, of andere stimulerende middelen op tijdens uw dienst?", 
            options: ["Koffie", "Thee", "Energy Drink", "Anders", "Geen"], 
            horizontal: false,
            required: true,
            name: 'stimulerende_middelen'
        }], 
    button_label: "Volgende",
})

//////////////////////////////////////////////////////
//                  STROOP TAAK                     //
//////////////////////////////////////////////////////
/* Aangepast van: https://www.cognition.run/how-to-develop-a-stroop-effect-experiment-using-jspsych */

// PARAMETERS
var colours = ['red', 'green', 'blue'];
var stimuli = ["rood", "groen", "blauw"]
var n_trials = 20;

/* Congruent: De betekenis van het woord en de kleur komen overeen */
// returns a JavaScript object with { text: ...., colour: .... }
// using a random colour (text is the same as colour)
function congruent() {
    // pick a colour (by index)
    // (when we're only picking one, with/without replacement doesn't matter)
    var color_index = jsPsych.randomization.sampleWithReplacement([0, 1, 2], 1)
  
    // this returns a list with one item, so we select the first (only) item
    return { text: stimuli[color_index],
    colour: colours[color_index],
    condition: 'congruent' };
}

// returns a JavaScript object with { text: ...., colour: .... }
// using a random colour (text is different to colour)
function incongruent() {
    // pick two colours without replacement (i.e. they will be different)
    var color_indeces = jsPsych.randomization.sampleWithoutReplacement([0, 1, 2], 2);
    // this returns a list with two item, we select these out
    return { text: stimuli[color_indeces[0]], 
    colour: colours[color_indeces[1]], 
    condition: 'incongruent' };
}

// these are in HTML, so <br> means "line break"
timeline.push({
    type: jsPsychInstructions,
    pages: [
        "U gaat nu een Stroop-taak uitvoeren.",
        "U ziet dadelijk één van de woorden: 'ROOD', 'BLAUW', of 'GROEN'" + "<br>" + "Deze woorden kunnen in de kleur <b><span style='color:red'>rood</span></b>, <b><span style='color:blue'>blauw</span></b>, of <b><span style='color:green'>groen</span></b> verschijnen.",
        "Zodra u een woord ziet klikt u op de knop die overeenkomt met <b> de kleur </b> van het woord. <strong>Dus niet het woord zelf!</strong> Zie voorbeelden op de volgende pagina",
        "Bij <p style='font-size:20px;color:blue'> 'ROOD' </p> zou u dus op de knop 'blauw' klikken, omdat u de kleur blauw ziet." +
        "<br>" + "<br>" +
        "Bij <p style='font-size:20px;color:blue'> 'GROEN' </p> zou u dus op de knop 'blauw' klikken, omdat u de kleur blauw ziet." +
        "<br>" + "<br>" +
        "Bij <p style='font-size:20px;color:green'> 'ROOD' </p> zou u dus op de knop 'groen' klikken, omdat u de kleur groen ziet.",
        "Probeer zo snel mogelijk te antwoorden!" +
        "<br>" +
        "Als u op 'Start' klikt dan begint de Stroop-taak",
    ],
    button_label_next: "Start",
    button_label_previous: "Vorige",
    show_clickable_nav: true
})

/* Zorgt voor een kleine tussentijdse pauze */
var fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<p style="font-size:60px">+</p>',
    trial_duration: 500,
    response_ends_trial: false
};

// blank (ITI stands for "inter trial interval")
var iti = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '',
    trial_duration: 250,
    response_ends_trial: false
}

// repeat this code n_trials times
for (var i=0; i<n_trials; i++) {
    var values;
    // Math.random returns a random number between 0 and 1. Use this to decide
    // whether the current trial is congruent or incongruent.
    if (Math.random() < 0.5) {
        values = congruent();
    } else {
        values = incongruent();
    }
    var trial = {
        type: jsPsychHtmlButtonResponse,
        stimulus: '<p style="font-size:60px;color: '+values.colour+'">'+values.text+'</p>',
        choices: ['Rood','Groen','Blauw'],
        data: values
    };
    timeline.push(iti);
    timeline.push(fixation);
    timeline.push(trial);
}

//////////////////////////////////////////////////////
//                  EIND BOODSCHAP                  //
//////////////////////////////////////////////////////
timeline.push({
    type: jsPsychFullscreen,
    fullscreen_mode: false,
});

timeline.push({
    type: jsPsychInstructions,
    pages: [
        "Heel erg bedankt voor uw deelname aan dit onderzoek! :)" +
        "<br>" +
        "U kunt dit venster sluiten, uw gegevens zijn opgeslagen."
    ],
})

//////////////////////////////////////////////////////
//                  START EXPERIMENT                //
//////////////////////////////////////////////////////

/* START het experiment */
jsPsych.run(timeline);