import os

import glob
import pandas as pd

# Global Variables
cwd = os.getcwd() 

# Populate list of raw data csv files
raw_data = [file.replace("\\", "/") for file in glob.glob(f"{cwd}/data/*.csv")]

demographics = ['date', 'participant', 'age', 'gender', 'handedness']

# Make Headers for Master Dataframe
headers = []
for i in demographics:
    headers.append(i)
headers.append('cue_length')
headers.append('mean_response_time')
for i in range(0, 17):
    headers.append(str(i+1) + "_sv") 
    headers.append(str(i+1) + "_lv") 
    headers.append(str(i+1) + "_sf") 
    headers.append(str(i+1) + "_lf") 

for i in range(0, 16):
    headers.append("catch"+str(i+1))

# Init Master Dataframe
data_export = pd.DataFrame(columns=headers)

# Main Loop
for csv_file in raw_data:
    df = pd.read_csv(csv_file)

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

    # Collect Response Time Data
    response_times = df['response.time']

    # Short CueTime Condition
    short_response_times = response_times[0:68]
    short_avg_time = round(short_response_times.mean(), 2)
    short['mean_response_time'] = short_avg_time
    
    # Long CueTime Condition
    long_response_times = response_times[68:136]
    long_avg_time = round(long_response_times.mean(), 2)
    long['mean_response_time'] = long_avg_time

    # Collect Response Data
    responses = df['response']

    # Record Short CueTime responses
    short_responses = responses[0:68]
    long_responses = responses[68:136]

    short_catch = responses[136:152]
    long_catch = responses[152:168]

    # Add Response Data to Dict
    for i in range(0,len(short_responses)):
        short[headers[7+i]] = short_responses.iloc[i]
        long[headers[7+i]] = long_responses.iloc[i]

    for i in range(0,len(short_catch)):
        short["catch"+str(i+1)] = short_catch.iloc[i]
        long["catch"+str(i+1)] = long_catch.iloc[i]

    # Append Data to master Dataframe 
    data_export = data_export.append(short, ignore_index=True)
    data_export = data_export.append(long, ignore_index=True)
    # data_export = data_export.append(catch_responses, ignore_index=True)

# Export to Excel
data_export.to_excel(f"{cwd}\data_export.xlsx", sheet_name="raw_data", index=False, header=True)