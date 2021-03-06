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
import './lib/HeadphoneCheck_Test/headphonesCheck.js'

// --- Define Some Helper Functions --- 

/**
 * Shuffles the order of a given array in place.
 * 
 * @param {array} array - The array to be shuffled. 
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// --- PsychoJS Code Starts ---
const psychoJS = new PsychoJS({
    debug: true
});

// open window
psychoJS.openWindow({
    fullscr: true,
    color: new util.Color([0, 0, 0]),
    units: 'norm',
    waitBlanking: true
});

var expName = 'MA Experiment 2';
/** @type {object} - Stores info about the experiment session.  */
var expInfo = { // info is pulled from Qualtrics redirect url
    'participant': '',
    'age': '',
    'gender': '',
    'handedness': '',
};

// schedule the experiment:
psychoJS.schedule(psychoJS.gui.DlgFromDict({ // Open dialog box for expInfo & resource download
    dictionary: expInfo,
    title: expName
}));

// Create flowScheduler 
const flowScheduler = new Scheduler(psychoJS);
const dialogCancelScheduler = new Scheduler(psychoJS);
psychoJS.scheduleCondition(function () { return (psychoJS.gui.dialogComponent.button === 'OK'); }, flowScheduler, dialogCancelScheduler);

/**************** ------------------------------ FLOW SCHEDULER ------------------------------ 
                                          Is run if participant presses OK                     *************/

flowScheduler.add(updateInfo); // add timeStamp 
flowScheduler.add(experimentInit); // initialize components 

var introText = 'Thank you for agreeing to take part.\n\nThe session will begin with a practice set to familiarise you with the task. \n\nClick the screen when you are ready to continue.';
addTextScreen(introText);

var instructionText = 'You will see a word presented on your screen, followed by a short and possibly ambiguous audio clip of words being spoken.\n\nAfter, you will be presented with four words.\n\nClick the word you heard most clearly. You will only have 4 seconds to respond.\n\nWhen you are ready to practice, click the screen.';
addTextScreen(instructionText);

// pracTrials Loop
const pracTrialsLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(trialsLoopBegin, pracTrialsLoopScheduler, 1, 'prac_trials.csv', 'prac_trials', 0, false);
flowScheduler.add(pracTrialsLoopScheduler);
flowScheduler.add(trialsLoopEnd);

var startText = 'The practice trial is now over.\n\nWhen you are ready to begin, click the screen.';
addTextScreen(startText);

// trial Loop
const trialsLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(trialsLoopBegin, trialsLoopScheduler, 4, 'trials.csv', 'trials', 8);
flowScheduler.add(trialsLoopScheduler)
flowScheduler.add(trialsLoopEnd)

flowScheduler.add(quitPsychoJS, "The experiment is now complete.\nPress 'Ok' to continue.", true); 

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, 'Experiment cancelled', false);

/* ------------------------------ END OF FLOW SCHEDULER ------------------------------ 
*/

// --> Define experiment resources <-- 

/**
 * Updates the resources to include each resource in a given CSV file.
 * @param {string} csvPath - Filepath to a CSV file. 
 */
function resourceUpdater(csvPath) {
    Papa.parse(csvPath, {
        download: true,
        skipEmptyLines: true,
        complete: function (results) {
            var csv = results.data;
            for (let i = 1; i < csv.length; i++) {
                resources.push({ 'name': csv[i][3], 'path': './' + csv[i][3] })
            }
        }
    })
}

