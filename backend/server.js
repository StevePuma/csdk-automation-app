const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.post('/check-condition', async (req, res) => {
  const { resultData, nlgSummary } = req.body;

  console.log("Received data:", resultData);

  if (Array.isArray(resultData.rows)) {
    const years = resultData.rows.map(row => row[0].text);

    console.log("Years:", years);

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

const createJiraTicket = async (summary) => {
  const jiraUrl = '';
  const jiraAuth = 'Basic ' + Buffer.from('').toString('base64');

  const ticketData = {
    fields: {
      project: {
        key: 'TST'
      },
      summary: summary || 'Test', 
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