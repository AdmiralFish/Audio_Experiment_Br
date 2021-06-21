/************************* 
 * BS Experiment 2 *
 *************************/

import { PsychoJS } from './lib/core-2021.1.2.js';
import * as core from './lib/core-2021.1.2.js';
import { TrialHandler } from './lib/data-2021.1.2.js';
import { Scheduler } from './lib/util-2021.1.2.js';
import * as visual from './lib/visual-2021.1.2.js';
import * as sound from './lib/sound-2021.1.2.js';
import * as util from './lib/util-2021.1.2.js';

// --- Define Some Helper Functions --- 
// Random shuffling function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }}

// --- PsychoJS Code Starts ---
// init psychoJS:
const psychoJS = new PsychoJS({
    debug: true
});

// open window:
psychoJS.openWindow({
    fullscr: true,
    color: new util.Color([0, 0, 0]),
    units: 'norm',
    waitBlanking: true
});

// store info about the experiment session:
var expName = 'MA Experiment 2';
var expInfo = {
    'participant': '',
    'age': '',
    'gender': '',
    'handedness': '',
};

// schedule the experiment:
psychoJS.schedule(psychoJS.gui.DlgFromDict({ 
    dictionary: expInfo,
    title: expName
})); // Open dialog box for expInfo & resource download

// Create flowScheduler 
const flowScheduler = new Scheduler(psychoJS);
const dialogCancelScheduler = new Scheduler(psychoJS);
psychoJS.scheduleCondition(function() { return (psychoJS.gui.dialogComponent.button === 'OK'); }, flowScheduler, dialogCancelScheduler);

/**************** ------------------------------ FLOW SCHEDULER ------------------------------ 
                                          Is run if participant presses OK      *************/                  

flowScheduler.add(updateInfo); // add timeStamp 
flowScheduler.add(experimentInit); // initialize components 

// var introText = 'Thank you for agreeing to take part.\n\nThe session will begin with a practice set to familiarise you with the task. \n\nClick the screen when you are ready to continue.';
// textScreen(introText);

// var instructionText = 'You will see a word flash on your screen, followed by a short and possibly ambiguous audio clip of words being spoken.\n\nAfter, you will be presented with four words.\n\nClick the word you heard most clearly.\n\nYou will only have 4 seconds to respond.\n\nWhen you are ready to practice, click the screen.';
// textScreen(instructionText);

// // prac_trials Loop
// const prac_trialsLoopScheduler = new Scheduler(psychoJS);
// flowScheduler.add(trialsLoopBegin, prac_trialsLoopScheduler, 1, 'prac_trials.csv', 'prac_trials', 0, false);
// flowScheduler.add(prac_trialsLoopScheduler);
// flowScheduler.add(trialsLoopEnd);

var startText = 'The practice trial is now over.\n\nWhen you are ready to begin, click the screen.';
textScreen(startText);

// trial Loop
const trialsLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(trialsLoopBegin, trialsLoopScheduler, 4, 'trials.csv', 'trials', 8);
flowScheduler.add(trialsLoopScheduler)
flowScheduler.add(trialsLoopEnd)

flowScheduler.add(quitPsychoJS, "The experiment is now complete.\nPress 'Ok' to continue.", true);

var endText = 'Thank you for your time.\n\nThe experiment is now complete.\n\nPlease wait for results to finish uploading before closing the window.'
textScreen(endText);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, '', false);