/** @type {array} - An array of ('name': 'path') objects for each experiment resource */
let resources = [
    { 'name': './resources/speaker_icon.png', 'path': './resources/speaker_icon.png' },
    { 'name': 'prac_trials.csv', 'path': './resources/prac_trials.csv' },// FOR TESTING
    { 'name': 'trials.csv', 'path': './resources/trials.csv' },
    { 'name': 'catchTrials.csv', 'path': './resources/catchTrials.csv' },
    { 'name': 'foils.csv', 'path': './resources/foils.csv' },
    // for local debugging
    { 'name': "resources/sound/prac_trials/practice_cue0.mp3", 'path': "./resources/sound/prac_trials/practice_cue0.mp3" },
    { 'name': "resources/sound/prac_trials/practice_cue_human1.mp3", 'path': "./resources/sound/prac_trials/practice_cue_human1.mp3" },
    { 'name': "resources/sound/prac_trials/practice_cue2.mp3", 'path': "./resources/sound/prac_trials/practice_cue2.mp3" },
    { 'name': "resources/sound/prac_trials/practice_cue_human3.mp3", 'path': "./resources/sound/prac_trials/practice_cue_human3.mp3" },
    { 'name': "resources/sound/prac_trials/practice_cue4.mp3", 'path': "./resources/sound/prac_trials/practice_cue4.mp3" },
    { 'name': "resources/sound/prac_trials/practice_cue_human5.mp3", 'path': "./resources/sound/prac_trials/practice_cue_human5.mp3" },
    { 'name': "resources/sound/prac_trials/practice_cue6.mp3", 'path': "./resources/sound/prac_trials/practice_cue6.mp3" },
    { 'name': "resources/sound/prac_trials/practice_cue_human7.mp3", 'path': "./resources/sound/prac_trials/practice_cue_human7.mp3" },
    { 'name': "resources/sound/prac_trials/practice_cue8.mp3", 'path': "./resources/sound/prac_trials/practice_cue8.mp3" },
    { 'name': "resources/sound/prac_trials/practice_cue_human9.mp3", 'path': "./resources/sound/prac_trials/practice_cue_human9.mp3" },
    { 'name': "resources/sound/prac_trials/practice_cue10.mp3", 'path': "./resources/sound/prac_trials/practice_cue10.mp3" },
    { 'name': "resources/sound/prac_trials/practice_cue_human11.mp3", 'path': "./resources/sound/prac_trials/practice_cue_human11.mp3" },
    { 'name': "resources/sound/trials/audio_stim_comp69.mp3", 'path': "./resources/sound/trials/audio_stim_comp69.mp3" },
    { 'name': "resources/sound/trials/audio_stim_comp6.mp3", 'path': "./resources/sound/trials/audio_stim_comp6.mp3" },
    { 'name': "resources/sound/trials/audio_stim_comp40.mp3", 'path': "./resources/sound/trials/audio_stim_comp40.mp3" },
    { 'name': "resources/sound/trials/audio_stim_comp12.mp3", 'path': "./resources/sound/trials/audio_stim_comp12.mp3" },
    { 'name': "resources/sound/trials/audio_stim_comp65.mp3", 'path': "./resources/sound/trials/audio_stim_comp65.mp3" },
    { 'name': "resources/sound/trials/audio_stim_comp57.mp3", 'path': "./resources/sound/trials/audio_stim_comp57.mp3" },
    { 'name': "resources/sound/trials/audio_stim_comp17.mp3", 'path': "./resources/sound/trials/audio_stim_comp17.mp3" },
    { 'name': "resources/sound/trials/audio_stim_comp1.mp3", 'path': "./resources/sound/trials/audio_stim_comp1.mp3" },
    { 'name': "resources/sound/trials/audio_stim_human35.mp3", 'path': "./resources/sound/trials/audio_stim_human35.mp3" },
    { 'name': "resources/sound/trials/audio_stim_human42.mp3", 'path': "./resources/sound/trials/audio_stim_human42.mp3" },
    { 'name': "resources/sound/trials/audio_stim_human67.mp3", 'path': "./resources/sound/trials/audio_stim_human67.mp3" },
    { 'name': "resources/sound/trials/audio_stim_human47.mp3", 'path': "./resources/sound/trials/audio_stim_human47.mp3" },
    { 'name': "resources/sound/trials/audio_stim_human0.mp3", 'path': "./resources/sound/trials/audio_stim_human0.mp3" },
    { 'name': "resources/sound/trials/audio_stim_human6.mp3", 'path': "./resources/sound/trials/audio_stim_human6.mp3" },
    { 'name': "resources/sound/trials/audio_stim_human50.mp3", 'path': "./resources/sound/trials/audio_stim_human50.mp3" },
    { 'name': "resources/sound/trials/audio_stim_human64.mp3", 'path': "./resources/sound/trials/audio_stim_human64.mp3" },
    { 'name': "resources/sound/catchTrials/audio_control_comp_project00.mp3", 'path': "./resources/sound/catchTrials/audio_control_comp_project00.mp3" },
    { 'name': "resources/sound/catchTrials/audio_control_comp_project14.mp3", 'path': "./resources/sound/catchTrials/audio_control_comp_project14.mp3" },
    { 'name': "resources/sound/catchTrials/audio_control_comp_project04.mp3", 'path': "./resources/sound/catchTrials/audio_control_comp_project04.mp3" },
    { 'name': "resources/sound/catchTrials/audio_control_comp_project07.mp3", 'path': "./resources/sound/catchTrials/audio_control_comp_project07.mp3" },
    { 'name': "resources/sound/catchTrials/audio_control_comp_project12.mp3", 'path': "./resources/sound/catchTrials/audio_control_comp_project12.mp3" },
    { 'name': "resources/sound/catchTrials/audio_control_comp_project18.mp3", 'path': "./resources/sound/catchTrials/audio_control_comp_project18.mp3" },
    { 'name': "resources/sound/catchTrials/audio_control_comp_project06.mp3", 'path': "./resources/sound/catchTrials/audio_control_comp_project06.mp3" },
    { 'name': "resources/sound/catchTrials/audio_control_comp_project08.mp3", 'path': "./resources/sound/catchTrials/audio_control_comp_project08.mp3" },
    { 'name': "resources/sound/catchTrials/audio_control_human_project12.mp3", 'path': "./resources/sound/catchTrials/audio_control_human_project12.mp3" },
    { 'name': "resources/sound/catchTrials/audio_control_human_project01.mp3", 'path': "./resources/sound/catchTrials/audio_control_human_project01.mp3" },
    { 'name': "resources/sound/catchTrials/audio_control_human_project14.mp3", 'path': "./resources/sound/catchTrials/audio_control_human_project14.mp3" },
    { 'name': "resources/sound/catchTrials/audio_control_human_project04.mp3", 'path': "./resources/sound/catchTrials/audio_control_human_project04.mp3" },
    { 'name': "resources/sound/catchTrials/audio_control_human_project07.mp3", 'path': "./resources/sound/catchTrials/audio_control_human_project07.mp3" },
    { 'name': "resources/sound/catchTrials/audio_control_human_project02.mp3", 'path': "./resources/sound/catchTrials/audio_control_human_project02.mp3" },
    { 'name': "resources/sound/catchTrials/audio_control_human_project06.mp3", 'path': "./resources/sound/catchTrials/audio_control_human_project06.mp3" },
    { 'name': "resources/sound/catchTrials/audio_control_human_project09.mp3", 'path': "./resources/sound/catchTrials/audio_control_human_project09.mp3" },
    {'name': 'resources/sound/trials/audio_stim_original.mp3', 'path': 'resources/sound/trials/audio_stim_original.mp3'}
]

