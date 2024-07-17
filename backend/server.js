const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Use the cors middleware
app.use(cors());

// Middleware to parse JSON bodies with increased limit
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Endpoint to receive query results and nlg summary
app.post('/check-condition', async (req, res) => {
  const { resultData, nlgSummary } = req.body;

  // Log the structure of data
  console.log("Received data:", resultData);

  if (Array.isArray(resultData.rows)) {
    // Flatten the rows to extract Years values
    const years = resultData.rows.map(row => row[0].text); // Assuming the first element is Years and we need the 'text' property

    // Log the `year` values to inspect their structure
    console.log("Years:", years);

    // Check if the years column contains the value '2009'
    const hasCondition = years.some(year => year === '2009');

    if (hasCondition) {
      try {
        await createJiraTicket(nlgSummary);
        res.status(200).send('Jira ticket created.');
      } catch (error) {
        console.error('Error creating Jira ticket:', error.response ? error.response.data : error.message);
        res.status(500).send('Failed to create Jira ticket.');
      }
    } else {
      res.status(200).send('Condition not met.');
    }
  } else {
    res.status(400).send('Invalid data format.');
  }
});

// Function to create a Jira ticket
const createJiraTicket = async (summary) => {
  const jiraUrl = 'https://sisenseglobal.atlassian.net/rest/api/2/issue';
  const jiraAuth = 'Basic ' + Buffer.from('stephen.poff@sisense.com:ATATT3xFfGF0LGHV_qyzsyMWWXHoQ4bJZDAdkQTPfqdFl1GDEzLCD96poz-pIafbKqSavmedkjVemMsVxSd4iNorHDBuj_KQMDfi0Z6m03iH5e8_ejLZSDEAyJs6vKn_lHoe4PyWrpjHt5SZyEYazpr99AcjKDi-ihdb7F7S9kUdR7Gcm_rgjps=3DC76B47').toString('base64');

  const ticketData = {
    fields: {
      project: {
        key: 'TST'
      },
      summary: summary || 'Test', // Use nlgSummary or default to 'Test'
      issuetype: {
        name: 'Task'
      },
      assignee: {
        name: 'Steve Poff'
      }
    }
  };

  await axios.post(jiraUrl, ticketData, {
    headers: {
      Authorization: jiraAuth,
      'Content-Type': 'application/json'
    }
  });
};

app.listen(port, () => {
  console.log(`Backend service listening at http://localhost:${port}`);
});