// -- RESOURCES --
let resources = [
    {'name': './resources/speaker_icon.png', 'path': './resources/speaker_icon.png'},
    {'name': 'prac_trials.csv', 'path': './resources/prac_trials.csv'},// FOR TESTING
    {'name': 'trials.csv', 'path': './resources/trials.csv'},
    {'name': 'catchTrials.csv', 'path': './resources/catchTrials.csv'},
    {'name': 'foils.csv', 'path': './resources/foils.csv'},
// for local debugging
{'name': "resources/sound/prac_trials/practice_cue0.mp3", 'path': "./resources/sound/prac_trials/practice_cue0.mp3"},
{'name': "resources/sound/prac_trials/practice_cue_human1.mp3", 'path': "./resources/sound/prac_trials/practice_cue_human1.mp3"},
{'name': "resources/sound/prac_trials/practice_cue2.mp3", 'path': "./resources/sound/prac_trials/practice_cue2.mp3"},
{'name': "resources/sound/prac_trials/practice_cue_human3.mp3", 'path': "./resources/sound/prac_trials/practice_cue_human3.mp3"},
{'name': "resources/sound/prac_trials/practice_cue4.mp3", 'path': "./resources/sound/prac_trials/practice_cue4.mp3"},
{'name': "resources/sound/prac_trials/practice_cue_human5.mp3", 'path': "./resources/sound/prac_trials/practice_cue_human5.mp3"},
{'name': "resources/sound/prac_trials/practice_cue6.mp3", 'path': "./resources/sound/prac_trials/practice_cue6.mp3"},
{'name': "resources/sound/prac_trials/practice_cue_human7.mp3", 'path': "./resources/sound/prac_trials/practice_cue_human7.mp3"},
{'name': "resources/sound/prac_trials/practice_cue8.mp3", 'path': "./resources/sound/prac_trials/practice_cue8.mp3"},
{'name': "resources/sound/prac_trials/practice_cue_human9.mp3", 'path': "./resources/sound/prac_trials/practice_cue_human9.mp3"},
{'name': "resources/sound/prac_trials/practice_cue10.mp3", 'path': "./resources/sound/prac_trials/practice_cue10.mp3"},
{'name': "resources/sound/prac_trials/practice_cue_human11.mp3", 'path': "./resources/sound/prac_trials/practice_cue_human11.mp3"},
{'name': "resources/sound/trials/audio_stim_comp69.mp3", 'path': "./resources/sound/trials/audio_stim_comp69.mp3"},
{'name': "resources/sound/trials/audio_stim_comp6.mp3", 'path': "./resources/sound/trials/audio_stim_comp6.mp3"},
{'name': "resources/sound/trials/audio_stim_comp40.mp3", 'path': "./resources/sound/trials/audio_stim_comp40.mp3"},
{'name': "resources/sound/trials/audio_stim_comp12.mp3", 'path': "./resources/sound/trials/audio_stim_comp12.mp3"},
{'name': "resources/sound/trials/audio_stim_comp65.mp3", 'path': "./resources/sound/trials/audio_stim_comp65.mp3"},
{'name': "resources/sound/trials/audio_stim_comp57.mp3", 'path': "./resources/sound/trials/audio_stim_comp57.mp3"},
{'name': "resources/sound/trials/audio_stim_comp17.mp3", 'path': "./resources/sound/trials/audio_stim_comp17.mp3"},
{'name': "resources/sound/trials/audio_stim_comp1.mp3", 'path': "./resources/sound/trials/audio_stim_comp1.mp3"},
{'name': "resources/sound/trials/audio_stim_human35.mp3", 'path': "./resources/sound/trials/audio_stim_human35.mp3"},
{'name': "resources/sound/trials/audio_stim_human42.mp3", 'path': "./resources/sound/trials/audio_stim_human42.mp3"},
{'name': "resources/sound/trials/audio_stim_human67.mp3", 'path': "./resources/sound/trials/audio_stim_human67.mp3"},
{'name': "resources/sound/trials/audio_stim_human47.mp3", 'path': "./resources/sound/trials/audio_stim_human47.mp3"},
{'name': "resources/sound/trials/audio_stim_human0.mp3", 'path': "./resources/sound/trials/audio_stim_human0.mp3"},
{'name': "resources/sound/trials/audio_stim_human6.mp3", 'path': "./resources/sound/trials/audio_stim_human6.mp3"},
{'name': "resources/sound/trials/audio_stim_human50.mp3", 'path': "./resources/sound/trials/audio_stim_human50.mp3"},
{'name': "resources/sound/trials/audio_stim_human64.mp3", 'path': "./resources/sound/trials/audio_stim_human64.mp3"},
{'name': "resources/sound/catchTrials/audio_control_comp_project00.mp3", 'path': "./resources/sound/catchTrials/audio_control_comp_project00.mp3"},
{'name': "resources/sound/catchTrials/audio_control_comp_project14.mp3", 'path': "./resources/sound/catchTrials/audio_control_comp_project14.mp3"},
{'name': "resources/sound/catchTrials/audio_control_comp_project04.mp3", 'path': "./resources/sound/catchTrials/audio_control_comp_project04.mp3"},
{'name': "resources/sound/catchTrials/audio_control_comp_project07.mp3", 'path': "./resources/sound/catchTrials/audio_control_comp_project07.mp3"},
{'name': "resources/sound/catchTrials/audio_control_comp_project12.mp3", 'path': "./resources/sound/catchTrials/audio_control_comp_project12.mp3"},
{'name': "resources/sound/catchTrials/audio_control_comp_project18.mp3", 'path': "./resources/sound/catchTrials/audio_control_comp_project18.mp3"},
{'name': "resources/sound/catchTrials/audio_control_comp_project06.mp3", 'path': "./resources/sound/catchTrials/audio_control_comp_project06.mp3"},
{'name': "resources/sound/catchTrials/audio_control_comp_project08.mp3", 'path': "./resources/sound/catchTrials/audio_control_comp_project08.mp3"},
{'name': "resources/sound/catchTrials/audio_control_human_project12.mp3", 'path': "./resources/sound/catchTrials/audio_control_human_project12.mp3"},
{'name': "resources/sound/catchTrials/audio_control_human_project01.mp3", 'path': "./resources/sound/catchTrials/audio_control_human_project01.mp3"},
{'name': "resources/sound/catchTrials/audio_control_human_project14.mp3", 'path': "./resources/sound/catchTrials/audio_control_human_project14.mp3"},
{'name': "resources/sound/catchTrials/audio_control_human_project04.mp3", 'path': "./resources/sound/catchTrials/audio_control_human_project04.mp3"},
{'name': "resources/sound/catchTrials/audio_control_human_project07.mp3", 'path': "./resources/sound/catchTrials/audio_control_human_project07.mp3"},
{'name': "resources/sound/catchTrials/audio_control_human_project02.mp3", 'path': "./resources/sound/catchTrials/audio_control_human_project02.mp3"},
{'name': "resources/sound/catchTrials/audio_control_human_project06.mp3", 'path': "./resources/sound/catchTrials/audio_control_human_project06.mp3"},
{'name': "resources/sound/catchTrials/audio_control_human_project09.mp3", 'path': "./resources/sound/catchTrials/audio_control_human_project09.mp3"}
] 