resourceUpdater('./resources/prac_trials.csv');
resourceUpdater('./resources/trials.csv');
resourceUpdater('./resources/catchTrials.csv');

const urlParameters = util.getUrlParameters(); // Save ID from URL in-case headphone check fails
expInfo['participant'] = urlParameters.get('participant')

// Set completion and fail Redirect URLs
psychoJS.setRedirectUrls(`https://hullpsychology.eu.qualtrics.com/jfe/form/SV_aVrXerHhXZEtkai?ID=${expInfo['participant']}&expComplete=true`, 
    `https://hullpsychology.eu.qualtrics.com/jfe/form/SV_aVrXerHhXZEtkai?ID=${expInfo['participant']}&expComplete=false`);

// -- Set up a headphone check --
const headphonesCheck = new HeadphonesCheck() // for testing use: {passMark:0,trialCount:1}
headphonesCheck.checkHeadphones(handleHeadphonesCheckResult); // Start the Headphones Check and run handleHeadphonesCheckResult when complete

/**
 * Handle the result of the Headphones Check:
 * if passed, continue the study; if failed, stop the study
 * 
 * @param {*} result - Returned from the checkHeadphones() method
 */
function handleHeadphonesCheckResult(result){
    if (result) {
         // Update non-complete URL to reflect hpc now complete 
        
        psychoJS.start({ // --> Experiment Start
            expName: expName,
            expInfo: expInfo,
            resources: resources
        })
 
    } else {
        $('body').html('<div style="text-align: center; font-size: 2em; color: #000; background-color: #fff; padding: 1em; margin: 1em;">The study has stopped<br>because you failed the headphones check.<br>Please wait to be redirected.</div>');
        
        setTimeout(function(){
            window.location.replace(`https://hullpsychology.eu.qualtrics.com/jfe/form/SV_aVrXerHhXZEtkai?ID=${expInfo['participant']}&expComplete=false&headphoneCheck=fail`)
        }, 3000);
}}

