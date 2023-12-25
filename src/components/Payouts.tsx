import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  font-family: 'Inter', sans-serif;
  margin: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  white-space: nowrap; /* Apply white-space: nowrap to prevent content wrapping */
  overflow-x: auto; /* Add overflow-x: auto for horizontal scroll */
`;

const TableHeader = styled.th`
  background-color: transparent;
  padding: 10px;
  font-size: 14px;
  text-align: left;
  color: #6F767E;
  font-weight: 500;
`;

const TableRow = styled.tr`
  &:nth-child(odd) {
    background-color: #F4F4F480;
  }
  &:nth-child(even) {
    background-color: white;
  }
`;

const TableCell = styled.td<{ isDateAndTime?: boolean }>`
  padding: 15px 10px;
  font-size: 14px;
  color: ${props => (props.isDateAndTime ? '#6F767E' : '#1A1D1F')};
`;

const StatusContent = styled.span<{ status: string }>`
  padding: 6px 8px;
  font-size: 14px;
  color: #1A1D1F;
  font-weight: 600;
  background-color: ${props =>
    props.status === 'Pending'
      ? '#6F767E66'
      : props.status === 'Completed'
      ? '#60CA57'
      : '#6F767E66'};
  border-radius: 6px;
  white-space: nowrap;
`;

const MainTitle = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #1A1D1F;
  margin-bottom: 30px;
`;

const Subtitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1A1D1F;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: fit-content;
  gap: 15px;
  margin-bottom: 10px;
`;

const GreenBox = styled.div`
  width: 16px;
  height: 32px;
  background-color: #999dff;
  border-radius: 4px;
`;


// Function to format date and time
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  return date.toLocaleString('en-US', options);
};

// Function to format currency values
const formatCurrency = (value: string) => {
  const amount = parseFloat(value.replace(/[^0-9.-]+/g, ''));
  return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

// Component
const Payouts: React.FC = () => {
  const [payouts, setPayouts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://theseus-staging.lithium.ventures/api/v1/analytics/tech-test/payouts');
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        setPayouts(data.data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch payouts');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      <MainTitle>Payouts</MainTitle>
      <FlexContainer>
        <GreenBox />
        <Subtitle>Payout History</Subtitle>
      </FlexContainer>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <Table>
          <thead>
            <tr>
              <TableHeader>Date & Time</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Value</TableHeader>
            </tr>
          </thead>
          <tbody>
            {payouts.map((payout: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{formatDate(payout.dateAndTime)}</TableCell>
                <TableCell>
                  <StatusContent status={payout.status}>{payout.status === "Completed" ? "Paid" : payout.status}</StatusContent>
                </TableCell>
                <TableCell>{formatCurrency(payout.value)}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Payouts;