function resourceUpdater (csv_path) {
    Papa.parse(csv_path,{
        download: true,
        skipEmptyLines: true,
        complete: function(results) {
            var csv = results.data;
            for (let i = 1; i < csv.length; i++) {
                // resources.push({'name': csv[i][3], 'path': csv[i][3]});
                resources.push({'name': csv[i][3], 'path': './' + csv[i][3]})
            }}})}

resourceUpdater('./resources/prac_trials.csv')
resourceUpdater('./resources/trials.csv')
resourceUpdater('./resources/catchTrials.csv')

// START
psychoJS.start({
    expName: expName,
    expInfo: expInfo,
    resources: resources
});

// Set Logger
psychoJS.experimentLogger.setLevel(core.Logger.ServerLevel.EXP);

// Set Redirect URLs
// psychoJS.setRedirectUrls('completionUrl', 'cancellationURL')

// MetaInfo Update
var frameDur;
function updateInfo() {
    expInfo['date'] = util.MonotonicClock.getDateStr();  // add a simple timestamp
    expInfo['expName'] = expName;
    expInfo['psychopyVersion'] = '2021.1.2';
    expInfo['OS'] = window.navigator.platform;

    // store frame rate of monitor if we can measure it successfully 
    expInfo['frameRate'] = psychoJS.window.getActualFrameRate();
    if (typeof expInfo['frameRate'] !== 'undefined') {
        frameDur = 1.0 / Math.round(expInfo['frameRate']);
    } else {
        frameDur = 1.0 / 60.0; // couldn't get a reliable measure so guess 
    } 
    // add info from the URL:
    util.addInfoFromUrl(expInfo);

    return Scheduler.Event.NEXT;
}