// Set Logger
psychoJS.experimentLogger.setLevel(core.Logger.ServerLevel.EXP);

// --> Update Experiment Info
var frameDur;
/** Updates expInfo with metadata & pulls info from URL */
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


// --> Initialize variables for each component
// Global Components
var globalClock, routineTimer, t, frameN, continueRoutine, gotValidClick, prevButtonState, _mouseButtons 

// textDisplay Components
var textDisplayClock, textDisplayText, textDisplayInput; 

// trial Components
var trialClock, primer, cueStim, speakerIcon, mergedAudio, response_1, response_2, response_3, response_4, response, noResp 

/** @type {array} - An array of each possible location for each word. */
var locations = [[(- 0.5), 0.5], [0.5, 0.5], [(- 0.5), (- 0.5)], [0.5, (- 0.5)]];

/** @type {array} - An array containing the possible values for the cue word.*/
var cueTargets = ["shortValid", "longValid", "shortFoil", "longFoil"];

/** @type {array} - An array holding the ordering of cue word presentation for each trial. */
var cueList = []

// --> Initalize and create Foils list

// init foil variables   
var foilList1, foilList2, foils1, foils2
foilList1 = []
foilList2 = []
foils1 = []
foils2 = []

// Populate Foil Lists from target CSV
Papa.parse('./resources/foils.csv', { 
    download: true,
    skipEmptyLines: true,
    complete: function (results) {
        var csv = results.data;
        for (let i = 1; i < csv.length; i++) {
            foils1.push(csv[i][0]);
            foils2.push(csv[i][1]);
        }}});

/** If either foil list is empty, repopulate it from master list. */
function foilRefresh() {
    if (foilList1.length === 0 || foilList2.length === 0) {
        foilList1 = foils1.slice()
        foilList2 = foils2.slice()

        shuffleArray(foilList1); 
        shuffleArray(foilList2);
    }
}

// --> Functions to initalize routine components
var height, colour, text;
/**
 * Creates a text object with the given attributes.
 * 
 * @param {string} name - The name of the component. 
 * @param {string} [text=''] - The displayed text of the component. 
 * @param {number} [height=0.1] - Height of the text component. 
 * @param {string} [colour='white'] - Colour of text as a colour name. 
 * @returns {object} - A text component object.
 */
function createTextObj(name, text = '', height = 0.1, colour = 'white') {
    return {
        win: psychoJS.window,
        name: name,
        text: text,
        font: 'Open Sans',
        units: undefined,
        pos: [0, 0], height: height, wrapWidth: undefined, ori: 0.0,
        color: new util.Color(colour), opacity: undefined,
        depth: 0.0
    };
};

/** Initializes the components for each routine */
function experimentInit() {

    // "textDisplay" Routine Components
    textDisplayClock = new util.Clock();
    textDisplayText = new visual.TextStim(createTextObj("textDisplayText"));
    textDisplayInput = new core.Mouse({
        win: psychoJS.window,
    });
    textDisplayInput.mouseClock = new util.Clock();

    // "trial" Routine Components
    trialClock = new util.Clock();
    
    // Cue Components
    primer = new visual.TextStim(createTextObj("primer", text = 'X'));
    cueStim = new visual.TextStim(createTextObj("cueStim", text = 'X'));
    
    // Speaker Icon 
    speakerIcon = new visual.ImageStim({
        win: psychoJS.window,
        name: 'speakerIcon', units: undefined,
        image: './resources/speaker_icon.png', mask: undefined,
        ori: 0.0, pos: [0, 0], size: [0.5, 0.5],
        color: new util.Color([1, 1, 1]), opacity: undefined,
        flipHoriz: false, flipVert: false,
        texRes: 128.0, interpolate: true, depth: -2.0
    });

    // Audio Stimulus Clip
    mergedAudio = new sound.Sound({
        win: psychoJS.window,
        value: 'A',
        secs: (-1),
    });
    mergedAudio.setVolume(1.0);

    // Four text responses
    response_1 = new visual.TextStim(createTextObj("response_1"))
    response_2 = new visual.TextStim(createTextObj("response_2"))
    response_3 = new visual.TextStim(createTextObj("response_3"))
    response_4 = new visual.TextStim(createTextObj("response_4"))

    // Mouse click response
    response = new core.Mouse({
        win: psychoJS.window,
    });
    response.mouseClock = new util.Clock();

    // No response error cross
    noResp = new visual.TextStim(createTextObj('noResp', text = 'X', height = 0.4, colour = 'red'))

    // Create timers
    globalClock = new util.Clock(); // to track the time since experiment started
    routineTimer = new util.CountdownTimer(); // to track time remaining of each (non-slip) routine

    return Scheduler.Event.NEXT;
}

