import React, { useState, useEffect } from 'react';
import Questionnaire from '../pages/Questionnaire';
import DashboardRouter from '../components/DashboardRouter';
import Spinner from './Spinner';

function GetUser() {
  const [isCoach, setIsCoach] = useState();
  const [isParent, setIsParent] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          'http://localhost:2121/dashboard/getUser',
          { credentials: 'include' }
        );
        const json = await response.json();
        setIsParent(json.isRegisteredParent);
        setIsCoach(json.isRegisteredCoach);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {isCoach || isParent ? (
            <DashboardRouter />
          ) : (
            <Questionnaire />
          )}
        </>
      )}
    </>
  );
}

export default GetUser;