// -- Helper -> Returns a text stim object
var height, colour;
function textObj (name, text='', height=0.1, colour='white') {
    return {
        win: psychoJS.window,
        name: name,
        text: text,
        font: 'Open Sans',
        units: undefined, 
        pos: [0, 0], height: height,  wrapWidth: undefined, ori: 0.0,
        color: new util.Color(colour),  opacity: undefined,
        depth: 0.0 
    };
};

// Initialize Variables for each component
var globalClock, routineTimer, t, frameN, continueRoutine, gotValidClick, prevButtonState, _mouseButtons // init Global Components
var text, textDisplayClock, textDisplayText, textDisplayInput; // init textDisplay Components
var trialClock, primer, cue_stim, speaker_icon, merged_audio, response_1, response_2, response_3, response_4, response, no_resp // init trial Components
var locations = [[(- 0.5), 0.5], [0.5, 0.5], [(- 0.5), (- 0.5)], [0.5, (- 0.5)]];
var cueTargets = [1,2,3,4]; // 1=SV, 2=LV, 3=SF, 4=LF
var cueList = []

// Create Randomised Foil List
var foilList1, foilList2, foils1, foils2;
foilList1 = foilList2 = foils1 = foils2 = []

Papa.parse('./resources/foils.csv',{ // Populate Foil Lists from CSV
    download: true,
    skipEmptyLines: true,
    complete: function(results){
        var csv = results.data;
        for (let i = 1; i < csv.length; i++){
            foils1.push(csv[i][0]);
            foils2.push(csv[i][1]);
        }}})

function getFoil (foilList) {
    if (foilList.length === 0){    
        foilsList1 = foils1.slice()
        foilsList2 = foils2.slice()             

        shuffleArray(foilList1); // Randomise Foil Order
        shuffleArray(foilList2);
    }
    return foilList.pop()
    }

// Initialize components for each Routine
function experimentInit() { 
    // "textDisplay" Routine Components
    textDisplayClock = new util.Clock();
    textDisplayText = new visual.TextStim(textObj("textDisplayText"));
    textDisplayInput = new core.Mouse({
      win: psychoJS.window,
    });
    textDisplayInput.mouseClock = new util.Clock();

    // "trial" Routine Components
    trialClock = new util.Clock();
    primer = new visual.TextStim(textObj("primer", text='X'));
    cue_stim = new visual.TextStim(textObj("cue_stim", text='X'));
    speaker_icon = new visual.ImageStim({
        win: psychoJS.window,
        name: 'speaker_icon', units: undefined,
        image: './resources/speaker_icon.png', mask: undefined,
        ori : 0.0, pos : [0, 0], size : [0.5, 0.5],
        color : new util.Color([1, 1, 1]), opacity : undefined,
        flipHoriz: false, flipVert: false,
        texRes: 128.0, interpolate: true, depth: -2.0
    });

    merged_audio = new sound.Sound({
        win: psychoJS.window,
        value: 'A',
        secs: (-1),
    });
    merged_audio.setVolume(1.0);

    response_1 = new visual.TextStim(textObj("response_1"))
    response_2 = new visual.TextStim(textObj("response_2"))
    response_3 = new visual.TextStim(textObj("response_3"))
    response_4 = new visual.TextStim(textObj("response_4"))

    response = new core.Mouse({
        win: psychoJS.window,
    });
    response.mouseClock = new util.Clock();
    
    no_resp = new visual.TextStim(textObj('no_resp', text='X', height=0.4, colour='red'))

    // Create timers
    globalClock = new util.Clock(); // to track the time since experiment started
    routineTimer = new util.CountdownTimer(); // to track time remaining of each (non-slip) routine

    return Scheduler.Event.NEXT;
}