var frameRemains;
/**
 * Handles the displaying of drawable object.
 * @param {object} object - The object to update.
 * @param {number} startTime - Time (in seconds) to start displaying object.
 * @param {number} [duration=false] - If displaying for a set time, the time to display in seconds.
 * @param {boolean} [conditional=true] - Statement must evaluate as true to start.  

 */
function drawStimUpdater(object, startTime, duration = false, conditional = true) {
    if (t >= startTime && conditional === true && object.status === PsychoJS.Status.NOT_STARTED) {
        object.tStart = t;  // keep track of start time/frame for later (not accounting for frame time here)
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

// --> textDisplay Routine functions 
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
            if (!_mouseButtons.every((e, i,) => (e == prevButtonState[i]))) { // button state changed?
                prevButtonState = _mouseButtons;
                if (_mouseButtons.reduce((e, acc) => (e + acc)) > 0) { // state changed to a new click
                    // abort routine on response
                    continueRoutine = false;
                }
            }
        }

        // check for quit (typically the Esc key)
        if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({ keyList: ['escape'] }).length > 0) {
            return quitPsychoJS('The [Escape] key was pressed - the experiment has finished. Please press below to continue.', false);
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
        // the Routine "textDisplay" was not non-slip safe, so reset the non-slip timer
        routineTimer.reset();
        return Scheduler.Event.NEXT;
    };
};

/**
 * Bundles three functions to add a routine with given text to given scheduler.
 * 
 * @param {string} message - The text to be displayed. 
 * @param {Scheduler} scheduler - The scheduler to add the text routine to.
 */
function addTextScreen(message, scheduler = flowScheduler) {
    scheduler.add(textDisplayRoutineBegin(message))
    scheduler.add(textDisplayRoutineEachFrame())
    scheduler.add(textDisplayRoutineEnd())
}

// --> Trial Loop Functions

/**
 * Returns a randomized array of catch trial snapshots which can be added to a loop handler.
 * @returns {array} - An array of catch trial snapshots.
 */
 function generateCatchTrials() {
    catchTrials = new TrialHandler({ // init a trial handler to import catch trial data from CSV
        psychoJS: psychoJS,
        nReps: 1, method: TrialHandler.Method.RANDOM,
        extraInfo: expInfo, originPath: undefined,
        trialList: 'catchTrials.csv',
        seed: undefined, name: 'catchTrials'
    });

    var catchTrialSnapshots = [];
    var snapshot;
    for (const this_trial of catchTrials) { // populate catch trial snapshot holder
        snapshot = catchTrials.getSnapshot();
        catchTrialSnapshots.push(snapshot)
    };

    shuffleArray(catchTrialSnapshots);
    return catchTrialSnapshots
};

