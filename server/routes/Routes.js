const express = require('express');
const path = require('path');
const { promisify } = require('util');
const { exec } = require('child_process');
const readExcelFile = require('../util/readExcel');
const getPerformanceTimingData = require('../util/totalTimingData');
const updateExcelFile = require('../util/updateExcelFile');
const readTestDetails = require('../util/readTestDetails');
const readOverallSummaryData = require('../util/readOverallSummaryData');

const router = express.Router();
const execAsync = promisify(exec);

// Middleware to parse JSON bodies
router.use(express.json());

// Define the root directory of the project
const rootDir = path.resolve(__dirname, '../..');
console.log('Root directory:', rootDir);
// Route to get dashboard data
router.get('/dashboard', (req, res) => {
    const filePath = path.join(rootDir, '/files/QualityPlanningSummaryData.xlsx');
    try {
        const data = readOverallSummaryData(filePath);
        res.json(data);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Route to get overview summary data
router.get('/overviewsummary', async (req, res) => {
    const scriptPath = path.join(rootDir, 'python-scripts', 'OverallSummaryForDomainApp.py');
    try {
        const { stdout, stderr } = await execAsync(`python ${scriptPath}`);
        if (stderr) {
            return res.status(500).send(`Python script stderr: ${stderr}`);
        }
        const filePath = path.join(rootDir, '/files/detailedReportDomainApp.xls');
        const data = readExcelFile(filePath);
        res.json(data);
    } catch (error) {
        res.status(500).send(`Error executing Python script: ${error.message}`);
    }
});

// Route to handle performance timing requests
router.get('/performance-timing', (req, res) => {
    const { Baseline, RTM, Module } = req.query;

    if (!Baseline || !RTM || !Module) {
        return res.status(400).send('Missing required query parameters: Baseline, RTM, Module');
    }
    const filePath = path.join(rootDir, '/files/TotalTiming/', `${Module}.xls`);
    const performanceData = getPerformanceTimingData(Baseline, RTM, filePath);

    res.json(performanceData);
});

// Route to handle comment updates
router.post('/update-comment', async (req, res) => {
    const { module, ID, useCase, newComment } = req.body;

    if (!module || !useCase || !ID) {
        return res.status(400).send('Missing required body parameters: module, useCase, newComment');
    }
    const filePath = path.join(rootDir, '/files/QualityPlanningSummaryData.xlsx');
    try {
        const result = await updateExcelFile(filePath, module, ID, useCase, newComment);
        if (result.success) {
            res.status(200).send(result.message);
        } else {
            res.status(500).send(result.message);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route to read teams name
router.get('/teams', (req, res) => {
    res.sendFile(path.join(rootDir, 'server', 'data', 'TeamsName.json'));
});

// Route to read teams use cases
router.get('/fetch-test-details', (req, res) => {
    const filePath = path.join(rootDir, '/files/QualityPlanning_TestCase_Descriptions.xlsx');
    try {
        const data = readTestDetails(filePath);
        res.json(data);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;