// ----- Routine Functions -----
// -- Helper -> Updates a drawable Stimulus for each frame
var frameRemains;
function drawStimUpdater (object, startTime, duration=false) {
    if (t >= startTime && object.status === PsychoJS.Status.NOT_STARTED) {
        // keep track of start time/frame for later
        object.tStart = t;  // (not accounting for frame time here)
        object.frameNStart = frameN;  // exact frame index
        object.setAutoDraw(true);
      }
    
    if (duration) {
        frameRemains = startTime + duration - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
        if (object.status === PsychoJS.Status.STARTED && t >= frameRemains) {
            object.setAutoDraw(false);
        }
    }
}; 

// --- textDisplay function ---
var textDisplayComponents; 
function textDisplayRoutineBegin(message, snapshot) {
    return function () {
        // --- Prepare to start Routine 'textDisplay' --- 
        t = 0;
        textDisplayClock.reset(); 
        frameN = -1;
        continueRoutine = true; // until told otherwise

        // update component params for each repeat
        textDisplayText.text = message;
        gotValidClick = false; // until a click is received
        textDisplayComponents = [];
        textDisplayComponents.push(textDisplayText)
        textDisplayComponents.push(textDisplayInput)

        for (const thisComponent of textDisplayComponents) {
            if ('status' in thisComponent) {
                thisComponent.status = PsychoJS.Status.NOT_STARTED;
            }
        }
        return Scheduler.Event.NEXT;
    }
}

function textDisplayRoutineEachFrame(snapshot) {
    return function () {
        // --- Loop for each frame of Routine 'textDisplay' ---
        t = textDisplayClock.getTime();   
        frameN = frameN + 1; // number of completed frames (so 0 is the first frame)

        // > update/draw components on each frame <
        drawStimUpdater(textDisplayText, 0.0) // *textDisplayText* updates

        // *textDisplayInput* updates
        if (t >= 2.0 && textDisplayInput.status === PsychoJS.Status.NOT_STARTED) {
            // keep track of start time/frame for later
            textDisplayInput.tStart = t;  // (not accounting for frame time here)
            textDisplayInput.frameNStart = frameN;  // exact frame index
        
            textDisplayInput.status = PsychoJS.Status.STARTED;
            textDisplayInput.mouseClock.reset();
            prevButtonState = textDisplayInput.getPressed();  // if button is down already this ISN'T a new click
        }

        if (textDisplayInput.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
            _mouseButtons = textDisplayInput.getPressed();
            if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
                prevButtonState = _mouseButtons;
                if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
                // abort routine on response
                continueRoutine = false;
                }
            }
        }

        // check for quit (typically the Esc key)
        if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
            return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
        }
      
        // check if the Routine should terminate
        if (!continueRoutine) {  // a component has requested a forced-end of Routine
            return Scheduler.Event.NEXT;
        }
      
        continueRoutine = false;  // reverts to True if at least one component still running
        for (const thisComponent of textDisplayComponents)
            if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {   
                continueRoutine = true;
                break;
            }
      
        // refresh the screen if continuing
        if (continueRoutine) {
            return Scheduler.Event.FLIP_REPEAT;
        } else {
            return Scheduler.Event.NEXT;
        }
    };
}

function textDisplayRoutineEnd(snapshot) {
    return function () {
        //------Ending Routine 'textDisplay'-------
        for (const thisComponent of textDisplayComponents) {
            if (typeof thisComponent.setAutoDraw === 'function') {
                thisComponent.setAutoDraw(false);
            }
        }
        // store data for thisExp (ExperimentHandler)
        // the Routine "textDisplay" was not non-slip safe, so reset the non-slip timer
        routineTimer.reset();
      
        return Scheduler.Event.NEXT;
    };
};

// Helper --> Bundles above 3 functions - add a text screen with given message to scheduler
function textScreen(message, scheduler=flowScheduler) {
    scheduler.add(textDisplayRoutineBegin(message))
    scheduler.add(textDisplayRoutineEachFrame())
    scheduler.add(textDisplayRoutineEnd())
}

