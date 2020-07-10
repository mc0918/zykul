import './WarfareUnitGenerator.css'
import React, { useState } from 'react';
import {Slider, Typography, Grid, Input, List, ListItem, TextField } from '@material-ui/core';

export const WarfareUnitGenerator = () => {
    const [unitName, setUnitName] = useState("")
    const [size, setSize] = useState(1);
    const [attack, setAttack] = useState(1);
    const [defense, setDefense] = useState(1);
    const [range, setRange] = useState(1);
    const [magic, setMagic] = useState(0);
    const [experience, setExperience] = useState(1);

    //minValue argument is necessary because magic stat can go to 0 while the others should stop at 1
    const renderSlider = (label, attribute, setAttribute, minValue) => {
        const lowerCaseLabel = label.toLowerCase()

        const handleSliderChange = (event, newValue) => {
            setAttribute(newValue)
        };

        const handleInputChange = (event) => {
            setAttribute(event.target.value === '' ? '' : Number(event.target.value));
        };

        const handleBlur = () => {
            if (attribute < 1) {
                if(label === 'Magic'){
                    setAttribute(0)
                } else {
                setAttribute(1);
                }
            } else if (attribute > 5) {
                setAttribute(5);
            }
        };

        return (
            <div className={`${lowerCaseLabel}-slider-container`}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item >
                        <div className={`${lowerCaseLabel}-slider`}>
                            <Typography gutterBottom>
                                {label}
                            </Typography>
                            <Slider
                                value={typeof attribute === 'number' ? attribute : 1}
                                onChange={handleSliderChange}
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={minValue}
                                max={5}
                            />
                        </div>
                    </Grid>
                    <Grid item xs>
                        <Input
                            className={`${lowerCaseLabel}-slider-input`}
                            value={attribute}
                            margin="dense"
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            inputProps={{
                                step: 1,
                                min: minValue,
                                max: 5,
                                type: 'number',
                                'aria-labelledby': 'discrete-slider',
                            }}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    };

    const renderTextInput = (label, attribute, setAttribute) => {
        //regex to replace spaces with dashes
        const lowerCaseLabel = label.trim().replace(/\s+/g, '-').toLowerCase()

        const handleChange = (event) => setAttribute(event.target.value)

        return (
            <div className={`${lowerCaseLabel}-field-container`}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item >
                        <TextField className={`${lowerCaseLabel}-field`} label={`${label}`} value={attribute} onChange={handleChange} />
                    </Grid>
                </Grid>
            </div>
        )
    }

    const calculateSize = (sizeInput) => {
        let sizeStat;
        switch (sizeInput) {
            case 1:
                sizeStat = '1d4';
                break;
            case 2:
                sizeStat = '1d6';
                break;
            case 3:
                sizeStat = '1d8';
                break;
            case 4:
                sizeStat = '1d10';
                break;
            case 5:
                sizeStat = '1d12';
                break;
            default:
                sizeStat = "you shouldn't get here"
                break;
        }

        return sizeStat;
    };

    const calculateAttack = (attackInput, experienceInput) => {
        const attackStat = attackInput + experienceInput;
        return attackStat;
    };

    const calculateDefense = (sizeInput, defenseInput, experienceInput) => {
        sizeInput = Math.floor(sizeInput / 2);
        const defenseStat = 10 + defenseInput + sizeInput + experienceInput;
        return defenseStat;
    };

    const calculateRange = rangeInput => {
        return rangeInput * 30;
    };

    const calculateExperience = experienceInput => {
        let expStat;
        switch (experienceInput) {
            case 1:
                expStat = 'Green';
                break;
            case 2:
                expStat = 'Regular';
                break;
            case 3:
                expStat = 'Seasoned';
                break;
            case 4:
                expStat = 'Veteran';
                break;
            case 5:
                expStat = 'Elite';
                break;
            default:
                expStat = "you shouldn't get here"
                break;
        }

        return expStat;
    }

    const renderStatBlock = (sizeInput, attackInput, defenseInput, rangeInput, magicInput, experienceInput) => {
        const sizeStat = calculateSize(sizeInput);
        const attackStat = calculateAttack(attackInput, experienceInput);
        const defenseStat = calculateDefense(sizeInput, defenseInput, experienceInput);
        const magicDefenseStat = Math.floor(defenseInput/2) + magicInput
        const rangeStat = calculateRange(rangeInput);
        const magicStat = magicInput;
        const expStat = calculateExperience(experienceInput);
        const cost = 100 * sizeInput * (attackInput + defenseInput + rangeInput + (3 * magicInput)) * experienceInput;

        return (
            <List className="stat-block">
                <ListItem className="name">
                    {`${expStat} ${unitName === "" ? "Default Units" : unitName}`}
                </ListItem>
                <ListItem>
                    Size: {sizeStat}
                </ListItem>
                <ListItem>
                    Attack: +{attackStat}
                </ListItem>
                <ListItem>
                    Defense: {defenseStat}
                </ListItem>
                <ListItem>
                    Magic Defense: {magicDefenseStat}
                </ListItem>
                <ListItem>
                    Range: {rangeStat} ft.
                    </ListItem>
                <ListItem>
                    Magic: +{magicStat}
                </ListItem>
                <ListItem>
                    Cost: {cost} GP
                    </ListItem>
            </List>
        )
    }

    return (
        <div id="generator-container">
            <Grid id="grid-container" container spacing={2} justify="space-evenly" alignItems="center">
                <Grid item xs={12}>
                    <div className="page-description">
                        <h1>Warfare Unit Generator</h1>
                        <a href="https://github.com/stevenzych/dnd_units/blob/master/warfare_unit_generator.ipynb" target="_blank" rel="noopener noreferrer">source</a>
                        <h3>Introduction</h3>
                        <p>This generator takes in six values and creates combat-ready units. The values are:</p>
                        <ol>
                            <li>size</li>
                            <li>attack</li>
                            <li>defense</li>
                            <li>range</li>
                            <li>magic</li>
                            <li>experience</li>
                        </ol>
                        <h3>Meaning of Stats</h3>
                        <p>Not all the stats are returned "straight," per se. Some are modified by other stats before being returned in the final stat block. Theses modifications, as well as simple definitions, are as follows.</p>
                        <ul>
                            <li>Size (siz): Determines a units health and is returned as common die. A unit of size 1 (1d4), can get hit 4 times in a battle, and then dies. Size multiplies total cost.</li>
                            <li>Attack (atk + exp): A modifier for d20 rolls made against opponents defense.</li>
                            <li>Defense (10 + dfn + siz//2 + exp): Basically armor class. If an attack matches or exceeds a unit's defense, the unit takes 1 damage.</li>
                            <li>Range (rng * 30): How far a unit can attack (in feet). Each tile at this scale is 30 ft. on a side.</li>
                            <li>Magic (mag): A modifier for d20 rolls made against magic defense (mag + dfn//2). Rolls that beat magic defense deal 1 damage. Very expensive stat.</li>
                            <li>Experience (exp): A more experienced unit attacks and defends better. Some special skills and features are only accessible to certain experience level units. Experience multiplies total cost.</li>
                        </ul>
                    </div>
                </Grid>
                <Grid item s={6} >
                    <Grid item xs={12}>
                        {renderTextInput("Unit Name", unitName, setUnitName)}
                    </Grid>
                    <Grid item xs={12}>
                        {renderSlider("Size", size, setSize, 1)}
                    </Grid>
                    <Grid item xs={12}>
                        {renderSlider("Attack", attack, setAttack, 1)}
                    </Grid>
                    <Grid item xs={12}>
                        {renderSlider("Defense", defense, setDefense, 1)}
                    </Grid>
                    <Grid item xs={12}>
                        {renderSlider("Range", range, setRange, 1)}
                    </Grid>
                    <Grid item xs={12}>
                        {renderSlider("Magic", magic, setMagic, 0)}
                    </Grid>
                    <Grid item xs={12}>
                        {renderSlider("Experience", experience, setExperience, 1)}
                    </Grid>
                </Grid>

                <Grid item s={6} className="stat-block-container">
                    {renderStatBlock(size, attack, defense, range, magic, experience)}
                </Grid>
            </Grid>
        </div>
    );
}