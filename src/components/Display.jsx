import React, { useState } from 'react'
import axios from 'axios';
import { Typography,Box,Grow,Select,MenuItem,InputLabel, FormControl, Button } from '@mui/material'
const Display = () => {
  let [apiDatum,setApiDatum] = useState([]);
  let [userDatum,setUserDatum] = useState({
    participants:"",
    activitytype:""
  })
  const backgroundBoxStyle = {
    backgroundColor:"#D0BFFF",
    color:"#000",
    borderRadius:"5px",
    marginTop:"50%",
    padding:"20px",
    boxShadow: "0px 7px 46px 0px rgba(0,0,0,0.1)",
    textAlign:"center"
  }
  const displayStyle = {
    backgroundColor:"#DFCCFB",
    color:"#000",
    padding:"20px",
    width:"300px",
    borderRadius:"5px",
    marginBottom:"20px",
    boxShadow:"0px 7px 46px 0px rgba(0,0,0,0.1)"
  }
  let handleTypeChange = (e)=>{
    let {name,value} = e.target;
    setUserDatum((prevDatum)=>{
      return{
        ...prevDatum,
        [name]:value
      }
    })
  }
  let randomBtnClick = async ()=>{
      let response = await axios.get("https://www.boredapi.com/api/activity");
      let data = response.data;
      setApiDatum(data)
  }
  let generateBtnClick = async ()=>{
    let response = await axios.get(`https://www.boredapi.com/api/activity?type=${userDatum.activitytype}&participants=${userDatum.participants}`);
    let data = response.data;
    setApiDatum(data);
  }
  return (
    <>
        <Grow in>
            <Box sx={backgroundBoxStyle}>
                <Box sx={displayStyle}>
                  {apiDatum.length !== 0  ? (
                    <>
                      <Typography variant='h5' style={{fontFamily: "'Itim', cursive"}}>{apiDatum.activity === undefined ? `No data found` :` ${apiDatum.activity} `}</Typography>
                      <Typography variant='h6' style={{fontFamily: "'Itim', cursive"}}>{apiDatum.activity === undefined ? null :`Type : ${apiDatum.type}`}</Typography>
                    </>
                  ) :(<Typography variant='h5' style={{fontFamily: "'Itim', cursive"}}>{`Select or click the random`}</Typography>)}
                  
                </Box>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="activitytype">Type</InputLabel>
                <Select labelId='type-select' id="activitytype" name='activitytype' value={userDatum.activitytype} label="Type" onChange={handleTypeChange}>
                    <MenuItem value={`education`}>Education</MenuItem>
                    <MenuItem value={`recreational`} >Recreational</MenuItem>
                    <MenuItem value={`social`}>Social</MenuItem>
                    <MenuItem value={`diy`}>DIY</MenuItem>
                    <MenuItem value={`charity`}>Charity</MenuItem>
                    <MenuItem value={`cooking`}>Cooking</MenuItem>
                    <MenuItem value={`relaxation`}>Relaxation</MenuItem>
                    <MenuItem value={`music`}>Music</MenuItem>
                    <MenuItem value={`busywork`}>Busy Work</MenuItem>
                </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 130 }}>
                <InputLabel id="participants-select">Participants</InputLabel>
                <Select labelId='participants-select' name="participants" label="Participants" value={userDatum.participants} onChange={handleTypeChange}>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                </Select>
                </FormControl><br /><br />
                {
                  userDatum.activitytype === "" && userDatum.participants === "" ?
                    <Button variant='contained' onClick={randomBtnClick} style={{backgroundColor:"#FFF8C9",color:"#000"}} fullWidth>Random</Button> : 
                    <Button variant='contained' onClick={generateBtnClick} style={{backgroundColor:"#FFF8C9",color:"#000"}} fullWidth>Generate</Button> 
                }
            </Box>
        </Grow>
    </>
  )
}

export default Display;