// --- prac_trials loop ---
var trials, catchTrials;
var currentLoop;
function trialsLoopBegin(trialsLoopScheduler, nReps, trialList, name, breaks, catchTrialsOn = true) {
    trials = new TrialHandler({
        psychoJS: psychoJS,
        nReps: nReps, method: TrialHandler.Method.RANDOM,
        extraInfo: expInfo, originPath: undefined,
        trialList: trialList,
        seed: undefined, name: name
    });

    if (catchTrialsOn) {
        catchTrials = new TrialHandler({
            psychoJS: psychoJS,
            nReps: 1, method: TrialHandler.Method.RANDOM,
            extraInfo: expInfo, originPath: undefined,
            trialList: 'catchTrials.csv',
            seed: undefined, name: 'catchTrials'
        })
    }
    
    psychoJS.experiment.addLoop(trials); // add the loop to the experiment 
    currentLoop = trials; // we're now on the current loop

    breaks = breaks; // Needs to be one more than desired amount of breaks
    cueList = [];
    var catchTrialIndex = [3, 7, 11, 15, 19, 23, 27, 31]; // change to blank if random catch trials
    var catchIndex = 0;
    var tempIndex;
    // function randomCatchTrialIndex () {
        while (catchTrialIndex.length < 2) {
            tempIndex = Math.floor(Math.random() * (trials.nTotal / trials.nReps));
            if (!(tempIndex in catchTrialIndex)) {
                catchTrialIndex.push(tempIndex)
            } } 
        // }

    let catchTrialsFunctionHolder = [];
    for (const this_trial of catchTrials){
        snapshot = catchTrials.getSnapshot();
        catchTrialsFunctionHolder.push(snapshot)
    }
    shuffleArray(catchTrialsFunctionHolder);

    var snapshot;
    // Schedule all the trials in the trialList
    for (const this_trial of trials) {
        shuffleArray(cueTargets)
        cueList.push(cueTargets.slice()) //

        // add catchTrials
        if (catchTrialsOn && catchTrialIndex.includes(trials.thisTrialN)) {
            snapshot = catchTrialsFunctionHolder[catchIndex];
            trialsLoopScheduler.add(importConditions(snapshot));
            trialsLoopScheduler.add(trialRoutineBegin(snapshot));
            trialsLoopScheduler.add(trialRoutineEachFrame(snapshot));
            trialsLoopScheduler.add(trialRoutineEnd(snapshot));
            trialsLoopScheduler.add(endLoopIteration(trialsLoopScheduler, snapshot))
            catchIndex += 1;
        }

        // add trials
        snapshot = trials.getSnapshot();
        trialsLoopScheduler.add(importConditions(snapshot));
        trialsLoopScheduler.add(trialRoutineBegin(snapshot));
        trialsLoopScheduler.add(trialRoutineEachFrame(snapshot));
        trialsLoopScheduler.add(trialRoutineEnd(snapshot));

        // add break routines
        if ((trials.thisN !== 0) && trials.thisN % (trials.nTotal / breaks) === 0) {
            let restMessage = `Take a break.\n\nPress here when you are ready to begin.\n\n\nYou have completed ${Math.round((trials.thisN) / (trials.nTotal)  * 100)} %`
            textScreen(restMessage, trialsLoopScheduler)
        }

        trialsLoopScheduler.add(endLoopIteration(trialsLoopScheduler, snapshot));
    }

    return Scheduler.Event.NEXT;
}

function trialsLoopEnd() {
    psychoJS.experiment.removeLoop(trials);

    return Scheduler.Event.NEXT;
}

