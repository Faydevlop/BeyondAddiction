const Report = require('../models/reportModel');

const createReport = async (req, res) => {
    const { issue, description, suspectname,suspectMobile, latitude,longitude } = req.body;
    console.log( issue, suspectname,suspectMobile,description, latitude,longitude );
    
  
    // Validate the required fields
    if (!issue || !description || !latitude || !longitude || !suspectMobile || !suspectname) {
      return res.status(400).json({
        message: 'Issue, description, and location (latitude and longitude) are required.',
      });
    }
  
    try {
      const newReport = new Report({
        issue,
        description,
        suspectMobile,
        suspectname,
        latitude:latitude,
        longitude:longitude
      });
  
      const savedReport = await newReport.save();
      res.status(201).json(savedReport);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error saving report.' });
    }


  };
  
  const getAllReport = async(req,res)=>{
    try {
        const reports = await Report.find()
        if(!reports){
            return res.status(200).json({message:'no reports are available'})
        }
        res.status(200).json({reports});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving report.' });
    }
  }


  module.exports = {
    createReport,
    getAllReport
  }