var trials, catchTrials, catchTrialSnapshots, currentLoop;
/** 
 * Creates a trial handler to add an instance of each trial created from a given CSV file to the experiment loop.
 * 
 * @param {Scheduler} trialsLoopScheduler - The scheduler instance.
 * @param {number} nReps - How many times should all conditions be repeated?
 * @param {string} trialList - The path to the CSV file containing trial info.
 * @param {string} name - A descriptive name of the trial loop.
 * @param {number} breaks - The number of breaks a participant will receive in the loop.
 * @param {boolean} [catchTrialsOn=true] - If true: Catch trials are added to the loop.
*/
function trialsLoopBegin(trialsLoopScheduler, nReps, trialList, name, breaks, catchTrialsOn = true) {
    trials = new TrialHandler({
        psychoJS: psychoJS,
        nReps: nReps, method: TrialHandler.Method.RANDOM,
        extraInfo: expInfo, originPath: undefined,
        trialList: trialList,
        seed: undefined, name: name
    });

    if (catchTrialsOn) { // creates catch trials if requested
        catchTrialSnapshots = generateCatchTrials();
        var catchTrialIndices = [3, 7, 11, 15, 19, 23, 27, 31]; // change to blank if random catch trials
    }

    psychoJS.experiment.addLoop(trials); // add the loop to the experiment 
    currentLoop = trials; // we're now on the current loop
    
    // Schedule all the trials in the trialList
    var snapshot;
    cueList = []; // empty cueList for new loop
    for (const this_trial of trials) { 
        shuffleArray(cueTargets)
        cueList.push(cueTargets.slice()) // creates a randomized array linking order of cue presentation to each trial by its index

        // add catchTrials
        if (catchTrialsOn && catchTrialIndices.includes(trials.thisTrialN)) {
            snapshot = catchTrialSnapshots.pop();
            trialsLoopScheduler.add(importConditions(snapshot));
            trialsLoopScheduler.add(trialRoutineBegin(snapshot));
            trialsLoopScheduler.add(trialRoutineEachFrame(snapshot));
            trialsLoopScheduler.add(trialRoutineEnd(snapshot));
            trialsLoopScheduler.add(endLoopIteration(trialsLoopScheduler, snapshot))
        }

        // add trials
        snapshot = trials.getSnapshot();
        trialsLoopScheduler.add(importConditions(snapshot));
        trialsLoopScheduler.add(trialRoutineBegin(snapshot));
        trialsLoopScheduler.add(trialRoutineEachFrame(snapshot));
        trialsLoopScheduler.add(trialRoutineEnd(snapshot));

        // add break routines
        if ((trials.thisN !== 0) && trials.thisN % (trials.nTotal / breaks) === 0) {
            let restMessage = `Take a break.\n\nPress here when you are ready to begin.\n\n\nYou have completed ${Math.round((trials.thisN) / (trials.nTotal) * 100)} %`;
            addTextScreen(restMessage, trialsLoopScheduler);
        }
        trialsLoopScheduler.add(endLoopIteration(trialsLoopScheduler, snapshot));
    }
    return Scheduler.Event.NEXT;
}

/** Removes loop from experiment. */
function trialsLoopEnd() {
    psychoJS.experiment.removeLoop(trials);
    return Scheduler.Event.NEXT;
}

// --> Individual Trial Functions

