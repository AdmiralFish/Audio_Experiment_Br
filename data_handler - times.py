import os
import statistics

import glob
import pandas as pd

# Global Variables
cwd = os.getcwd() 

# Populate list of raw data csv files
raw_data = [file.replace("\\", "/") for file in glob.glob(f"{cwd}/data/*.csv")]

demographics = ['participant']

# Make Headers for Master Dataframe
headers = []
for i in demographics:
    headers.append(i)
headers.append('cue_length')

headers.append("s_valid_mean") 
headers.append("s_valid_congruent_mean") 
headers.append("s_valid_incongruent_mean")
headers.append("s_invalid_mean")

headers.append("l_valid_mean") 
headers.append("l_valid_congruent_mean") 
headers.append("l_valid_incongruent_mean")
headers.append("l_invalid_mean")

blanks = 0

# Init Master Dataframe
data_export = pd.DataFrame(columns=headers)

# Main Loop
for csv_file in raw_data:
    df = pd.read_csv(csv_file)

    s_valid = []
    s_valid_congruent = []
    s_valid_incongruent = []
    s_invalid = []

    l_valid = []
    l_valid_congruent = []
    l_valid_incongruent = []
    l_invalid = []

    # Creates empty dic for storing info on each condition 
    short = {'cue_length': "short"}
    long = {'cue_length': "long"}

    # Clean Datafile
    df.drop(
        labels=[i for i in range(0,12)],
        axis=0,
        inplace=True
    )

    df.replace(to_replace="shortValid", value= 1)
    df.replace(to_replace="longValid", value= 2)
    df.replace(to_replace="shortFoil", value= 3)
    df.replace(to_replace="longFoil", value= 4)

    df.sort_values(by=["trials.thisIndex", "cueTarget", "catchTrials.thisIndex"], inplace=True)
    
    # Add Demographic Data
    for var in demographics:
        short[var] = df[var].iloc[0]
        long[var] = df[var].iloc[0]

    # Collect Response Data
    responses = df['response']
    cueTarget = df['cueTarget']

    # Record responses
    short_responses = responses[0:68]
    long_responses = responses[68:136]


    # Collect Response Time Data
    response_times = df['response.time']

    short_response_times = response_times[0:68] # Short CueTime Condition
    long_response_times = response_times[68:136] # Long Cuetime Condition

    # Add short times 
    keys = short_response_times.keys()
    for i in range(0,len(short_response_times)):

        if cueTarget[keys[i]] == "shortValid":
            if short_responses[keys[i]] == "response_1":
                s_valid_congruent.append(short_response_times[keys[i]]) # Congruent SV
            elif short_responses[keys[i]] == "response_2":
                s_valid_incongruent.append(short_response_times[keys[i]]) # Incongruent SV

        if cueTarget[keys[i]] == "longValid":
            if short_responses[keys[i]] == "response_2":
                s_valid_congruent.append(short_response_times[keys[i]]) # Congruent LV
            elif short_responses[keys[i]] == "response_1":
                s_valid_incongruent.append(short_response_times[keys[i]]) # Congruent LV

        if short_responses[keys[i]] in ["response_1", "response_2"]: # Valid
            s_valid.append(short_response_times[keys[i]])
                
        elif short_responses[keys[i]] in ["response_3", "response_4"]: # Invalid 
            s_invalid.append(short_response_times[keys[i]])
        else:
            blanks += 1
    
    # Add long times 
    keys = long_response_times.keys()
    for i in range(0,len(long_response_times)):   

        if cueTarget[keys[i]] == "shortValid":
            if long_responses[keys[i]] == "response_1":
                l_valid_congruent.append(long_response_times[keys[i]]) # Congruent LV
            elif long_responses[keys[i]] == "response_2":
                l_valid_incongruent.append(long_response_times[keys[i]]) # inCongruent LV

        if cueTarget[keys[i]] == "longValid":
            if long_responses[keys[i]] == "response_2":
                l_valid_congruent.append(long_response_times[keys[i]]) # Congruent LV
            elif long_responses[keys[i]] == "response_1":
                l_valid_incongruent.append(long_response_times[keys[i]]) # inCongruent LV

        if long_responses[keys[i]] in ["response_1", "response_2"]: # Valid
            l_valid.append(long_response_times[keys[i]])
        elif long_responses[keys[i]] in ["response_3", "response_4"]: # Invalid 
            l_invalid.append(long_response_times[keys[i]])
        else:
            blanks += 1

    # Calculate means
    s_valid_mean = statistics.mean(s_valid)
    s_valid_congruent_mean = statistics.mean(s_valid_congruent)
    s_valid_incongruent_mean = statistics.mean(s_valid_incongruent)
    if len(s_invalid) == 0:
        s_invalid_mean = "N/A"
    else:
        s_invalid_mean = statistics.mean(s_invalid)
    
    l_valid_mean = statistics.mean(l_valid)
    l_valid_congruent_mean = statistics.mean(l_valid_congruent)
    l_valid_incongruent_mean = statistics.mean(l_valid_incongruent)
    if len(l_invalid) == 0:
        l_invalid_mean = "N/A"
    else:
        l_invalid_mean = statistics.mean(l_invalid)

    # Add Response Data to Dict
    short["s_valid_mean"] = s_valid_mean
    short["s_valid_congruent_mean"] = s_valid_congruent_mean
    short["s_valid_incongruent_mean"] = s_valid_incongruent_mean
    short["s_invalid_mean"] = s_invalid_mean

    long["l_valid_mean"] = l_valid_mean
    long["l_valid_congruent_mean"] = l_valid_congruent_mean
    long["l_valid_incongruent_mean"] = l_valid_incongruent_mean
    long["l_invalid_mean"] = l_invalid_mean

    # Append Data to master Dataframe 
    data_export = data_export.append(short, ignore_index=True)
    data_export = data_export.append(long, ignore_index=True)

# Export to Excel
data_export.to_excel(f"{cwd}\data_export_times.xlsx", sheet_name="raw_data", index=False, header=True)

print("blanks = ", blanks)