// --- trial functions --- 
var trialComponents, cueTarget;
// var word_1, word_2, cue, path;
function trialRoutineBegin (snapshot) { // Prepare to start 'trial' routine
    return function () {
        t = 0;
        trialClock.reset(); 
        frameN = -1;
        continueRoutine = true; // until instructed otherwise

        // update parameter for each repeat
        shuffleArray(locations); // Randomise location of responses 
        response_1.setPos(locations[0]);
        response_2.setPos(locations[1]);
        response_3.setPos(locations[2]);
        response_4.setPos(locations[3]);

        response_1.setText(word_1); // Set correct choice 1 & 2
        response_2.setText(word_2);
        response_3.setText(getFoil(foilList1)); // Set 2 random foils
        response_4.setText(getFoil(foilList2));

        merged_audio = new sound.Sound({ // Set path of audio clip
            win: psychoJS.window,
            value: file_path,
            secs: -1
        });
        merged_audio.setVolume(1.0)
        
        if (snapshot.name === 'trials') { // Set cue text - 1 of 4, randomized, no-repeats
            cueTarget = cueList[snapshot.thisIndex][snapshot.thisRepN]
            } else {
                cueTarget = ''
            }
        
        switch (cueTarget) { // Change text of cue 
            case 1: //'shortValid'
                cue_stim.setText(response_1.text);
                break;
            case 2://'longValid'
                cue_stim.setText(response_2.text);
                break;
            case 3://'shortFoil'
                cue_stim.setText(response_3.text);
                break;
            case 4: //'longFoil'
                cue_stim.setText(response_4.text);
                break;
            default:
                cue_stim.setText("XXXXXX")
        }

        // setup lists for storing info about response
        response.x = [];
        response.y = [];
        response.time = [];
        response.clicked_name = [];
        gotValidClick = false; // until a click is received

        // keep track of which components have finished
        trialComponents = [];
        trialComponents.push(primer);
        trialComponents.push(cue_stim)
        trialComponents.push(speaker_icon);
        trialComponents.push(merged_audio);
        trialComponents.push(response_1);
        trialComponents.push(response_2);
        trialComponents.push(response_3);
        trialComponents.push(response_4);
        trialComponents.push(response);
        trialComponents.push(no_resp);

        for (const thisComponent of trialComponents) {
            if ('status' in thisComponent) {
                thisComponent.status = PsychoJS.Status.NOT_STARTED;
            }}
        return Scheduler.Event.NEXT;
    }};

var _mouseXYs, cueTime, primerTime;
function trialRoutineEachFrame (snapshot) {
    return function () {
        // --- Loop for each frame of Routine 'trial' ---
        t = trialClock.getTime();   
        frameN = frameN + 1 // number of completed frames (so 0 is the first frame)
        
        // update/draw components on each frame
        primerTime = 2.0 + Math.random()
        if (cue === 'short'){
            cueTime = 0.2
        } else {
            cueTime = 1.2
        }

        // Start Displaying Components 
        drawStimUpdater(primer, 0.0, primerTime) // *primer* updates
        drawStimUpdater(cue_stim, primer.tStart + primerTime, cueTime)
        drawStimUpdater(speaker_icon, cue_stim.tStart + cueTime, 3.0) // *speaker_icon** updates
        
        // play audio while speaker is shown
        if (t >= (cue_stim.tStart + cueTime) && cue_stim.status === PsychoJS.Status.FINISHED && merged_audio.status === PsychoJS.Status.NOT_STARTED) {
            merged_audio.tStart = t;
            merged_audio.frameNStart = frameN; // exact frame index

            merged_audio.play(); // sound finishes automatically
            merged_audio.status = PsychoJS.Status.STARTED;
        }
        if (t >= (merged_audio.getDuration() + merged_audio.tStart) && merged_audio.status === PsychoJS.Status.STARTED) {
            merged_audio.stop(); // stop sound if longer than duration
            merged_audio.status = PsychoJS.Status.FINISHED;
        }

        drawStimUpdater(response_1, speaker_icon.tStart + 3, 4.0) // Show Response Options
        drawStimUpdater(response_2, speaker_icon.tStart + 3, 4.0)
        drawStimUpdater(response_3, speaker_icon.tStart + 3, 4.0)
        drawStimUpdater(response_4, speaker_icon.tStart + 3, 4.0)

        // Allow for & Monitor Clicked Response
        if (t >= speaker_icon.tStart + 3 && response.status === PsychoJS.Status.NOT_STARTED) {
            response.tStart = t;
            response.frameNStart = frameN;

            response.status = PsychoJS.Status.STARTED;
            response.mouseClock.reset();
            prevButtonState = response.getPressed(); // if button is down already this ISN'T a new click
        }
        
        frameRemains = (speaker_icon.tStart + 3.0) + 4.0 - psychoJS.window.monitorFramePeriod * 0.75; 
        if (response.status === PsychoJS.Status.STARTED && t >= frameRemains) {
            response.status = PsychoJS.Status.FINISHED;
        }

        if (response.status === PsychoJS.Status.STARTED) { // only update if started and not finished
            _mouseButtons = response.getPressed();
            if (!_mouseButtons.every((e,i) => (e == prevButtonState[i]))) { // button state change?
                prevButtonState = _mouseButtons;
                if (_mouseButtons.reduce((e, acc) => (e+acc)) > 0) { // state changed to a new click
                    _mouseXYs = response.getPos();
                    response.time.push(response.mouseClock.getTime());
                    // check if the mouse was a valid click
                    gotValidClick = false;
                    for (const obj of [response_1, response_2, response_3, response_4]) {
                        if (obj.contains(response)) {
                            gotValidClick = true;
                            response.clicked_name.push(obj.name)
                        }
                    }
                    if (gotValidClick === true) { // abort routine on response
                        continueRoutine = false;
                    }
                }
            } 
        }
        // if no response - display *no_resp* cross
        drawStimUpdater(no_resp, response_1.tStart + 4.0, 0.5)

        // check for quit (typically the Esc key)
        if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
            return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
        }
      
        // check if the Routine should terminate
        if (!continueRoutine) {  // a component has requested a forced-end of Routine
            return Scheduler.Event.NEXT;
        }
      
        continueRoutine = false;  // reverts to True if at least one component still running
        for (const thisComponent of trialComponents) {
            if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
                continueRoutine = true;
                break;
            }}
      
        // refresh the screen if continuing
        if (continueRoutine) {
            return Scheduler.Event.FLIP_REPEAT;
        } else {
            return Scheduler.Event.NEXT;
        }
    }
};