var trialComponents, cueTarget;
// var word_1, word_2, cue, path;
function trialRoutineBegin(snapshot) { // Prepare to start 'trial' routine
    return function () {
        t = 0;
        trialClock.reset();
        frameN = -1;
        continueRoutine = true; // until instructed otherwise

        // update parameter for each repeat
        shuffleArray(locations); // Randomise and set location of responses on screen
        response_1.setPos(locations[0]);
        response_2.setPos(locations[1]);
        response_3.setPos(locations[2]);
        response_4.setPos(locations[3]);

        response_1.setText(word_1); // Set correct choice 1 & 2
        response_2.setText(word_2);
        foilRefresh(); // ensure foil list is populated before setting foils
        response_3.setText(foilList1.pop()); // Set 2 random foils
        response_4.setText(foilList2.pop());

        mergedAudio = new sound.Sound({ // Set path of audio clip
            win: psychoJS.window,
            value: file_path,
            secs: -1
        });
        mergedAudio.setVolume(1.0)

        // update cue text

        if (snapshot.name !== 'catchTrials') { // Set cue text based on cueList index, randomized, no-repeats
            cueTarget = cueList[snapshot.thisIndex][snapshot.thisRepN]
        } else {
            cueTarget = ''
        }

        switch (cueTarget) { // Change text of cue 
            case "shortValid": //'shortValid'
                cueStim.setText(response_1.text);
                break;
            case "longValid"://'longValid'
                cueStim.setText(response_2.text);
                break;
            case "shortFoil"://'shortFoil'
                cueStim.setText(response_3.text);
                break;
            case "longFoil": //'longFoil'
                cueStim.setText(response_4.text);
                break;
            default:
                cueStim.setText("XXXXXX")
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
        trialComponents.push(cueStim)
        // trialComponents.push(speakerIcon);
        trialComponents.push(mergedAudio);
        trialComponents.push(response_1);
        trialComponents.push(response_2);
        trialComponents.push(response_3);
        trialComponents.push(response_4);
        trialComponents.push(response);
        trialComponents.push(noResp);

        for (const thisComponent of trialComponents) {
            if ('status' in thisComponent) {
                thisComponent.status = PsychoJS.Status.NOT_STARTED;
            }
        }
        return Scheduler.Event.NEXT;
    }
};

var _mouseXYs, cueDuration, primerDuration;
function trialRoutineEachFrame(snapshot) {
    return function () {
        // --- Loops for each frame of Routine 'trial' ---
        t = trialClock.getTime();
        frameN = frameN + 1 // number of completed frames (so 0 is the first frame)

        // update/draw components on each frame
        primerDuration = 2.0 + Math.random() // Sets primer as a random number between 2 and 3
        if (cue === 'short') { // based on CSV file
            cueDuration = 0.2
        } else {
            cueDuration = 1.2
        }

        // Start Displaying Components 
        drawStimUpdater(primer, 0.0, primerDuration) // primer updates
        drawStimUpdater(cueStim, primer.tStart + primerDuration,(cueDuration+3.0)) // cue text updates
        // drawStimUpdater(speakerIcon, cueStim.tStart + cueDuration, 3.0) // speakerIcon updates

        // play audio while cue is shown
        if (t >= (cueStim.tStart + cueDuration) && mergedAudio.status === PsychoJS.Status.NOT_STARTED) {
            mergedAudio.tStart = t;
            mergedAudio.frameNStart = frameN; // exact frame index

            mergedAudio.play(); // sound finishes automatically
            mergedAudio.status = PsychoJS.Status.STARTED;
        }
        if (t >= (mergedAudio.getDuration() + mergedAudio.tStart) && mergedAudio.status === PsychoJS.Status.STARTED) {
            mergedAudio.stop(); // stop sound if longer than duration
            mergedAudio.status = PsychoJS.Status.FINISHED;
        }

        var audioEnd = cueStim.tStart + cueDuration + 3.0

        drawStimUpdater(response_1, audioEnd, 4.0) // Show Response Options
        drawStimUpdater(response_2, audioEnd, 4.0)
        drawStimUpdater(response_3, audioEnd, 4.0)
        drawStimUpdater(response_4, audioEnd, 4.0)

        // Allow for & Monitor Clicked Response
        if (t >= audioEnd && response.status === PsychoJS.Status.NOT_STARTED) {
            response.tStart = t;
            response.frameNStart = frameN;

            response.status = PsychoJS.Status.STARTED;
            response.mouseClock.reset();
            prevButtonState = response.getPressed(); // if button is down already this ISN'T a new click
        }

        frameRemains = audioEnd + 4.0 - psychoJS.window.monitorFramePeriod * 0.75;
        if (response.status === PsychoJS.Status.STARTED && t >= frameRemains) {
            response.status = PsychoJS.Status.FINISHED;
        }

        if (response.status === PsychoJS.Status.STARTED) { // only update if started and not finished
            _mouseButtons = response.getPressed();
            if (!_mouseButtons.every((e, i) => (e == prevButtonState[i]))) { // button state change?
                prevButtonState = _mouseButtons;
                if (_mouseButtons.reduce((e, acc) => (e + acc)) > 0) { // state changed to a new click
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
        // if no response - display *noResp* cross
        drawStimUpdater(noResp, response_1.tStart + 4.0, 0.5)

        // check for quit (typically the Esc key)
        if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({ keyList: ['escape'] }).length > 0) {
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
            }
        }

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
        mergedAudio.stop(); // ensure sound has stopped at end of routine

        // -- Store Data --
        if (response.time) { psychoJS.experiment.addData('response.time', response.time[0]) };
        if (response.clicked_name) { psychoJS.experiment.addData('response', response.clicked_name[0]) };
        psychoJS.experiment.addData('cueTarget', cueTarget);
        psychoJS.experiment.addData('rand_foil_1', response_3.text);
        psychoJS.experiment.addData('rand_foil_2', response_4.text);

        // the Routine "trial" was not non-slip safe, so reset the non-slip timer
        routineTimer.reset();

        return Scheduler.Event.NEXT;
    };
}

// --> Loop Helper Functions 
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

/**
 * Quits the experiment with the given message.
 * 
 * @param {string} message - Message to be displayed on exit.
 * @param {boolean} isCompleted - False if exiting early.
 * @returns 
 */
function quitPsychoJS(message, isCompleted) {
    // Check for and save orphaned data
    if (psychoJS.experiment.isEntryEmpty()) {
        psychoJS.experiment.nextEntry();
    };

    psychoJS.window.close();
    psychoJS.quit({ message: message, isCompleted: isCompleted });

    return Scheduler.Event.QUIT;
}