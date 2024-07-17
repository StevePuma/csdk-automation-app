import React, { useEffect, useState } from 'react';
// Sisense Components 
import {
  Chart,
  IndicatorChart,
  Table,
  useExecuteQuery
} from '@sisense/sdk-ui';
import * as DM from './sample-ecommerce';
import { filterFactory, measureFactory, QueryResultData } from '@sisense/sdk-data';
import { useGetNlgQueryResult } from '@sisense/sdk-ui/ai';


import axios from 'axios';
import { Typography, Button, Card, CardContent } from '@mui/material';
import diagram from './diagram.png'; // Importing the image
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Dashboard = () => {
  const [ticketCreated, setTicketCreated] = useState(false);
  const [nlgSummary, setNlgSummary] = useState('');
  const [showCode, setShowCode] = useState(false);

  const queryProps = {
    dataSource: DM.DataSource,
    dimensions: [
      DM.Commerce.Date.Years,
      DM.Country.Country
    ],
    measures: [
      measureFactory.sum(
        DM.Commerce.Revenue, 'Revenue'
      )],
  };

  const { data } = useExecuteQuery(queryProps);

  const checkCondition = async (resultData: QueryResultData, nlgSummary: string) => {
    try {
      const response = await axios.post('http://localhost:3000/check-condition', {
        resultData,
        nlgSummary
      });
      console.log(response.data);
      if (response.data === 'Jira ticket created.') {
        setTicketCreated(true);
      }
    } catch (error) {
      console.error('Error checking condition:', error);
    }
  };

  // Sisense Compose SDK GenAI NLG Compoennt 

  const { data: nlgData, isLoading: isNlgLoading } = useGetNlgQueryResult({
    dataSource: DM.DataSource,
    dimensions: [DM.Commerce.Date.Years],
    measures: [measureFactory.sum(DM.Commerce.Revenue)],
    filters: [filterFactory.dateFrom(DM.Commerce.Date.Years, "2013"), filterFactory.equals(DM.Commerce.Condition, "Used")]
  });

  useEffect(() => {
    if (nlgData) {
      setNlgSummary(nlgData);
    }
  }, [nlgData]);

  useEffect(() => {
    if (data && nlgSummary) {
      console.log(data);
      checkCondition(data, nlgSummary);
    }
  }, [data, nlgSummary]);

  const codeString = `
  import {
    Chart,
    IndicatorChart,
    Table,
    useExecuteQuery
  } from '@sisense/sdk-ui';
  import * as DM from './sample-ecommerce';
  import { filterFactory, measureFactory, QueryResultData } from '@sisense/sdk-data';
  import { useGetNlgQueryResult } from '@sisense/sdk-ui/ai';

    const queryProps = {
      dataSource: DM.DataSource,
      dimensions: [
        DM.Commerce.Date.Years,
        DM.Country.Country
      ],
      measures: [
        measureFactory.sum(
          DM.Commerce.Revenue, 'Revenue'
        )],
    };

    const { data } = useExecuteQuery(queryProps);

    const checkCondition = async (resultData: QueryResultData, nlgSummary: string) => {
      try {
        const response = await axios.post('http://localhost:3000/check-condition', {
          resultData,
          nlgSummary
        });
        console.log(response.data);
        if (response.data === 'Jira ticket created.') {
          setTicketCreated(true);
        }
      } catch (error) {
        console.error('Error checking condition:', error);
      }
    };

    const { data: nlgData, isLoading: isNlgLoading } = useGetNlgQueryResult({
      dataSource: DM.DataSource,
      dimensions: [DM.Commerce.Date.Years],
      measures: [measureFactory.sum(DM.Commerce.Revenue)],
      filters: [filterFactory.dateFrom(DM.Commerce.Date.Years, "2013"), filterFactory.equals(DM.Commerce.Condition, "Used")]
    });

    useEffect(() => {
      if (nlgData) {
        setNlgSummary(nlgData);
      }
    }, [nlgData]);

    useEffect(() => {
      if (data && nlgSummary) {
        console.log(data);
        checkCondition(data, nlgSummary);
      }
    }, [data, nlgSummary]);

    return (
      <>
            {isNlgLoading && <div>Loading insights...</div>}
            {nlgData && <p>{nlgData}</p>}
            {data && (
              <>
                <Table
                  dataSet={data}
                  dataOptions={{ columns: data.columns }}
                  styleOptions={{
                    rowsPerPage: 5,
                    height: 300,
                    header: {
                      color: {
                        enabled: true,
                        backgroundColor: '',
                      }
                    },
                  }}
                />
              </>
            )}
          </>
        )}
      </>
    );
  };

  export default Dashboard;
  `;

  return (
    <>
      <Button variant="contained" onClick={() => setShowCode(!showCode)}>
        {showCode ? 'Hide Code' : 'See Code'}
      </Button>
      {showCode ? (
        <SyntaxHighlighter language="javascript" style={coy}>
          {codeString}
        </SyntaxHighlighter>
      ) : (
        <>
          <Typography variant="body1" component="p">
            This diagram illustrates the application of a query hook from the Sisense Compose SDK to fetch data that powers the app's logic and workflows. In this example, if the query returns results that match certain conditions, an automated process is initiated. This process creates a Jira ticket, with the ticket's summary dynamically generated by the NLG (Natural Language Generation) output, also powered by the GenAI NLG component from the Sisense Compose SDK.
          </Typography>
          <img src={diagram} alt="Diagram" style={{ width: '100%', marginBottom: '20px' }} /> {/* Render the image at the top */}
          {ticketCreated && (
            <div style={{ backgroundColor: 'lightyellow', padding: '10px', marginBottom: '10px' }}>
              We have identified an AWS environment that appears to be over-provisioned. We have logged a ticket in Jira and notified Cloud Operations.
            </div>
          )}
          <Typography>
            Below is the output from the GenAI NLG Component and a table ot visualize the output of the query from Compose SDK. This is the data being used to power the logic of our Automation Workflow
          </Typography>
          <Card 
  sx={{
    backgroundColor: 'lightgrey',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  }}
>
  <CardContent>
    {isNlgLoading && <div>Loading insights...</div>}
    {nlgData && <p>{nlgData}</p>}
    {data && (
      <>
        <Table
          dataSet={data}
          dataOptions={{ columns: data.columns }}
          styleOptions={{
            rowsPerPage: 5,
            height: 300,
            header: {
              color: {
                enabled: true,
                backgroundColor: '',
              }
            },
          }}
        />
      </>
    )}
  </CardContent>
</Card>


        </>
      )}
    </>
  );
};

export default Dashboard;