function trialRoutineEnd(snapshot) {
    return function () { // Ending Routine 'trial
        for (const thisComponent of trialComponents) {
            if (typeof thisComponent.setAutoDraw === 'function') {
                thisComponent.setAutoDraw(false);
            }
        }
        merged_audio.stop(); // ensure sound has stopped at end of routine
        
        // -- Store Data --
        if (response.time) {psychoJS.experiment.addData('response.time', response.time[0])};
        if (response.clicked_name) {psychoJS.experiment.addData('response', response.clicked_name[0])};
        psychoJS.experiment.addData('cueTarget', cueTarget);
        psychoJS.experiment.addData('rand_foil_1', response_3.text);
        psychoJS.experiment.addData('rand_foil_2', response_4.text);

        // the Routine "trial" was not non-slip safe, so reset the non-slip timer
        routineTimer.reset();

        return Scheduler.Event.NEXT;
    };
}                

// Loop Logic Functions 
function endLoopIteration(scheduler, snapshot) {
    // --- Prepare for next entry ---
    return function () {
        if (typeof snapshot !== 'undefined') {
            // --- check if user ended loop early ---
            if (snapshot.finished) {
                // Check for and save orphaned data
                if (psychoJS.experiment.isEntryEmpty()) {
                    psychoJS.experiment.nextEntry(snapshot);
                }
                scheduler.stop();
            } else {
                const thisTrial = snapshot.getCurrentTrial();
                if (typeof thisTrial === 'undefined' || !('isTrials' in thisTrial) || thisTrial.isTrials) {
                    psychoJS.experiment.nextEntry(snapshot);
                }
            }
        return Scheduler.Event.NEXT;
        }
    };
}

function importConditions(currentLoop) {
    return function () {
        psychoJS.importAttributes(currentLoop.getCurrentTrial());
        return Scheduler.Event.NEXT;
    };   
}

// Exit Function
function quitPsychoJS(message, isCompleted) {
    // Check for and save orphaned data
    if (psychoJS.experiment.isEntryEmpty()) {
        psychoJS.experiment.nextEntry();
    }

    psychoJS.window.close();
    psychoJS.quit({message: message, isCompleted: isCompleted});

    return Scheduler.Event.QUIT;
}